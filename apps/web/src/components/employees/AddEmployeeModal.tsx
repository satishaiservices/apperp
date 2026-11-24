'use client';

import React, { useState } from 'react';
import { apiRequest } from '@/lib/api-client';
import {
  X,
  UserPlus,
  KeyRound,
  Copy,
  Check,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddEmployeeModal({
  isOpen,
  onClose,
  onSuccess,
}: AddEmployeeModalProps) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [roleName, setRoleName] = useState('SUPERVISOR');
  const [password, setPassword] = useState('VyhirEmp@2026');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [createdResult, setCreatedResult] = useState<any | null>(null);

  const resetForm = () => {
    setCreatedResult(null);
    setFullName('');
    setUsername('');
    setPhone('');
    setEmail('');
    setPassword('VyhirEmp@2026');
    setError(null);
    setCopied(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  const handleNameChange = (val: string) => {
    setFullName(val);
    if (!username) {
      const parts = val.trim().toLowerCase().split(' ');
      if (parts.length > 1) {
        setUsername(`${parts[0][0]}.${parts[parts.length - 1]}`);
      } else if (parts.length === 1 && parts[0]) {
        setUsername(parts[0]);
      }
    }
  };

  const generatePasscode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$';
    let res = 'Emp-';
    for (let i = 0; i < 6; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(res);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email.trim() || !phone.trim()) {
      setError('Email ID and Contact Phone are compulsory');
      setLoading(false);
      return;
    }

    try {
      const res = await apiRequest('/users/provision', {
        method: 'POST',
        body: JSON.stringify({
          fullName,
          username,
          phone: phone.trim(),
          email: email.trim(),
          roleName,
          password,
        }),
      });

      setCreatedResult(res);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to create employee');
    } finally {
      setLoading(false);
    }
  };

  const copyCredentials = () => {
    if (!createdResult) return;
    const text = `VYHIR CivilERP — Employee Access Details\n---------------------------------------\nEmployee Name: ${createdResult.user.fullName}\nRole: ${createdResult.user.role}\nUsername (Terminal Handle): ${createdResult.user.username}\nContact Phone: ${createdResult.user.phone || 'N/A'}\nTemporary Password: ${createdResult.temporaryPassword}\nLogin via Mobile App or Web Control Center: ${window.location.origin}/login`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-[#0A5C36]" />
              <h2 className="text-sm font-bold text-slate-900">
                Provision New Field Employee
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Assign username and initial mobile login credentials.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {createdResult ? (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
                <Check className="w-5 h-5 text-[#0A5C36] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Employee Account Created Successfully</h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    <span className="font-semibold">{createdResult.user.fullName}</span> has been provisioned as <span className="font-semibold">{createdResult.user.role}</span>.
                  </p>
                </div>
              </div>

              {/* Credentials Card */}
              <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs border border-slate-800 space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-[11px] text-slate-400 font-sans">
                  <span>TERMINAL CREDENTIALS DISPATCH</span>
                  <span className="text-emerald-400 font-mono">ACTIVE</span>
                </div>
                <div><span className="text-slate-400">NAME:</span> {createdResult.user.fullName}</div>
                <div><span className="text-slate-400">ROLE:</span> {createdResult.user.role}</div>
                <div><span className="text-slate-400">USERNAME:</span> <span className="text-amber-300 font-bold">{createdResult.user.username}</span></div>
                <div><span className="text-slate-400">PHONE:</span> {createdResult.user.phone || 'N/A'}</div>
                <div><span className="text-slate-400">TEMPORARY PASSCODE:</span> <span className="text-emerald-400 font-bold">{createdResult.temporaryPassword}</span></div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={copyCredentials}
                  className="flex-1 py-2 px-4 rounded-lg bg-[#0A5C36] hover:bg-[#084A2B] text-white font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      COPIED CREDENTIALS!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      COPY CREDENTIALS
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <UserPlus className="w-4 h-4 text-emerald-400" />
                  + Add Another Employee
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="py-2 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Anita Kulkarni"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0A5C36]"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Terminal Handle (Username) *</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. a.kulkarni"
                    className="w-full px-3 py-1.5 font-mono border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0A5C36]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98200 48190"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0A5C36]"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Email ID *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. anita@apexinfra.io"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0A5C36]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Assigned Role</label>
                <select
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0A5C36]"
                >
                  <option value="SUPERVISOR">Site Supervisor (Field Reports & Attendance)</option>
                  <option value="PROJECT_MANAGER">Project Manager (Site Oversight)</option>
                  <option value="QC_INSPECTOR">QC Inspector (Quality & Tests)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-slate-600 font-medium">Initial Passcode *</label>
                  <button
                    type="button"
                    onClick={generatePasscode}
                    className="text-[11px] text-[#0A5C36] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    Auto-generate
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-1.5 font-mono border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0A5C36]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-[#0A5C36] hover:bg-[#084A2B] text-white font-bold rounded-lg flex items-center gap-2 shadow-sm transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {loading ? 'Creating...' : 'Provision Employee'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
