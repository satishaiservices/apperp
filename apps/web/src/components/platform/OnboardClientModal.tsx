'use client';

import React, { useState } from 'react';
import { apiRequest } from '@/lib/api-client';
import {
  X,
  Building,
  KeyRound,
  Copy,
  Check,
  ShieldAlert,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface OnboardClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function OnboardClientModal({
  isOpen,
  onClose,
  onSuccess,
}: OnboardClientModalProps) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [adminFullName, setAdminFullName] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminPassword, setAdminPassword] = useState('ApexSecure@2026');
  const [tier, setTier] = useState('ENTERPRISE');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [createdResult, setCreatedResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const generatePasscode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$';
    let res = 'Vyhir-';
    for (let i = 0; i < 8; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setAdminPassword(res);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    const derivedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 30);
    setSlug(derivedSlug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!adminEmail.trim() || !adminPhone.trim()) {
      setError('Admin Email and Contact Phone are compulsory');
      setLoading(false);
      return;
    }

    try {
      const res = await apiRequest('/platform/tenants', {
        method: 'POST',
        body: JSON.stringify({
          name,
          slug,
          adminFullName,
          adminUsername,
          adminEmail: adminEmail.trim(),
          adminPhone: adminPhone.trim(),
          adminPassword,
          tier,
        }),
      });

      setCreatedResult(res);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to onboard organization');
    } finally {
      setLoading(false);
    }
  };

  const copyCredentials = () => {
    if (!createdResult) return;
    const text = `VYHIR CivilERP — Organization Credentials\n---------------------------------------\nCompany: ${createdResult.tenant.name}\nAdmin Name: ${createdResult.adminUser.fullName}\nUsername: ${createdResult.adminUser.username}\nEmail: ${createdResult.adminUser.email || 'N/A'}\nTemporary Password: ${createdResult.adminUser.temporaryPassword}\nLogin Portal: ${window.location.origin}/login`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-[#0A5C36]" />
              <h2 className="text-sm font-bold text-slate-900">
                Quick Provision Client Organization
              </h2>
              <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-emerald-100 text-[#0A5C36] rounded">
                MULTI-TENANT SETUP
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Deploy a new company workspace and provision the main administrator.
            </p>
          </div>
          <button
            onClick={onClose}
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
                  <h4 className="font-bold text-sm">Client Organization Successfully Deployed</h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Workspace created for <span className="font-semibold">{createdResult.tenant.name}</span>. The initial Organization Administrator can now log in.
                  </p>
                </div>
              </div>

              {/* Credentials Card */}
              <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs border border-slate-800 space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-[11px] text-slate-400 font-sans">
                  <span>DISPATCHABLE CREDENTIALS</span>
                  <span className="text-emerald-400 font-mono">STATUS: READY</span>
                </div>
                <div><span className="text-slate-400">ORGANIZATION:</span> {createdResult.tenant.name}</div>
                <div><span className="text-slate-400">SLUG:</span> {createdResult.tenant.slug}</div>
                <div><span className="text-slate-400">ADMIN USER:</span> {createdResult.adminUser.fullName}</div>
                <div><span className="text-slate-400">USERNAME:</span> <span className="text-amber-300 font-bold">{createdResult.adminUser.username}</span></div>
                <div><span className="text-slate-400">EMAIL:</span> {createdResult.adminUser.email || 'Not specified'}</div>
                <div><span className="text-slate-400">PASSCODE:</span> <span className="text-emerald-400 font-bold">{createdResult.adminUser.temporaryPassword}</span></div>
              </div>

              <div className="flex gap-3 pt-2">
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
                      COPY CREDENTIALS TO CLIPBOARD
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-5 rounded-lg border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{error}</span>
                </div>
              )}

              {/* Organization Info */}
              <div className="space-y-3 pb-3 border-b border-slate-200">
                <div className="font-semibold text-slate-900 text-[11px] font-mono uppercase tracking-wider">
                  1. Company & Tenant Parameters
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Company Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="e.g. Apex Highway Infra Ltd"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Tenant Slug (Identifier)</label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="e.g. apex-infra"
                      className="w-full px-3 py-1.5 font-mono border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="tier"
                      checked={tier === 'ENTERPRISE'}
                      onChange={() => setTier('ENTERPRISE')}
                      className="text-[#0A5C36] focus:ring-[#0A5C36]"
                    />
                    <span className="font-medium text-slate-700">Enterprise Tier (Unlimited sites, dedicated RTK streams)</span>
                  </label>
                </div>
              </div>

              {/* Main Admin Setup */}
              <div className="space-y-3">
                <div className="font-semibold text-slate-900 text-[11px] font-mono uppercase tracking-wider">
                  2. Primary Organization Admin Account
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Admin Full Name *</label>
                    <input
                      type="text"
                      required
                      value={adminFullName}
                      onChange={(e) => setAdminFullName(e.target.value)}
                      placeholder="e.g. Er. Rajesh Verma"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Admin Username *</label>
                    <input
                      type="text"
                      required
                      value={adminUsername}
                      onChange={(e) => setAdminUsername(e.target.value)}
                      placeholder="e.g. r.verma.nh48"
                      className="w-full px-3 py-1.5 font-mono border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Admin Email ID *</label>
                    <input
                      type="email"
                      required
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="director@apexinfra.io"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Contact Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={adminPhone}
                      onChange={(e) => setAdminPhone(e.target.value)}
                      placeholder="+91 98711 02394"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-slate-600 font-medium">Initial Passcode *</label>
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
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full px-3 py-1.5 font-mono border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-[#0A5C36] hover:bg-[#084A2B] text-white font-bold rounded-lg flex items-center gap-2 shadow-sm transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {loading ? 'Deploying Tenant...' : 'Deploy Tenant & Generate Credentials'}
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
