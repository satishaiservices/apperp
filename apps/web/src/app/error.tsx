'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled route error captured:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-600 shadow-inner">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold bg-rose-100 text-rose-800 px-2.5 py-1 rounded-md">
            TELEMETRY FAULT • ERROR 500
          </span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Control Center Encountered an Error
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            An unexpected error occurred while processing this operation. Telemetry diagnostics have recorded this incident.
          </p>
          {error.digest && (
            <div className="font-mono text-[10px] text-slate-400 pt-1">
              Ref Digest: {error.digest}
            </div>
          )}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-4 py-2.5 bg-[#0A5C36] hover:bg-[#084A2B] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/org/dashboard"
            className="px-4 py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-4 h-4" />
            Control Center
          </Link>
        </div>
      </div>
    </div>
  );
}
