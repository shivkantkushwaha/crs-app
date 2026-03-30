"use client";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, MessageSquare, BarChart2, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const name = user?.user_metadata?.full_name?.split(" ")[0] ?? "there";

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Good morning, {name} 👋</h1>
        <p className="text-slate-500 mt-1">Here&apos;s your agricultural intelligence dashboard.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="rounded-2xl border-slate-200 hover:shadow-lg hover:border-primary/20 transition-all group">
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Sprout className="w-5 h-5 text-primary" />Prediction Engine</CardTitle></CardHeader>
          <CardContent><p className="text-slate-500 text-sm mb-4">Run ML-powered crop predictions using soil and climate inputs.</p>
            <Link href="/dashboard/predict"><Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">Run Prediction <ArrowRight className="w-3.5 h-3.5 ml-2" /></Button></Link>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all group">
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><MessageSquare className="w-5 h-5 text-blue-500" />CRSAI Assistant</CardTitle></CardHeader>
          <CardContent><p className="text-slate-500 text-sm mb-4">Ask CRSAI anything about farming, soil health, or crop diseases.</p>
            <Link href="/dashboard/chat"><Button size="sm" variant="outline" className="group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-colors">Open Chat <ArrowRight className="w-3.5 h-3.5 ml-2" /></Button></Link>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all">
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><BarChart2 className="w-5 h-5 text-slate-500" />Analytics</CardTitle></CardHeader>
          <CardContent><p className="text-slate-500 text-sm mb-4">View your prediction history and agronomy insights.</p>
            <Button size="sm" variant="outline" disabled>Coming Soon</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
