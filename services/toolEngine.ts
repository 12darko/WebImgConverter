/**
 * Tool Engine — clean browser-side image conversion utilities.
 *
 * Used by the new ToolWorkspace flow. For complex features (HEIC input, AI rename,
 * batch, watermark, crop, premium), the legacy `/app` route still uses the original
 * App.tsx with full feature set.
 *
 * This engine handles the simple "Optimization Settings" flow shown in the redesign:
 *   - Pick a target format (WebP/PNG/JPG/AVIF)
 *   - Adjust quality
 *   - Resize dimensions
 *   - Optionally strip metadata
 *   - Output a downloadable blob
 */

import { encodeToBMP, encodeToICO, encodeToTIFF } from '../utils/imageEncoders';
import { serverConversionService } from './serverConversionService';

export type OutputFormat = 'webp' | 'png' | 'jpg' | 'avif' | 'bmp' | 'ico' | 'tiff';

export const FORMAT_LABELS: Record<OutputFormat, string> = {
    webp: 'WebP',
    png: 'PNG',
    jpg: 'JPG',
    avif: 'AVIF',
    bmp: 'BMP',
    ico: 'ICO',
    tiff: 'TIFF',
};

export const FORMAT_MIME: Record<OutputFormat, string> = {
    webp: 'image/webp',
    png: 'image/png',
    jpg: 'image/jpeg',
    avif: 'image/avif',
    bmp: 'image/bmp',
    ico: 'image/x-icon',
    tiff: 'image/tiff',
};

export interface ConversionSettings {
    targetFormat: OutputFormat;
    quality: number;          // 0-100
    width?: number;           // pixels
    height?: number;          // pixels
    lockAspectRatio: boolean;
    removeMetadata: boolean;  // EXIF strip — canvas re-encode strips by default
}

export interface ConversionResult {
    blob: Blob;
    url: string;
    width: number;
    height: number;
    sizeBytes: number;
}

/**
 * Detects whether the file is a HEIC/HEIF format.
 */
export const isHeicFile = (file: File): boolean => {
    const name = file.name.toLowerCase();
    const type = file.type.toLowerCase();
    return name.endsWith('.heic') || name.endsWith('.heif') || type === 'image/heic' || type === 'image/heif';
};

/**
 * Loads a File into an HTMLImageElement (browser-decodable).
 */
export const loadImageFromFile = (file: File): Promise<{ image: HTMLImageElement; sourceUrl: string }> => {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => resolve({ image: img, sourceUrl: url });
        img.onerror = (e) => {
            URL.revokeObjectURL(url);
            reject(new Error('Failed to load image. The format may not be supported in your browser.'));
        };
        img.src = url;
    });
};

/**
 * Converts an image with the given settings.
 *
 * For HEIC inputs, falls back to the server-side conversion endpoint (api.WebImgConverter.com).
 * For all other inputs, uses canvas-based browser conversion.
 */
export const convertImage = async (
    file: File,
    settings: ConversionSettings,
): Promise<ConversionResult> => {
    // Special path: HEIC input → server conversion (browser can't decode HEIC natively)
    if (isHeicFile(file)) {
        const target = settings.targetFormat === 'jpg' ? 'jpg' :
            settings.targetFormat === 'png' ? 'png' :
                settings.targetFormat === 'webp' ? 'webp' : 'jpg';
        const blob = await serverConversionService.convertHeic(file, target as 'jpg' | 'png' | 'webp');

        // Re-decode the result to apply quality/resize on the client side
        const intermediate = new File([blob], file.name, { type: blob.type });
        return convertImage(intermediate, settings);
    }

    const { image } = await loadImageFromFile(file);

    // Determine output dimensions
    let outW = image.naturalWidth;
    let outH = image.naturalHeight;
    if (settings.width && settings.height) {
        outW = settings.width;
        outH = settings.height;
    } else if (settings.width) {
        outW = settings.width;
        outH = Math.round((settings.width / image.naturalWidth) * image.naturalHeight);
    } else if (settings.height) {
        outH = settings.height;
        outW = Math.round((settings.height / image.naturalHeight) * image.naturalWidth);
    }

    // Render to canvas
    const canvas = document.createElement('canvas');
    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context unavailable.');

    // For non-transparent formats (jpg), fill background white
    if (settings.targetFormat === 'jpg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, outW, outH);
    }
    ctx.drawImage(image, 0, 0, outW, outH);

    // Encode
    const quality = Math.max(0.1, Math.min(1, settings.quality / 100));
    const fmt = settings.targetFormat;

    let blob: Blob;
    if (fmt === 'bmp') {
        const data = ctx.getImageData(0, 0, outW, outH);
        blob = encodeToBMP(data);
    } else if (fmt === 'tiff') {
        const data = ctx.getImageData(0, 0, outW, outH);
        blob = encodeToTIFF(data);
    } else if (fmt === 'ico') {
        const data = ctx.getImageData(0, 0, outW, outH);
        blob = encodeToICO(data);
    } else {
        // Browser-native encoding (jpg, png, webp, avif)
        const mime = FORMAT_MIME[fmt];
        blob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob(
                (b) => b ? resolve(b) : reject(new Error('Encoding failed')),
                mime,
                quality,
            );
        });

        // Some browsers (Firefox before AVIF support) silently fall back to PNG.
        // If the resulting MIME doesn't match, try WebP fallback for AVIF.
        if (fmt === 'avif' && !blob.type.includes('avif')) {
            blob = await new Promise<Blob>((resolve, reject) => {
                canvas.toBlob(
                    (b) => b ? resolve(b) : reject(new Error('AVIF and WebP fallback both failed')),
                    'image/webp',
                    quality,
                );
            });
        }
    }

    const url = URL.createObjectURL(blob);
    return {
        blob,
        url,
        width: outW,
        height: outH,
        sizeBytes: blob.size,
    };
};

/**
 * Generates an output filename with the new format extension.
 */
export const buildOutputName = (originalName: string, format: OutputFormat): string => {
    const dot = originalName.lastIndexOf('.');
    const stem = dot > 0 ? originalName.slice(0, dot) : originalName;
    const ext = format === 'jpg' ? 'jpg' : format;
    return `${stem}_WebImgConverter.${ext}`;
};

/**
 * Triggers a download of the blob.
 */
export const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
};

/**
 * Human-readable file size formatter (KB / MB).
 */
export const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

/**
 * Calculates compression saved percentage.
 */
export const calculateSavings = (originalBytes: number, newBytes: number): number => {
    if (originalBytes <= 0) return 0;
    const saved = ((originalBytes - newBytes) / originalBytes) * 100;
    return Math.max(0, Math.round(saved));
};

/**
 * Reads image dimensions from a file (without decoding for canvas).
 */
export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
        if (isHeicFile(file)) {
            resolve({ width: 0, height: 0 }); // HEIC dimensions unknown until server decode
            return;
        }
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve({ width: img.naturalWidth, height: img.naturalHeight });
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Could not read image dimensions'));
        };
        img.src = url;
    });
};
