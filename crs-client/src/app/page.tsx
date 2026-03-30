"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sprout, Cloud, FlaskConical, Calendar, Shield, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";

const features = [
  { icon: Sprout, title: "Smart Crop Recommendation", desc: "AI predicts best crop using soil nutrients and climate data" },
  { icon: Cloud, title: "Weather Intelligence", desc: "Automatically fetches real-time weather conditions" },
  { icon: FlaskConical, title: "Soil Health Analysis", desc: "Analyze N, P, K, and pH levels for optimal growth" },
  { icon: Calendar, title: "Seasonal Crop Filtering", desc: "Recommend crops based on month, season, climate" },
  { icon: Shield, title: "Agronomy Rule Engine", desc: "AI suggestions validated using real-world constraints" },
  { icon: MessageSquare, title: "CRSAI Assistant", desc: "Ask questions about farming, crop diseases, fertilizers" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-slate-50">
        <img src="/images/hero-mesh.png" alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/95" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-6">
                <Sprout className="w-4 h-4" /> AI-Powered Agriculture Intelligence
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
                Smarter Farming Decisions with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Crop Intelligence</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                CRSAPP analyzes soil nutrients, weather patterns, climate conditions, and agronomic constraints to recommend the most suitable crops for a given location and time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/dashboard/chat">
                  <Button size="lg" className="w-full sm:w-auto text-base rounded-full shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all">
                    Try CRSAI
                  </Button>
                </Link>
                <Link href="/technology">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base rounded-full border-slate-300">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> ML-Powered</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> Real-time Weather</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary" /> Agronomic Rules</div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative lg:h-[600px] flex items-center justify-center">
              <div className="absolute w-72 h-72 bg-primary/20 blur-[100px] rounded-full" />
              <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Sprout className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div><p className="font-semibold text-slate-900">Crop Analysis</p><p className="text-xs text-slate-500">Live prediction model</p></div>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">98% Confidence</div>
                </div>
                <div className="space-y-4 mb-6">
                  {[["Nitrogen (N)", "102 mg/kg", "bg-emerald-500", "75%"], ["Phosphorus (P)", "45 mg/kg", "bg-blue-500", "45%"], ["Potassium (K)", "85 mg/kg", "bg-purple-500", "60%"]].map(([label, value, color, width]) => (
                    <div key={label}>
                      <div className="flex justify-between text-sm mb-1"><span className="text-slate-500">{label}</span><span className="font-medium">{value}</span></div>
                      <div className="w-full bg-slate-100 rounded-full h-2"><div className={`${color} h-2 rounded-full`} style={{ width }} /></div>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div><p className="text-sm text-slate-500 mb-0.5">Recommended Crop</p><p className="text-xl font-bold text-slate-900">Chickpea</p></div>
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center text-xl">🌱</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Platform Capabilities</h2>
            <p className="text-slate-600">A complete suite of tools to analyze, predict, and optimize crop yields based on science and real-time data.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <f.icon className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-y border-slate-800 py-12">
            {[["10k+", "Crops Analyzed"], ["95%", "Prediction Accuracy"], ["50+", "Crop Varieties"], ["24/7", "Real-time Data"]].map(([num, label]) => (
              <div key={label}><p className="text-4xl font-extrabold text-primary mb-2">{num}</p><p className="text-slate-400 font-medium">{label}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Start Making Smarter Farming Decisions Today</h2>
          <p className="text-lg text-slate-600 mb-10">Join thousands of agronomists and farmers leveraging AI for sustainable agriculture.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/dashboard/predict"><Button size="lg" className="rounded-full px-8">Try Prediction Engine</Button></Link>
            <Link href="/auth/signup"><Button size="lg" variant="outline" className="rounded-full px-8 bg-white">Sign Up Free</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
