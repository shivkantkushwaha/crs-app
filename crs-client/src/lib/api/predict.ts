export interface PredictRequest {
  N: number;
  P: number;
  K: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

export interface PredictResponse {
  crop: string;
  confidence: number;
  rainfall_used: number;
  top_3: Array<{ crop: string; confidence: number }>;
}

export async function predictCrop(data: PredictRequest): Promise<PredictResponse> {
  const res = await fetch("/api/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Prediction failed" }));
    throw new Error(err.detail || `Server error: ${res.status}`);
  }
  return res.json();
}