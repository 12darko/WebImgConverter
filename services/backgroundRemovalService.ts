/**
 * Server-Side Background Removal Service
 * Strictly uses the secure backend endpoint.
 */

/**
 * Remove background using local/VPS Python Server (Best Quality)
 * Requires backend/main.py to be running on localhost:8000
 */
export const removeBackgroundServer = async (
    imageUrl: string,
    qualityTier: 'free' | 'premium' = 'free',
    onProgress?: (progress: number) => void
): Promise<Blob | null> => {
    try {
        if (onProgress) onProgress(10);

        // Fetch the blob from the URL to get raw data
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        if (onProgress) onProgress(30);

        const formData = new FormData();
        formData.append('file', blob, 'image.png');
        formData.append('quality_tier', qualityTier);

        // Points to local Python server (VPS URL in production)
        // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const API_URL = 'https://api.vormpixyze.com';
        const serverUrl = `${API_URL}/remove-background`;

        // specific timeout for large images? Default fetch has no timeout but browser might.
        const apiResponse = await fetch(serverUrl, {
            method: 'POST',
            body: formData,
        });

        if (onProgress) onProgress(70);

        if (!apiResponse.ok) {
            throw new Error(`Server error: ${apiResponse.statusText}`);
        }

        const resultBlob = await apiResponse.blob();

        if (onProgress) onProgress(100);

        return resultBlob;

    } catch (error) {
        console.error('Server BG removal failed:', error);
        return null;
    }
};


/**
 * Hybrid background removal - NOW SERVER ONLY
 * Kept for backward compatibility with App.tsx
 */
export const removeBackgroundHybrid = async (
    imageUrl: string,
    mode: 'auto' | 'portrait' | 'object' = 'auto',
    qualityTier: 'free' | 'premium' = 'free',
    onProgress?: (progress: number) => void
): Promise<Blob | null> => {

    // Always use Server
    return await removeBackgroundServer(imageUrl, qualityTier, onProgress);
};
