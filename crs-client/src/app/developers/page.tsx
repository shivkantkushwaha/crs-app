import { Metadata } from "next";

export const metadata: Metadata = { title: "Developers — CRSAPP" };

export default function DevelopersPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-6">Developers</h1>
      <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
        Content for this section goes here. Edit this file: <code className="text-primary font-mono text-sm">src/app/developers/page.tsx</code>
      </p>
    </div>
  );
}
