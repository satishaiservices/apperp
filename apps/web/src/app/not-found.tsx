import React from 'react';
import Link from 'next/link';
import { HardHat, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-[#0A5C36] shadow-inner">
          <HardHat className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
            HTTP 404 • ALIGNMENT NOT FOUND
          </span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Page Not On Route
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            The road section or control center page you requested does not exist or has been relocated to another chainage.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/org/dashboard"
            className="px-4 py-2.5 bg-[#0A5C36] hover:bg-[#084A2B] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <Link
            href="/login"
            className="px-4 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Sign In Screen
          </Link>
        </div>
      </div>
    </div>
  );
}
