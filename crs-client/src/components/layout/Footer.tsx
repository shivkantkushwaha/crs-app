"use client";
import Link from "next/link";
import { Sprout, Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Sprout className="w-6 h-6 text-primary" />
              <span className="font-bold text-xl tracking-tight">CRSAPP</span>
            </Link>
            <p className="text-sm text-slate-500 mb-6">
              AI-powered crop intelligence for smarter, more sustainable farming decisions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="/dashboard/predict" className="text-sm text-slate-500 hover:text-primary transition-colors">Prediction Engine</Link></li>
              <li><Link href="/dashboard/chat" className="text-sm text-slate-500 hover:text-primary transition-colors">CRSAI Assistant</Link></li>
              <li><Link href="/technology" className="text-sm text-slate-500 hover:text-primary transition-colors">Weather Intelligence</Link></li>
              <li><Link href="/technology" className="text-sm text-slate-500 hover:text-primary transition-colors">Soil Analysis</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Developers</h3>
            <ul className="space-y-3">
              <li><Link href="/developers" className="text-sm text-slate-500 hover:text-primary transition-colors">API Documentation</Link></li>
              <li><Link href="/developers" className="text-sm text-slate-500 hover:text-primary transition-colors">Model Architecture</Link></li>
              <li><Link href="/developers" className="text-sm text-slate-500 hover:text-primary transition-colors">System Design</Link></li>
              <li><Link href="/developers" className="text-sm text-slate-500 hover:text-primary transition-colors">Status</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-slate-500 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/research" className="text-sm text-slate-500 hover:text-primary transition-colors">Research</Link></li>
              <li><Link href="/resources" className="text-sm text-slate-500 hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/admin" className="text-sm text-slate-500 hover:text-primary transition-colors">Admin Access</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} CRSAPP. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-slate-500 hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-slate-500 hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
