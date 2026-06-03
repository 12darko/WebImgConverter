import axios from 'axios';

// Get API URL from environment or default to localhost
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_URL = 'https://api.WebImgConverter.com';

export interface ConversionResponse {
    blob: Blob;
    fileName: string;
}

export const serverConversionService = {
    /**
     * Convert HEIC to JPG/PNG/WEBP via Server
     */
    async convertHeic(file: File, format: 'jpg' | 'png' | 'webp' | 'heic' | 'avif' = 'jpg'): Promise<Blob> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('format', format);

        try {
            const response = await axios.post(`${API_URL}/convert-heic`, formData, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Server HEIC conversion failed:', error);
            throw error;
        }
    },

    /**
     * Convert Format (WebP/PNG -> JPG/PNG/WEBP) via Server
     */
    async convertFormat(file: File, format: 'jpg' | 'png' | 'webp' | 'heic' | 'avif' = 'jpg'): Promise<Blob> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('format', format);

        try {
            const response = await axios.post(`${API_URL}/convert-format`, formData, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Server format conversion failed:', error);
            throw error;
        }
    },

    /**
     * Compress Image via Server
     */
    async compressImage(file: File, quality: number = 80): Promise<Blob> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('quality', quality.toString());

        try {
            const response = await axios.post(`${API_URL}/compress`, formData, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Server compression failed:', error);
            throw error;
        }
    },

    /**
     * Remove Background via Server
     */
    async removeBackground(file: File, qualityTier: string = 'free', aiModel: string = 'birefnet-massive'): Promise<Blob> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('quality_tier', qualityTier);
        formData.append('ai_model', aiModel);

        try {
            const response = await axios.post(`${API_URL}/remove-background`, formData, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Server background removal failed:', error);
            throw error;
        }
    },

    /**
     * Apply Watermark via Server
     */
    async watermarkImage(file: File, text: string, format: string = 'jpg'): Promise<Blob> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('text', text);
        formData.append('format', format);

        try {
            const response = await axios.post(`${API_URL}/watermark`, formData, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Server watermark failed:', error);
            throw error;
        }
    },

    /**
     * Crop Image via Server
     */
    async cropImage(file: File, x: number, y: number, width: number, height: number, format: string = 'jpg'): Promise<Blob> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('x', Math.round(x).toString());
        formData.append('y', Math.round(y).toString());
        formData.append('width', Math.round(width).toString());
        formData.append('height', Math.round(height).toString());
        formData.append('format', format);

        try {
            const response = await axios.post(`${API_URL}/crop`, formData, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Server crop failed:', error);
            throw error;
        }
    }
};
