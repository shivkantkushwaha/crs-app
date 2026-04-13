import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";

export const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const CRSAI_SYSTEM_PROMPT = `
You are CRSAI, an expert AI assistant for agriculture and crop farming.
You help farmers and agronomists with crop recommendations, soil health,
fertilizers, irrigation, pest management, and farming best practices.
Be concise, practical, and scientific. Always give actionable advice.
`.trim();

export async function sendMessage(
  history: { role: "user" | "model"; parts: [{ text: string }] }[],
  userMessage: string
): Promise<string> {
  if (!genAI) {
    return "CRSAI is currently unavailable. The API key is not configured. Please contact the administrator.";
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: CRSAI_SYSTEM_PROMPT,
  });

  const chat = model.startChat({ history });
  const result = await chat.sendMessage(userMessage);
  return result.response.text();
}