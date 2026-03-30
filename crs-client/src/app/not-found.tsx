import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-extrabold text-slate-200 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-900 mb-3">Page not found</h2>
      <p className="text-slate-500 mb-8">The page you're looking for doesn't exist.</p>
      <Link href="/"><Button className="rounded-full px-8">Go Home</Button></Link>
    </div>
  );
}
