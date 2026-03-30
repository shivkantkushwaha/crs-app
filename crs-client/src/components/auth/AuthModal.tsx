"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sprout, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { auth } from "@/lib/supabase/auth";

export function AuthModal() {
  const { isOpen, mode, closeAuthModal, switchMode } = useAuthModal();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFullName("");
    setError("");
  };

  const handleModeSwitch = (newMode: "login" | "signup") => {
    resetForm();
    switchMode(newMode);
  };

  const handleClose = () => {
    resetForm();
    closeAuthModal();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const { data, error: authError } = await auth.signIn(email, password);
      if (authError) {
        setError(authError.message);
      } else if (data?.user) {
        handleClose();
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const { data, error: authError } = await auth.signUp(email, password, fullName);
      if (authError) {
        setError(authError.message);
      } else if (data?.user) {
        handleClose();
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const { supabase } = await import("@/lib/supabase/client");
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal Card */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl shadow-black/10 border border-slate-100 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Top Brand */}
              <div className="pt-8 px-8 pb-0 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-5">
                  <div className="bg-primary/10 p-1.5 rounded-lg">
                    <Sprout className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-bold text-lg tracking-tight">CRSAPP</span>
                </div>

                {/* Mode Tabs */}
                <div className="w-full flex bg-slate-100 rounded-xl p-1 mb-6">
                  <button
                    onClick={() => handleModeSwitch("login")}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      mode === "login"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleModeSwitch("signup")}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                      mode === "signup"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Create Account
                  </button>
                </div>
              </div>

              {/* Form Area */}
              <div className="px-8 pb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, x: mode === "login" ? -12 : 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: mode === "login" ? 12 : -12 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    {/* Error Banner */}
                    {error && (
                      <div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-xl flex items-center gap-3 text-sm mb-5">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        {error}
                      </div>
                    )}

                    <form
                      onSubmit={mode === "login" ? handleLogin : handleSignup}
                      className="space-y-4"
                    >
                      {mode === "signup" && (
                        <div>
                          <Label htmlFor="modal-name" className="text-slate-700 font-medium text-sm">
                            Full Name
                          </Label>
                          <Input
                            id="modal-name"
                            type="text"
                            required
                            placeholder="Ravi Kumar"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="mt-1.5 h-11 rounded-xl border-slate-200 focus-visible:ring-primary/30"
                          />
                        </div>
                      )}

                      <div>
                        <Label htmlFor="modal-email" className="text-slate-700 font-medium text-sm">
                          Email address
                        </Label>
                        <Input
                          id="modal-email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1.5 h-11 rounded-xl border-slate-200 focus-visible:ring-primary/30"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="modal-password" className="text-slate-700 font-medium text-sm">
                            Password
                          </Label>
                          {mode === "login" && (
                            <button
                              type="button"
                              className="text-xs text-primary hover:underline font-medium"
                            >
                              Forgot password?
                            </button>
                          )}
                        </div>
                        <Input
                          id="modal-password"
                          type="password"
                          required
                          autoComplete={mode === "login" ? "current-password" : "new-password"}
                          placeholder={mode === "login" ? "Enter your password" : "Min. 6 characters"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="mt-1.5 h-11 rounded-xl border-slate-200 focus-visible:ring-primary/30"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-11 rounded-xl mt-2 text-sm font-semibold shadow-md shadow-primary/20"
                        disabled={isLoading}
                      >
                        {isLoading
                          ? mode === "login" ? "Signing in..." : "Creating account..."
                          : mode === "login" ? "Sign In" : "Create Account"}
                      </Button>
                    </form>

                    {/* Social Login Divider */}
                    <div className="relative my-5">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-3 bg-white text-xs text-slate-400 font-medium">
                          or continue with
                        </span>
                      </div>
                    </div>

                    {/* Google Login Button */}
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="w-full h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center gap-3 text-sm font-medium text-slate-700 transition-colors cursor-pointer"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Continue with Google
                    </button>

                    <p className="text-center text-xs text-slate-400 mt-4">
                      {mode === "login"
                        ? "Don't have an account? "
                        : "Already have an account? "}
                      <button
                        type="button"
                        onClick={() => handleModeSwitch(mode === "login" ? "signup" : "login")}
                        className="text-primary font-semibold hover:underline"
                      >
                        {mode === "login" ? "Sign up free" : "Sign in"}
                      </button>
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}