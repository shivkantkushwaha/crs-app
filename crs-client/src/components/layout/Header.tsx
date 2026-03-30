"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { label: "Technology", href: "/technology" },
  { label: "Research", href: "/research" },
  { label: "Developers", href: "/developers" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export function Header() {
  const pathname = usePathname();
  const { openAuthModal } = useAuthModal();
  const { user, logout } = useAuth();
  const router = useRouter();

  const isDashboard = pathname?.startsWith("/dashboard");
  if (isDashboard) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Sprout className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">CRSAPP</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? "text-primary bg-primary/5"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>Dashboard</Button>
              <Button variant="outline" size="sm" onClick={logout}>Sign Out</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => openAuthModal("login")}>Sign In</Button>
              <Button size="sm" className="rounded-full px-5 shadow-sm" onClick={() => openAuthModal("signup")}>Get Started</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
