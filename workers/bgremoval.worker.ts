/**
 * Background Removal Web Worker
 * Runs @imgly/background-removal in a separate thread to prevent UI freeze
 */

import { removeBackground } from '@imgly/background-removal';

self.onmessage = async (event: MessageEvent) => {
    const { imageUrl, id } = event.data;

    try {
        // Notify start
        self.postMessage({ type: 'progress', id, progress: 10 });

        const blob = await removeBackground(imageUrl, {
            progress: (key: string, current: number, total: number) => {
                // Map progress to 10-50%
                const percentage = 10 + Math.floor((current / total) * 40);
                self.postMessage({ type: 'progress', id, progress: percentage });
            }
        });

        // Convert blob to ArrayBuffer for transfer
        const arrayBuffer = await blob.arrayBuffer();

        self.postMessage({
            type: 'complete',
            id,
            buffer: arrayBuffer,
            mimeType: blob.type
        });

    } catch (error: any) {
        self.postMessage({
            type: 'error',
            id,
            error: error?.message || 'Unknown error'
        });
    }
};
