import { GoogleGenerativeAI } from "@google/generative-ai";

const getAiClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("API Key is missing. AI features will fail.");
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
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

export const generateAiFilename = async (file: File): Promise<string | null> => {
  const genAI = getAiClient();
  if (!genAI) return null;

  try {
    // UPDATED: Using gemini-2.0-flash model (latest stable)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const imagePart = await fileToGenerativePart(file);
    const prompt = "Analyze this image and generate a short, highly descriptive, SEO-friendly filename (in English, snake_case, max 5 words). Output ONLY the filename, do not include the extension.";

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    return text ? text.trim() : null;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};