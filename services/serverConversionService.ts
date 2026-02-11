import axios from 'axios';

// Get API URL from environment or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface ConversionResponse {
    blob: Blob;
    fileName: string;
}

export const serverConversionService = {
    /**
     * Convert HEIC to JPG/PNG/WEBP via Server
     */
    async convertHeic(file: File, format: 'jpg' | 'png' | 'webp' = 'jpg'): Promise<Blob> {
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
    async convertFormat(file: File, format: 'jpg' | 'png' | 'webp' = 'jpg'): Promise<Blob> {
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
    }
};
