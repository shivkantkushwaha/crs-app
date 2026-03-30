"use client";
import { useMutation } from "@tanstack/react-query";

export interface PredictRequest {
  N: number; P: number; K: number;
  temperature: number; humidity: number; ph: number; rainfall: number;
}

export interface PredictResponse {
  recommended_crop: string;
  confidence: number;
  alternatives: string[];
  suitability: "High" | "Medium" | "Low";
  advisory: { fertilizer: string; irrigation: string; sowing_season: string };
}

// ── Calls the Next.js API route /api/predict (which proxies to Python) ────────
async function predictCrop(data: PredictRequest): Promise<PredictResponse> {
  const res = await fetch("/api/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.detail || `Error ${res.status}`);
  return json as PredictResponse;
}

export function usePredict() {
  return useMutation({ mutationFn: predictCrop });
}
