import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are CRSAI, an expert AI assistant for agriculture and crop farming.
You help farmers and agronomists with crop recommendations, soil health,
fertilizers, irrigation, pest management, and farming best practices.
Be concise, practical, and scientific. Always give actionable advice.
`.trim();

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  const { history, message } = await req.json();

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
    systemInstruction: SYSTEM_PROMPT,
  });

  const chat = model.startChat({ history: history ?? [] });
  const result = await chat.sendMessage(message);
  return NextResponse.json({ reply: result.response.text() });
}