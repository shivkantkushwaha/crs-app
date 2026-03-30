import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// ─── Server-side Supabase client ──────────────────────────────────────────────
// Use this in:
//   - Server Components
//   - API Route Handlers (src/app/api/*)
//   - Server Actions
// ─────────────────────────────────────────────────────────────────────────────

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}
