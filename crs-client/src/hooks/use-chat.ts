"use client";
import { useState, useCallback } from "react";
import { sendMessage } from "@/lib/gemini/client";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendChat = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    const history = messages.map((m) => ({
      role: m.role === "assistant" ? ("model" as const) : ("user" as const),
      parts: [{ text: m.content }] as [{ text: string }],
    }));

    try {
      const reply = await sendMessage(history, text);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "CRSAI failed to respond.");
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearChat = () => { setMessages([]); setError(null); };

  return { messages, isLoading, error, sendMessage: sendChat, clearChat };
}
