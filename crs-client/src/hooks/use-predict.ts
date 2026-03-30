"use client";
import { useMutation } from "@tanstack/react-query";
import { predictCrop, PredictRequest } from "@/lib/api/predict";

export type { PredictRequest };

export function usePredict() {
  return useMutation({ mutationFn: predictCrop });
}