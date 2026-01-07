
const HF_API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large";

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
