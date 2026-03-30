"use client";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Profile</h1>
      <Card className="max-w-md rounded-2xl">
        <CardHeader><CardTitle className="flex items-center gap-2"><User className="w-5 h-5" />Account Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Name</p>
            <p className="text-slate-900 font-medium">{user?.user_metadata?.full_name ?? "—"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email</p>
            <p className="text-slate-900 font-medium">{user?.email ?? "—"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">User ID</p>
            <p className="text-slate-500 text-sm font-mono">{user?.id ?? "—"}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
