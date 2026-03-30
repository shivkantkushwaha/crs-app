"use client";
import { createBrowserClient } from "@supabase/ssr";

// ─── WIRE UP ──────────────────────────────────────────────────────────────────
// Add to .env.local:
//   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
//   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
// ─────────────────────────────────────────────────────────────────────────────

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Singleton for use in hooks/client components
export const supabase = createSupabaseBrowserClient();
