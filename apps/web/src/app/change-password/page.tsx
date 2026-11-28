'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { KeyRound, Loader2, ShieldAlert } from 'lucide-react';
import { apiRequest } from '@/lib/api-client';
import { useAuth } from '@/context/auth-context';

const MIN_LENGTH = 10;

export default function ChangePasswordPage() {
  const router = useRouter();
  const { user, applySession, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const forced = !!user?.mustChangePassword;

  const validate = (): string | null => {
    if (newPassword.length < MIN_LENGTH) return `New password must be at least ${MIN_LENGTH} characters.`;
    if (!/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      return 'New password must contain both letters and numbers.';
    }
    if (newPassword !== confirmPassword) return 'New passwords do not match.';
    if (newPassword === currentPassword) return 'New password must be different from the current one.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const problem = validate();
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      const data = await apiRequest('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const updated = applySession(data);
      router.replace(updated.isPlatformAdmin && data.tenant?.slug === 'platform-operator' ? '/platform' : '/org/dashboard');
    } catch (err: any) {
      setError(err.message || 'Could not change password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0A5C36]/20 focus:border-[#0A5C36]';

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4"
      >
        <div className="flex items-center gap-2 text-[#0A5C36]">
          <KeyRound className="w-5 h-5" />
          <h1 className="text-lg font-semibold text-slate-900">Change password</h1>
        </div>

        {forced && (
          <div className="flex gap-2 text-sm bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-3">
            <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0" />
            <span>
              Your password was set by an administrator or is a default password. Choose a new one to continue.
            </span>
          </div>
        )}

        {error && (
          <div className="text-sm bg-red-50 border border-red-200 text-red-700 rounded-lg p-3">{error}</div>
        )}

        <label className="block space-y-1">
          <span className="text-xs font-medium text-slate-600">Current password</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-medium text-slate-600">
            New password (at least {MIN_LENGTH} characters, letters and numbers)
          </span>
          <input
            type="password"
            autoComplete="new-password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="block space-y-1">
          <span className="text-xs font-medium text-slate-600">Confirm new password</span>
          <input
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputClass}
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-[#0A5C36] hover:bg-[#084a2c] disabled:opacity-60 text-white text-sm font-medium rounded-lg py-2.5"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          Update password
        </button>

        <button type="button" onClick={logout} className="w-full text-xs text-slate-500 hover:text-slate-700">
          Sign out
        </button>
      </form>
    </div>
  );
}
