import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY ?? "";

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
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ history, message: userMessage }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error ?? "Chat request failed");
  }

  const data = await res.json();
  return data.reply;
}