'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import {
  ShieldAlert,
  ShieldCheck,
  Radio,
  LogOut,
  Activity,
  Layers,
  Settings,
  Users,
} from 'lucide-react';

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isPlatformAdmin, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
      } else if (!isPlatformAdmin) {
        router.push('/org/dashboard');
      }
    }
  }, [user, isPlatformAdmin, isLoading, router]);

  if (isLoading || !user || !isPlatformAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#0A5C36]/30 border-t-[#0A5C36] rounded-full animate-spin" />
          <span className="text-xs font-mono text-slate-500">
            Verifying Platform Super Admin Privileges...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200/90 h-14 px-6 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-[#0A5C36]" />
            </div>
            <div>
              <span className="font-bold text-sm text-slate-900 tracking-tight">VYHIR</span>
              <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-mono font-bold bg-slate-900 text-white rounded">
                ROOT TIER
              </span>
            </div>
          </div>

          <div className="h-5 w-px bg-slate-200 hidden sm:block" />

          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[11px] text-emerald-800 font-semibold">
              PLATFORM OPERATOR MODE
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[11px] text-slate-500 font-mono">SYS-HUB: AP-SOUTH-1</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md font-mono text-[11px] text-slate-600">
            <Radio className="w-3.5 h-3.5 text-emerald-600" />
            <span>99.98% System Uptime</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex flex-col text-right">
              <span className="font-semibold text-slate-900 text-xs">
                {user.fullName || 'Platform Operator'}
              </span>
              <span className="text-[10px] font-mono text-emerald-700">
                @{user.username || 'superadmin'}
              </span>
            </div>

            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
