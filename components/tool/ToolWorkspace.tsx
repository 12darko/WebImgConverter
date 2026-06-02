import React from 'react';
import { ToolDropzone } from './ToolDropzone';
import { OptimizationSettingsPanel, FormatOption } from './OptimizationSettingsPanel';
import { ConversionPreview } from './ConversionPreview';
import { FileInfoBar } from './FileInfoBar';
import { DownloadActions } from './DownloadActions';
import {
    OutputFormat,
    convertImage,
    buildOutputName,
    downloadBlob,
    calculateSavings,
    getImageDimensions,
    isHeicFile,
} from '../../services/toolEngine';

const DEFAULT_FORMATS: FormatOption[] = [
    { value: 'webp' },
    { value: 'png' },
    { value: 'jpg' },
    { value: 'avif', badge: 'NEW' },
];

interface ToolWorkspaceProps {
    /** Default output format on load. */
    defaultFormat?: OutputFormat;
    /** Available output format chips. */
    formats?: FormatOption[];
    /** Override accept attribute for input. */
    accept?: string;
    /** Dropzone copy. */
    dropzoneTitle?: string;
    dropzoneSubtitle?: string;
    /** Optional CTA when "Batch Convert" is clicked (e.g., open upgrade modal). */
    onBatchClick?: () => void;
}

