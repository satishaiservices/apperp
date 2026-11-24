'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import {
  LayoutDashboard,
  Route,
  FileCheck2,
  Clock,
  Users,
  ShieldAlert,
  LogOut,
  Building2,
  Radio,
  Bell,
  ChevronDown,
  HardHat,
  ShieldCheck,
} from 'lucide-react';

export default function OrgLayout({ children }: { children: React.ReactNode }) {
  const { user, tenant, isPlatformAdmin, isLoading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#0A5C36]/30 border-t-[#0A5C36] rounded-full animate-spin" />
          <span className="text-xs font-mono text-slate-500">Loading Control Center...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Dashboard', href: '/org/dashboard', icon: LayoutDashboard },
    { label: 'Projects & Linear Setup', href: '/org/projects', icon: Route },
    { label: 'Field Submissions', href: '/org/submissions', icon: FileCheck2 },
    { label: 'Attendance & Logs', href: '/org/attendance', icon: Clock },
    { label: 'Workforce & Crew', href: '/org/employees', icon: Users },
    { label: 'Audit Trail', href: '/org/audit', icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#0F172A] text-slate-300 flex flex-col shrink-0 border-r border-slate-800 z-30 select-none">
        {/* Brand */}
        <div className="h-16 px-5 flex items-center gap-3 border-b border-slate-800/80 bg-slate-950/40">
          <div className="w-9 h-9 rounded-lg bg-[#0A5C36] flex items-center justify-center text-white font-bold shadow-md">
            <HardHat className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm text-white tracking-wide">VYHIR</span>
              <span className="px-1.5 py-0.2 text-[9px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">
                PROD
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">CivilERP Control Center</div>
          </div>
        </div>

        {/* Tenant Indicator */}
        <div className="p-3 mx-3 mt-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 overflow-hidden">
            <Building2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="truncate">
              <div className="font-bold text-white text-xs truncate">
                {tenant?.name || 'Organization'}
              </div>
              <div className="text-[10px] font-mono text-slate-400 truncate">
                {tenant?.slug || 'active-tenant'}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#0A5C36] text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {isPlatformAdmin && (
            <div className="pt-4 mt-4 border-t border-slate-800">
              <div className="px-3 pb-1 text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider">
                Platform Operator
              </div>
              <Link
                href="/platform"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-emerald-400 hover:bg-slate-800/80 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Super Admin Portal</span>
              </Link>
            </div>
          )}
        </nav>

        {/* User Card & Logout */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-white uppercase shrink-0">
              {user.fullName ? user.fullName.charAt(0) : 'U'}
            </div>
            <div className="truncate">
              <div className="font-semibold text-xs text-white truncate">{user.fullName}</div>
              <div className="text-[10px] font-mono text-emerald-400 truncate">
                @{user.username || 'user'}
              </div>
            </div>
          </div>
          <button
            onClick={logout}
            title="Sign Out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Operational Bar */}
        <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-3 text-xs">
            <span className="font-bold text-slate-900">{tenant?.name}</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500 font-medium">Control Center</span>
            <span className="hidden sm:inline px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
              LIVE TELEMETRY
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-[11px] text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Day Shift: 07:00 - 19:00</span>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-[11px] text-slate-600">
              <Radio className="w-3.5 h-3.5 text-emerald-600" />
              <span>RTK-Fixed (±2.8m)</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-[11px]">99.98% Uptime</span>
              <button 
                title="Notifications"
                className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <Bell className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
