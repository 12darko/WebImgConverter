import { GoogleGenerativeAI } from "@google/generative-ai";

const getAiClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("API Key is missing. Using fallback naming.");
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
};

// Fallback: Generate filename without AI based on file properties
const generateFallbackFilename = (file: File): string => {
  const now = new Date();
  const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const timeStr = `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;

  // Get file type category
  const type = file.type.split('/')[0]; // image, video, etc.
  const subtype = file.type.split('/')[1]?.replace('jpeg', 'jpg') || 'file';

  // Size category
  const sizeMB = file.size / (1024 * 1024);
  const sizeTag = sizeMB > 5 ? 'large' : sizeMB > 1 ? 'medium' : 'small';

  // Generate a simple unique suffix
  const randomSuffix = Math.random().toString(36).substring(2, 6);

  return `${type}_${subtype}_${sizeTag}_${dateStr}_${timeStr}_${randomSuffix}`;
};

// Converts a browser Blob/File to a Base64 string required by Gemini
const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve({
        inlineData: {
          data: base64String,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Utility: Sleep/delay function
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Retry configuration
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000; // 1 second

export const generateAiFilename = async (file: File): Promise<string> => {
  const genAI = getAiClient();

  // If no API key, use fallback immediately
  if (!genAI) {
    console.log("No API key, using fallback naming system.");
    return generateFallbackFilename(file);
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const imagePart = await fileToGenerativePart(file);
  const prompt = "Analyze this image and generate a short, highly descriptive, SEO-friendly filename (in English, snake_case, max 5 words). Output ONLY the filename, do not include the extension.";

  // Retry loop with exponential backoff
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

      if (text && text.trim()) {
        return text.trim();
      }

      // If AI returns empty, use fallback
      console.log("AI returned empty, using fallback naming system.");
      return generateFallbackFilename(file);
    } catch (error: any) {
      const isRateLimitError = error?.status === 429 || error?.message?.includes('429');

      if (isRateLimitError && attempt < MAX_RETRIES) {
        // Exponential backoff with jitter: 1s, 2s, 4s + random 0-500ms
        const delay = BASE_DELAY_MS * Math.pow(2, attempt - 1) + Math.random() * 500;
        console.warn(`Rate limit hit (attempt ${attempt}/${MAX_RETRIES}). Retrying in ${Math.round(delay)}ms...`);
        await sleep(delay);
        continue;
      }

      // Max retries reached or non-rate-limit error - use fallback
      console.warn(`Gemini API Error after ${attempt} attempt(s), using fallback:`, error?.message || error);
      return generateFallbackFilename(file);
    }
  }

  // Should never reach here, but just in case
  return generateFallbackFilename(file);
};