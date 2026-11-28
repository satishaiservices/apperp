'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import {
  ShieldCheck,
  Building2,
  Lock,
  User,
  ArrowRight,
  Radio,
  Cpu,
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [mode, setMode] = useState<'org' | 'platform'>('org');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleModeSwitch = (newMode: 'org' | 'platform') => {
    setMode(newMode);
    setError(null);
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(identifier, password, mode);
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between relative overflow-hidden select-none">
      {/* Subtle civil engineering grid background pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#0A5C36 1px, transparent 1px), radial-gradient(#0A5C36 1px, #F8FAFC 1px)`,
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px'
        }}
      />

      {/* Top Station Telemetry Bar */}
      <header className="w-full bg-white/90 backdrop-blur border-b border-slate-200 py-2 px-6 flex items-center justify-between text-[11px] font-mono text-slate-500 z-10">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            NETWORK RTK LINK: ACTIVE
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden sm:inline">LATENCY: 18ms</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 text-emerald-700" />
            D-GPS FIX: L1/L2/L5 (0.028m PRECISION)
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden md:inline text-slate-600">OFFLINE CACHE PRIMED</span>
        </div>
      </header>

      {/* Main Login Container */}
      <main className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-[440px] bg-white rounded-xl shadow-xl shadow-slate-200/60 border border-slate-200/90 p-8 backdrop-blur-sm">
          {/* Brand & Heading */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 mb-3 shadow-inner">
              <ShieldCheck className="w-6 h-6 text-[#0A5C36]" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">VYHIR</h1>
              <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-emerald-100 text-[#0A5C36] rounded border border-emerald-200">
                CRS-CORE
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Civil Construction Control Center
            </p>
            <p className="text-[10px] font-mono text-slate-400 mt-0.5">
              SysVer 4.2.0 • High-Density Enterprise Portal
            </p>
          </div>

          {/* Access Mode Selector */}
          <div className="bg-slate-100 p-1 rounded-lg flex gap-1 mb-6 border border-slate-200">
            <button
              type="button"
              onClick={() => handleModeSwitch('org')}
              className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-md flex items-center justify-center gap-2 transition-all ${
                mode === 'org'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-[#0A5C36]" />
              Organization Admin
            </button>
            <button
              type="button"
              onClick={() => handleModeSwitch('platform')}
              className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-md flex items-center justify-center gap-2 transition-all ${
                mode === 'platform'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-[#0A5C36]" />
              Platform Super Admin
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-mono font-bold tracking-wider text-slate-700 uppercase">
                  {mode === 'platform' ? 'OPERATOR HANDLE / EMAIL' : 'WORK ID / FIELD USERNAME'}
                </label>
                <span className="text-[10px] font-mono text-slate-400">
                  {mode === 'platform' ? 'SYS-ROOT' : 'ORG-CLUSTER'}
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={mode === 'platform' ? 'Superadmin username or email' : 'Username or email'}
                  className="w-full pl-9 pr-3 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A5C36]/20 focus:border-[#0A5C36] transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-mono font-bold tracking-wider text-slate-700 uppercase">
                  MASTER PASSCODE
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Please contact your company HR / Organization Administrator to reset your credentials.');
                  }}
                  className="text-[11px] text-[#0A5C36] hover:underline font-medium"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A5C36]/20 focus:border-[#0A5C36] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-slate-300 text-[#0A5C36] focus:ring-[#0A5C36] w-3.5 h-3.5"
                />
                <span>Remember station credentials</span>
              </label>
              <span className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                <KeyRound className="w-3 h-3 text-slate-400" />
                FIDO2 Ready
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-2.5 px-4 bg-[#0A5C36] hover:bg-[#084A2B] text-white text-xs font-bold tracking-wide rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  SIGN IN TO CONTROL CENTER
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security & Context Footer */}
          <div className="mt-6 pt-5 border-t border-slate-200/80 text-[10px] font-mono text-slate-400 space-y-1 text-center">
            <div className="text-slate-500 font-semibold">
              CHAINAGE CONTEXT: SECTION IV (STA 120+00 - 148+50)
            </div>
            <div>
              AUTO-KERNEL: SECURE ENCLAVE 64 • CERT: FIPS-140-3 L3
            </div>
          </div>
        </div>
      </main>

      {/* Global Bottom Certification Bar */}
      <footer className="w-full py-2.5 px-6 border-t border-slate-200 bg-white/70 text-[10px] font-mono text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 z-10">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit Encrypted Linear Chainage & GPS Telemetry</span>
        </div>
        <div>
          Compliant with Federal Highway & Infrastructure CDE Standards
        </div>
      </footer>
    </div>
  );
}
