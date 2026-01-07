import { generateAiFilename as generateGeminiFilename, AiFilenameResult as GeminiResult } from './geminiService';
import { generateCaptionWithHF } from './huggingFaceService';

export interface AiNamingResult {
    filename: string;
    provider: 'gemini' | 'hugging-face' | 'fallback';
    usedFallback: boolean;
}

// Fallback generator (same as in geminiService, duplicated here to be independent if needed)
export const generateFallbackName = (file: File): string => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const timeStr = `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
    const type = file.type.split('/')[0];
    const subtype = file.type.split('/')[1]?.replace('jpeg', 'jpg') || 'file';
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    return `${type}_${subtype}_${dateStr}_${timeStr}_${randomSuffix}`;
};

/**
 * Unified AI Naming Service
 * Strategy: Gemini -> Hugging Face -> Fallback
 */
export const generateSmartFilename = async (file: File): Promise<AiNamingResult> => {
    // 1. Try Gemini (Primary - Best Quality)
    try {
        const geminiResult = await generateGeminiFilename(file);
        if (!geminiResult.usedFallback) {
            return {
                filename: geminiResult.filename,
                provider: 'gemini',
                usedFallback: false
            };
        }
        console.warn("Gemini returned fallback, trying Hugging Face...");
    } catch (error) {
        console.warn("Gemini Service Failed:", error);
    }

    // 2. Try Hugging Face (Backup - Free)
    try {
        console.log("Attempting Hugging Face (BLIP)...");
        const caption = await generateCaptionWithHF(file);
        if (caption) {
            // Convert caption to filename (snake_case, max 5 words)
            // e.g. "a cat sitting on a table" -> "cat_sitting_on_table"
            const cleanName = caption
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, '') // Remove special chars
                .split(/\s+/) // Split by space
                .filter(w => w.length > 2) // Remove small words like 'a', 'on'
                .slice(0, 5) // Max 5 words
                .join('_');

            return {
                filename: cleanName || generateFallbackName(file), // Safety check if caption was empty chars
                provider: 'hugging-face',
                usedFallback: false // It's technically AI, just not Gemini
            };
        }
    } catch (error) {
        console.warn("Hugging Face Service Failed:", error);
    }

    // 3. Last Resort Fallback
    console.log("All AI services failed, using fallback.");
    return {
        filename: generateFallbackName(file),
        provider: 'fallback',
        usedFallback: true
    };
};
