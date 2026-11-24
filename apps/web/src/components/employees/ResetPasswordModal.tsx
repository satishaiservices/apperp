'use client';

import React, { useState } from 'react';
import { apiRequest } from '@/lib/api-client';
import {
  X,
  KeyRound,
  Check,
  Copy,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

interface ResetPasswordModalProps {
  membershipId: string | null;
  employeeName: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function ResetPasswordModal({
  membershipId,
  employeeName,
  onClose,
  onSuccess,
}: ResetPasswordModalProps) {
  const [newPassword, setNewPassword] = useState('Pass@2026!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  if (!membershipId) return null;

  const generatePasscode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$';
    let res = 'Reset-';
    for (let i = 0; i < 6; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(res);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await apiRequest(`/users/${membershipId}/reset-password`, {
        method: 'POST',
        body: JSON.stringify({ newPassword }),
      });
      setResult(res);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const copyCreds = () => {
    if (!result) return;
    const text = `VYHIR CivilERP Password Reset\n-----------------------------\nEmployee: ${employeeName}\nUsername: ${result.username}\nNew Temporary Password: ${result.temporaryPassword}\nLogin: ${window.location.origin}/login`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden text-xs">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-[#0A5C36]" />
            <span className="font-bold text-slate-900 text-sm">Reset Employee Password</span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          {result ? (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900">
                <span className="font-bold">Password reset successful for {employeeName}!</span>
              </div>
              <div className="p-3 bg-slate-900 text-slate-100 rounded-lg font-mono space-y-1">
                <div><span className="text-slate-400">Username:</span> {result.username}</div>
                <div><span className="text-slate-400">New Password:</span> <span className="text-emerald-400 font-bold">{result.temporaryPassword}</span></div>
              </div>
              <button
                onClick={copyCreds}
                className="w-full py-2 bg-[#0A5C36] text-white font-bold rounded-lg flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied to Clipboard!' : 'Copy New Credentials'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              {error && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded text-rose-800">
                  {error}
                </div>
              )}
              <div>
                <p className="text-slate-600 mb-3">
                  Reset credentials for <span className="font-bold text-slate-900">{employeeName}</span>. They will be required to use this temporary passcode on their next mobile or web login.
                </p>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-medium text-slate-700">New Password</label>
                  <button
                    type="button"
                    onClick={generatePasscode}
                    className="text-[11px] text-[#0A5C36] font-semibold flex items-center gap-1 hover:underline"
                  >
                    <Sparkles className="w-3 h-3" />
                    Auto-generate
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-1.5 font-mono border border-slate-300 rounded focus:ring-1 focus:ring-[#0A5C36]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 border border-slate-300 rounded text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-1.5 bg-[#0A5C36] hover:bg-[#084A2B] text-white font-bold rounded"
                >
                  {loading ? 'Resetting...' : 'Confirm Reset'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