export const ToolWorkspace: React.FC<ToolWorkspaceProps> = ({
    defaultFormat = 'webp',
    formats = DEFAULT_FORMATS,
    accept = 'image/*,.heic,.heif',
    dropzoneTitle = 'Drag & Drop Images Here',
    dropzoneSubtitle = 'or click to browse files',
    onBatchClick,
}) => {
    const [file, setFile] = React.useState<File | null>(null);
    const [originalUrl, setOriginalUrl] = React.useState<string | null>(null);
    const [originalSize, setOriginalSize] = React.useState<number | null>(null);
    const [originalDims, setOriginalDims] = React.useState<{ w: number; h: number } | null>(null);

    const [targetFormat, setTargetFormat] = React.useState<OutputFormat>(defaultFormat);
    const [quality, setQuality] = React.useState<number>(85);
    const [width, setWidth] = React.useState<number | undefined>(undefined);
    const [height, setHeight] = React.useState<number | undefined>(undefined);
    const [lockAspectRatio, setLockAspectRatio] = React.useState<boolean>(true);
    const [removeMetadata, setRemoveMetadata] = React.useState<boolean>(true);

    const [convertedUrl, setConvertedUrl] = React.useState<string | null>(null);
    const [convertedSize, setConvertedSize] = React.useState<number | null>(null);
    const [convertedBlob, setConvertedBlob] = React.useState<Blob | null>(null);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const debounceRef = React.useRef<number | null>(null);

    // Cleanup URLs on unmount
    React.useEffect(() => {
        return () => {
            if (originalUrl) URL.revokeObjectURL(originalUrl);
            if (convertedUrl) URL.revokeObjectURL(convertedUrl);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFiles = async (files: File[]) => {
        const f = files[0];
        if (!f) return;
        setError(null);

        // Cleanup previous
        if (originalUrl) URL.revokeObjectURL(originalUrl);
        if (convertedUrl) URL.revokeObjectURL(convertedUrl);
        setConvertedUrl(null);
        setConvertedSize(null);
        setConvertedBlob(null);

        setFile(f);
        setOriginalSize(f.size);

        // For non-HEIC, show original; for HEIC, server will produce a JPG preview after conversion
        if (!isHeicFile(f)) {
            const url = URL.createObjectURL(f);
            setOriginalUrl(url);
            try {
                const dims = await getImageDimensions(f);
                setOriginalDims({ w: dims.width, h: dims.height });
                setWidth(dims.width);
                setHeight(dims.height);
            } catch (e) {
                console.warn('Could not read dimensions', e);
            }
        } else {
            setOriginalUrl(null);
            setOriginalDims(null);
        }
    };

    // Maintain aspect ratio
    const handleWidthChange = (w: number | undefined) => {
        setWidth(w);
        if (lockAspectRatio && originalDims && w && originalDims.w > 0) {
            const ratio = originalDims.h / originalDims.w;
            setHeight(Math.round(w * ratio));
        }
    };
    const handleHeightChange = (h: number | undefined) => {
        setHeight(h);
        if (lockAspectRatio && originalDims && h && originalDims.h > 0) {
            const ratio = originalDims.w / originalDims.h;
            setWidth(Math.round(h * ratio));
        }
    };

    // Auto-convert when settings change (debounced)
    React.useEffect(() => {
        if (!file) return;
        if (debounceRef.current) window.clearTimeout(debounceRef.current);
        debounceRef.current = window.setTimeout(() => {
            void runConversion();
        }, 350);
        return () => {
            if (debounceRef.current) window.clearTimeout(debounceRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file, targetFormat, quality, width, height, removeMetadata]);

    const runConversion = async () => {
        if (!file) return;
        setIsProcessing(true);
        setError(null);

        try {
            const result = await convertImage(file, {
                targetFormat,
                quality,
                width,
                height,
                lockAspectRatio,
                removeMetadata,
            });

            // Cleanup previous
            if (convertedUrl) URL.revokeObjectURL(convertedUrl);

            setConvertedUrl(result.url);
            setConvertedSize(result.sizeBytes);
            setConvertedBlob(result.blob);

            // For HEIC the original preview is shown using converted data (server-side decoded)
            if (isHeicFile(file) && !originalUrl) {
                setOriginalUrl(result.url);
            }
        } catch (e: any) {
            console.error('Conversion failed:', e);
            setError(e?.message || 'Conversion failed');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDownload = () => {
        if (!convertedBlob || !file) return;
        downloadBlob(convertedBlob, buildOutputName(file.name, targetFormat));
    };

    const savings = (originalSize && convertedSize) ? calculateSavings(originalSize, convertedSize) : 0;

    // Initial state — show only the dropzone
    if (!file) {
        return (
            <div className="max-w-3xl mx-auto">
                <ToolDropzone
                    onFiles={handleFiles}
                    accept={accept}
                    title={dropzoneTitle}
                    subtitle={dropzoneSubtitle}
                />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5 lg:gap-6">
            {/* Left: Settings + actions */}
            <div className="space-y-4">
                <OptimizationSettingsPanel
                    formats={formats}
                    targetFormat={targetFormat}
                    onTargetFormatChange={setTargetFormat}
                    quality={quality}
                    onQualityChange={setQuality}
                    width={width}
                    height={height}
                    onWidthChange={handleWidthChange}
                    onHeightChange={handleHeightChange}
                    lockAspectRatio={lockAspectRatio}
                    onLockAspectRatioChange={setLockAspectRatio}
                    removeMetadata={removeMetadata}
                    onRemoveMetadataChange={setRemoveMetadata}
                />
                <DownloadActions
                    onDownload={handleDownload}
                    onBatch={onBatchClick}
                    canDownload={!!convertedBlob}
                    isProcessing={isProcessing}
                />
                {error && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl">
                        {error}
                    </div>
                )}
            </div>

            {/* Right: File info + preview */}
            <div className="space-y-4 min-w-0">
                <FileInfoBar
                    filename={file.name}
                    originalBytes={originalSize || 0}
                    convertedBytes={convertedSize ?? undefined}
                    targetFormat={targetFormat}
                    savedPercent={savings > 0 ? savings : undefined}
                />
                <ConversionPreview
                    originalUrl={originalUrl ?? undefined}
                    convertedUrl={convertedUrl ?? undefined}
                    originalSize={originalSize ?? undefined}
                    convertedSize={convertedSize ?? undefined}
                    isProcessing={isProcessing}
                />

                {/* Reset / Upload another */}
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={() => {
                            if (originalUrl) URL.revokeObjectURL(originalUrl);
                            if (convertedUrl) URL.revokeObjectURL(convertedUrl);
                            setFile(null);
                            setOriginalUrl(null);
                            setConvertedUrl(null);
                            setConvertedSize(null);
                            setConvertedBlob(null);
                            setOriginalSize(null);
                            setOriginalDims(null);
                            setWidth(undefined);
                            setHeight(undefined);
                            setError(null);
                        }}
                        className="text-xs text-slate-500 hover:text-brand-600 font-semibold underline-offset-4 hover:underline"
                    >
                        ← Convert another image
                    </button>
                </div>
            </div>
        </div>
    );
};
