
const HF_API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large";
// Use Vite proxy for dev - U2Net is MIT licensed (free for commercial use)
const HF_RMBG_URL = "/api/hf/models/u2net/u2net";

/**
 * Interact with Hugging Face Inference API
 */
export const generateCaptionWithHF = async (file: File): Promise<string | null> => {
    const apiKey = import.meta.env.VITE_HUGGING_FACE_TOKEN;

    if (!apiKey) {
        console.warn("Hugging Face API Token is missing (VITE_HUGGING_FACE_TOKEN).");
        return null;
    }

    try {
        const response = await fetch(HF_API_URL, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": file.type,
            },
            method: "POST",
            body: file,
        });

        if (!response.ok) {
            // Handle "model loading" state specifically if possible, or generic error
            if (response.status === 503) {
                console.warn("Hugging Face model is loading, try again shortly.");
            }
            throw new Error(`HF API Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        // Result format: [{ generated_text: "a photography of a cat..." }]
        if (Array.isArray(result) && result.length > 0 && result[0].generated_text) {
            return result[0].generated_text;
        }
        return null;

    } catch (error) {
        console.error("Hugging Face API call failed:", error);
        return null;
    }
};

/**
 * Remove background using Hugging Face RMBG-1.4 model
 * High quality, server-side processing
 * Uses Vite proxy (dev) or server proxy (prod) to bypass CORS
 * TODO: Replace with self-hosted VPS endpoint in the future
 */
export const removeBackgroundWithHF = async (imageUrl: string): Promise<Blob | null> => {
    try {
        // First, fetch the image as a blob
        const imageResponse = await fetch(imageUrl);
        const imageBlob = await imageResponse.blob();

        // Send to HuggingFace RMBG-1.4 via proxy (auth handled by proxy)
        const response = await fetch(HF_RMBG_URL, {
            method: "POST",
            body: imageBlob,
        });

        if (!response.ok) {
            if (response.status === 503) {
                // Model is loading, wait and retry once
                console.warn("RMBG model is loading, waiting 10s and retrying...");
                await new Promise(r => setTimeout(r, 10000));

                const retryResponse = await fetch(HF_RMBG_URL, {
                    method: "POST",
                    body: imageBlob,
                });

                if (!retryResponse.ok) {
                    throw new Error(`HF RMBG Retry Error: ${retryResponse.status}`);
                }
                return await retryResponse.blob();
            }
            throw new Error(`HF RMBG Error: ${response.status} ${response.statusText}`);
        }

        // Response is the image with background removed (as blob)
        return await response.blob();

    } catch (error) {
        console.error("Hugging Face RMBG call failed:", error);
        return null;
    }
};
