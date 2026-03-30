"use client";
/**
 * AuthModalContext
 *
 * Global context to control the auth modal (login/signup overlay).
 * Open the modal from anywhere in the app by calling openAuthModal().
 *
 * Usage:
 *   const { openAuthModal } = useAuthModal();
 *   openAuthModal("login")    // opens modal in login mode
 *   openAuthModal("signup")   // opens modal in signup mode
 */

import { createContext, useContext, useState } from "react";

type AuthModalMode = "login" | "signup";

interface AuthModalContextValue {
  isOpen: boolean;
  mode: AuthModalMode;
  openAuthModal: (mode?: AuthModalMode) => void;
  closeAuthModal: () => void;
  switchMode: (mode: AuthModalMode) => void;
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<AuthModalMode>("login");

  const openAuthModal = (m: AuthModalMode = "login") => {
    setMode(m);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeAuthModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  const switchMode = (m: AuthModalMode) => {
    setMode(m);
  };

  return (
    <AuthModalContext.Provider
      value={{ isOpen, mode, openAuthModal, closeAuthModal, switchMode }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
}
