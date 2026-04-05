// crs-client/src/app/dashboard/chat/page.tsx

"use client";
import { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/use-chat";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sprout, Send, Bot, User, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const PRESETS = ["Which crop is best for black soil?", "How to increase nitrogen in soil?", "Best crops for monsoon season?", "What fertilizer for wheat?"];

export default function ChatPage() {
  const { messages, isLoading, error, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!input.trim() || isLoading) return; sendMessage(input); setInput(""); };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <div className="bg-white border-b px-8 py-4 flex items-center gap-3 shadow-sm">
        <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><Bot className="w-5 h-5" /></div>
        <div><h2 className="text-lg font-bold text-slate-900 leading-tight">CRSAI Assistant</h2><p className="text-xs text-slate-500">Powered by Google Gemini</p></div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {error && <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl flex items-start gap-3"><AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" /><div><p className="font-semibold text-sm">Error</p><p className="text-sm mt-1">{error}</p></div></div>}
          
          {messages.length === 0 && !error && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mb-6"><Sprout className="w-8 h-8 text-primary" /></div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">How can I help your farm today?</h3>
              <p className="text-slate-500 mb-8 max-w-md">Trained on agronomy best practices, crop diseases, and fertilizer management.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
                {PRESETS.map((p, i) => <button key={i} onClick={() => setInput(p)} className="p-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 hover:border-primary/50 hover:shadow-sm transition-all text-left">{p}</button>)}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-primary text-white" : "bg-blue-100 text-blue-600"}`}>
                {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`px-5 py-3.5 rounded-2xl max-w-[80%] ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-white border border-slate-200 shadow-sm rounded-tl-sm text-slate-800 whitespace-pre-wrap"}`}>
                {msg.content}
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><Bot className="w-4 h-4" /></div>
              <div className="px-5 py-4 rounded-2xl bg-white border shadow-sm flex items-center gap-1.5">
                {[0, 0.2, 0.4].map((d, i) => <motion.div key={i} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: d }} className="w-2 h-2 rounded-full bg-slate-300" />)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask anything about farming..." className="pr-12 h-14 rounded-2xl text-base" disabled={isLoading} />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="absolute right-2 w-10 h-10 rounded-xl"><Send className="w-4 h-4" /></Button>
          </form>
          <p className="text-center text-[10px] text-slate-400 mt-2">CRSAI can make mistakes. Verify important agronomic advice.</p>
        </div>
      </div>
    </div>
  );
}
