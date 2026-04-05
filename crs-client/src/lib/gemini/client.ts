import { GoogleGenerativeAI } from "@google/generative-ai";

// ─── WIRE UP ──────────────────────────────────────────────────────────────────
// 1. Get key: https://aistudio.google.com/app/apikey
// 2. Add to .env.local:  NEXT_PUBLIC_GEMINI_API_KEY=your-key
// ─────────────────────────────────────────────────────────────────────────────

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("[CRSAPP] NEXT_PUBLIC_GEMINI_API_KEY is missing from .env.local");
}

export const genAI = new GoogleGenerativeAI(apiKey);

export const CRSAI_SYSTEM_PROMPT = `
You are CRSAI, an expert AI assistant for agriculture and crop farming.
You help farmers and agronomists with crop recommendations, soil health,
fertilizers, irrigation, pest management, and farming best practices.
Be concise, practical, and scientific. Always give actionable advice.
`.trim();

// ─── sendMessage ──────────────────────────────────────────────────────────────
// history: previous chat turns in Gemini format
// Returns the AI's text response
export async function sendMessage(
  history: { role: "user" | "model"; parts: [{ text: string }] }[],
  userMessage: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",
    systemInstruction: CRSAI_SYSTEM_PROMPT,
  });
  const chat = model.startChat({ history });
  const result = await chat.sendMessage(userMessage);
  return result.response.text();
}
