// crs-client/src/app/dashboard/predict/page.tsx

"use client";
import { useState } from "react";
import { usePredict } from "@/hooks/use-predict";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, AlertCircle, RefreshCw } from "lucide-react";

export default function PredictPage() {
  const { mutate: predict, isPending, error, data } = usePredict();
  const [form, setForm] = useState({ N: 90, P: 42, K: 43, temperature: 20.8, humidity: 82.0, ph: 6.5, rainfall: 202.9 });
  const slide = (field: keyof typeof form) => (v: number[]) => setForm(p => ({ ...p, [field]: v[0] }));

  const confidencePct = data ? Math.round(data.confidence * 100) : 0;
  const suitability = data
    ? data.confidence >= 0.8 ? "High" : data.confidence >= 0.5 ? "Medium" : "Low"
    : "—";

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-screen">
      <div className="w-full lg:w-[450px] border-r border-slate-200 bg-white p-6 lg:p-8 overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Prediction Engine</h2>
          <p className="text-sm text-slate-500">Input soil and environmental parameters.</p>
        </div>
        <form onSubmit={e => { e.preventDefault(); predict(form); }} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Soil Nutrients</h3>
            {[["Nitrogen (N)", "N", 140, 1] as const, ["Phosphorus (P)", "P", 145, 1] as const, ["Potassium (K)", "K", 205, 1] as const, ["pH Level", "ph", 14, 0.1] as const].map(([label, field, max, step]) => (
              <div key={field} className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-slate-700">{label}</Label>
                  <span className="text-sm font-mono bg-slate-100 px-2 py-0.5 rounded">{form[field]}</span>
                </div>
                <Slider value={[form[field]]} onValueChange={slide(field)} max={max} step={step} />
              </div>
            ))}
          </div>
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Environmental</h3>
            {[["Temperature (°C)", "temperature", 50, 0.1] as const, ["Humidity (%)", "humidity", 100, 0.1] as const, ["Rainfall (mm)", "rainfall", 300, 0.1] as const].map(([label, field, max, step]) => (
              <div key={field} className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-slate-700">{label}</Label>
                  <span className="text-sm font-mono bg-slate-100 px-2 py-0.5 rounded">{form[field]}</span>
                </div>
                <Slider value={[form[field]]} onValueChange={slide(field)} max={max} step={step} />
              </div>
            ))}
          </div>
          <Button type="submit" size="lg" className="w-full rounded-xl shadow-lg shadow-primary/20" disabled={isPending}>
            {isPending ? <><RefreshCw className="w-5 h-5 mr-2 animate-spin" />Analyzing...</> : "Predict Optimal Crop"}
          </Button>
        </form>
      </div>

      <div className="flex-1 bg-slate-50 p-6 lg:p-12 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          {isPending && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }}>
                <Sprout className="w-16 h-16 text-primary/40" />
              </motion.div>
              <h3 className="mt-6 text-xl font-semibold text-slate-800">Analyzing Parameters...</h3>
            </motion.div>
          )}
          {!isPending && error && (
            <motion.div key="error" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="absolute inset-0 flex items-center justify-center p-6">
              <div className="max-w-md w-full bg-white p-6 rounded-2xl border border-destructive/20 shadow-lg text-center">
                <div className="w-12 h-12 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-4"><AlertCircle className="w-6 h-6" /></div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Prediction Failed</h3>
                <p className="text-slate-600 mb-4">{error.message}</p>
                <div className="bg-slate-50 p-4 rounded-xl text-left text-sm font-mono text-slate-500 border">
                  <p className="text-xs mb-1 text-slate-400 font-sans">Dev Note:</p>
                  Set PYTHON_API_URL in .env.local and ensure your Python backend is running.
                </div>
              </div>
            </motion.div>
          )}
          {!isPending && !error && !data && (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <Sprout className="w-24 h-24 text-slate-300 mb-6" />
              <h3 className="text-2xl font-semibold text-slate-500">Awaiting Data</h3>
              <p className="text-slate-400 mt-2">Adjust parameters on the left and run a prediction.</p>
            </motion.div>
          )}
          {!isPending && !error && data && (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Analysis Results</h2>
                <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-full">{confidencePct}% Confidence</div>
              </div>
              <Card className="rounded-2xl border-primary/20 shadow-lg bg-gradient-to-br from-white to-primary/5">
                <CardContent className="p-8 flex items-center gap-8">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md border text-4xl flex-shrink-0">🌾</div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-1">Primary Recommendation</p>
                    <h3 className="text-4xl font-extrabold text-slate-900 mb-2 capitalize">{data.crop}</h3>
                    <p className="text-slate-600">Suitability: <span className="font-medium text-primary">{suitability}</span></p>
                  </div>
                </CardContent>
              </Card>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="rounded-2xl">
                  <CardHeader><CardTitle className="text-lg">Alternative Crops</CardTitle></CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {data.top_3.slice(1).map((item, i) => (
                        <li key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="font-medium capitalize text-slate-700">{item.crop}</span>
                          <span className="text-sm text-slate-500">{Math.round(item.confidence * 100)}% match</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="rounded-2xl">
                  <CardHeader><CardTitle className="text-lg">Prediction Details</CardTitle></CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Rainfall Used</p>
                      <p className="text-slate-700">{data.rainfall_used} mm</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Model Confidence</p>
                      <p className="text-slate-700">{confidencePct}% — {suitability} suitability</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Model</p>
                      <p className="text-slate-700">Random Forest · 99.32% accuracy</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}