import { env, AutoModel, AutoProcessor, RawImage } from '@xenova/transformers';

// Skip local checks for models (use CDN)
env.allowLocalModels = false;
env.useBrowserCache = true;

// Singleton to hold model and processor
class HDModelProcessor {
    static model = null;
    static processor = null;
    static isBusy = false;

    static async init(progressCallback) {
        if (!this.model) {
            // MODNet: Valid, public model.
            this.model = await AutoModel.from_pretrained('Xenova/modnet', {
                progress_callback: progressCallback
            });
        }
        if (!this.processor) {
            this.processor = await AutoProcessor.from_pretrained('Xenova/modnet');
        }
    }
}

self.addEventListener('message', async (e) => {
    const { action, payload } = e.data;

    if (action === 'init') {
        try {
            await HDModelProcessor.init((progress) => {
                self.postMessage({ status: 'progress', progress: progress });
            });
            self.postMessage({ status: 'ready' });
        } catch (err) {
            self.postMessage({ status: 'error', error: err.message });
        }
    }

    if (action === 'remove_bg') {
        try {
            const { imageUrl } = payload;
            if (!HDModelProcessor.model) await HDModelProcessor.init();

            // Load image
            const image = await RawImage.fromURL(imageUrl);

            self.postMessage({ status: 'processing', progress: 10 });

            // Preprocess
            const { pixel_values } = await HDModelProcessor.processor(image);

            self.postMessage({ status: 'processing', progress: 30 });

            // Predict
            const { output } = await HDModelProcessor.model({ input: pixel_values });

            self.postMessage({ status: 'processing', progress: 70 });

            // --- MANUAL SIGMOID & NORMALIZATION ---
            // Issue: Previous run produced blank result, implying output was logits (negative values clamped to 0).
            // Fix: Apply Sigmoid: 1 / (1 + exp(-x)) to convert -inf..inf -> 0..1

            const maskRawTensor = output[0]; // Float32 tensor
            const [channels, maskHeight, maskWidth] = maskRawTensor.dims;
            const maskData = maskRawTensor.data; // Float32Array

            // Create ImageData from Mask
            const maskPixelCount = maskHeight * maskWidth;
            const maskRgbaData = new Uint8ClampedArray(maskPixelCount * 4);

            for (let i = 0; i < maskPixelCount; i++) {
                let val = maskData[i];

                // Manual Sigmoid Activation
                let probability = 1 / (1 + Math.exp(-val));

                let alpha = probability * 255;

                // Create Grayscale representation for Canvas
                maskRgbaData[i * 4] = alpha;     // R
                maskRgbaData[i * 4 + 1] = alpha; // G
                maskRgbaData[i * 4 + 2] = alpha; // B
                maskRgbaData[i * 4 + 3] = 255;   // A (Fully opaque pixels, encoded info in RGB)
            }

            const maskImageData = new ImageData(maskRgbaData, maskWidth, maskHeight);

            self.postMessage({ status: 'processing', progress: 85 });

            // --- COMPOSITING (High Quality Canvas Scaling) ---

            // 1. Draw Original
            const canvas = new OffscreenCanvas(image.width, image.height);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image.toCanvas(), 0, 0);

            // 2. Prepare Mask Canvas (Full Scale)
            const maskCanvas = new OffscreenCanvas(maskWidth, maskHeight);
            maskCanvas.getContext('2d').putImageData(maskImageData, 0, 0);

            // 3. Scale Mask to match Original Image
            const scaledMaskCanvas = new OffscreenCanvas(image.width, image.height);
            const scaledMaskCtx = scaledMaskCanvas.getContext('2d');
            scaledMaskCtx.drawImage(maskCanvas, 0, 0, image.width, image.height);

            // 4. Extract Data for Merging
            const finalImgData = ctx.getImageData(0, 0, image.width, image.height);
            const finalMaskData = scaledMaskCtx.getImageData(0, 0, image.width, image.height);
            const totalPixels = image.width * image.height;

            for (let i = 0; i < totalPixels; i++) {
                // Use R channel from scaled mask as Alpha
                finalImgData.data[i * 4 + 3] = finalMaskData.data[i * 4];
            }

            ctx.putImageData(finalImgData, 0, 0);

            // Export
            const blob = await canvas.convertToBlob({ type: 'image/png' });
            self.postMessage({ status: 'complete', blob });

        } catch (err) {
            self.postMessage({ status: 'error', error: err.message });
        }
    }
});
