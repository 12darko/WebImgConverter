/**
 * MediaPipe Background Removal Service
 * Uses Google's Selfie Segmentation for portrait/human photos
 * WebGL accelerated - fast and high quality for humans
 */

import { SelfieSegmentation, Results } from '@mediapipe/selfie_segmentation';

let segmenter: SelfieSegmentation | null = null;

/**
 * Initialize MediaPipe Selfie Segmentation
 */
const initMediaPipe = async (): Promise<SelfieSegmentation> => {
    if (segmenter) return segmenter;

    segmenter = new SelfieSegmentation({
        locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
    });

    // Model 1 = more accurate for full body, 0 = faster for close-up
    segmenter.setOptions({ modelSelection: 1, selfieMode: false });

    return segmenter;
};

/**
 * Remove background using MediaPipe (best for human subjects)
 * Returns a blob with transparent background
 */
export const removeBackgroundMediaPipe = async (imageUrl: string): Promise<Blob | null> => {
    try {
        const seg = await initMediaPipe();

        // Load image
        const img = new Image();
        img.crossOrigin = 'anonymous';
        await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = reject;
            img.src = imageUrl;
        });

        // Create canvases
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;

        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = img.width;
        maskCanvas.height = img.height;
        const maskCtx = maskCanvas.getContext('2d')!;

        // Process with MediaPipe
        return new Promise((resolve, reject) => {
            seg.onResults((results: Results) => {
                try {
                    // Draw segmentation mask
                    maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
                    maskCtx.drawImage(results.segmentationMask, 0, 0, maskCanvas.width, maskCanvas.height);

                    // Get mask data
                    const maskData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);

                    // Draw original image
                    ctx.drawImage(img, 0, 0);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                    // Apply mask (make background transparent)
                    for (let i = 0; i < maskData.data.length; i += 4) {
                        // Mask is grayscale, use red channel
                        const maskValue = maskData.data[i];
                        // Apply alpha based on mask (invert - white = foreground)
                        imageData.data[i + 3] = maskValue; // Alpha channel
                    }

                    ctx.putImageData(imageData, 0, 0);

                    // Convert to blob
                    canvas.toBlob((blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Failed to create blob'));
                        }
                    }, 'image/png');
                } catch (err) {
                    reject(err);
                }
            });

            // Send image to MediaPipe
            seg.send({ image: img });
        });

    } catch (error) {
        console.error('MediaPipe BG removal failed:', error);
        return null;
    }
};

/**
 * Hybrid background removal
 * Tries MediaPipe first (fast, good for humans)
 * Falls back to @imgly for general objects
 */
export const removeBackgroundHybrid = async (
    imageUrl: string,
    mode: 'auto' | 'portrait' | 'object' = 'auto',
    onProgress?: (progress: number) => void
): Promise<Blob | null> => {
    // Portrait mode - use MediaPipe
    if (mode === 'portrait') {
        return removeBackgroundMediaPipe(imageUrl);
    }

    // Object mode - use @imgly with Worker for non-blocking UI
    if (mode === 'object') {
        return removeBackgroundWithWorker(imageUrl, onProgress);
    }

    // Auto mode - try MediaPipe first, fall back to @imgly
    try {
        const result = await removeBackgroundMediaPipe(imageUrl);
        if (result && result.size > 1000) {
            return result;
        }
    } catch (e) {
        console.warn('MediaPipe failed, falling back to @imgly');
    }

    // Fallback to @imgly via Worker
    return removeBackgroundWithWorker(imageUrl, onProgress);
};

/**
 * Remove background using @imgly in a Web Worker
 * Non-blocking - keeps UI responsive
 */
export const removeBackgroundWithWorker = (
    imageUrl: string,
    onProgress?: (progress: number) => void
): Promise<Blob | null> => {
    return new Promise((resolve, reject) => {
        // Create worker dynamically
        const worker = new Worker(
            new URL('../workers/bgremoval.worker.ts', import.meta.url),
            { type: 'module' }
        );

        worker.onmessage = (event) => {
            const { type, progress, buffer, mimeType, error } = event.data;

            if (type === 'progress' && onProgress) {
                onProgress(progress);
            } else if (type === 'complete') {
                // Convert ArrayBuffer back to Blob
                const blob = new Blob([buffer], { type: mimeType || 'image/png' });
                worker.terminate();
                resolve(blob);
            } else if (type === 'error') {
                worker.terminate();
                reject(new Error(error));
            }
        };

        worker.onerror = (error) => {
            worker.terminate();
            reject(error);
        };

        // Start processing
        worker.postMessage({ imageUrl, id: Date.now() });
    });
};
