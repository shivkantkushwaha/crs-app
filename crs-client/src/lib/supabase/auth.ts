"use client";
import { supabase } from "./client";

// ─── AUTH HELPERS ─────────────────────────────────────────────────────────────
// Used by AuthModal and auth pages.
// Google OAuth: enable in Supabase Dashboard → Auth → Providers → Google
// ─────────────────────────────────────────────────────────────────────────────

export const auth = {
  signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  },

  signUp(email: string, password: string, fullName: string) {
    return supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
  },

  // ── Google OAuth (uncomment after enabling in Supabase Dashboard) ──────────
  // signInWithGoogle() {
  //   return supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     options: { redirectTo: `${window.location.origin}/auth/callback` },
  //   });
  // },

  signOut() {
    return supabase.auth.signOut();
  },

  getUser() {
    return supabase.auth.getUser();
  },

  onAuthStateChange: supabase.auth.onAuthStateChange.bind(supabase.auth),
};
