'use client';

import React, { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api-client';
import { useAuth } from '@/context/auth-context';
import {
  X,
  ShieldCheck,
  UserPlus,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Lock,
  User,
  Mail,
  Phone,
  Edit2,
  Trash2,
  AlertTriangle,
} from 'lucide-react';

interface PlatformAdmin {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  status: string;
  createdAt: string;
}

interface SuperadminUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuperadminUsersModal({ isOpen, onClose }: SuperadminUsersModalProps) {
  const { user: currentUser } = useAuth();
  const [admins, setAdmins] = useState<PlatformAdmin[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Add Form State
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Edit State
  const [editingAdmin, setEditingAdmin] = useState<PlatformAdmin | null>(null);
  const [editFullName, setEditFullName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editStatus, setEditStatus] = useState('ACTIVE');
  const [editNewPassword, setEditNewPassword] = useState('');

  // Delete State
  const [deletingAdmin, setDeletingAdmin] = useState<PlatformAdmin | null>(null);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiRequest('/platform/admins');
      setAdmins(res || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch platform superadmins');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAdmins();
      setShowAddForm(false);
      setEditingAdmin(null);
      setDeletingAdmin(null);
      setError(null);
      setSuccessMsg(null);
    }
  }, [isOpen]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!fullName.trim() || !username.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setError('All fields are required');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      setSubmitting(true);
      await apiRequest('/platform/admins', {
        method: 'POST',
        body: JSON.stringify({
          fullName: fullName.trim(),
          username: username.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password: password.trim(),
        }),
      });

      setSuccessMsg(`Superadmin ${username} created successfully.`);
      setFullName('');
      setUsername('');
      setEmail('');
      setPhone('');
      setPassword('');
      setShowAddForm(false);
      await fetchAdmins();
    } catch (err: any) {
      setError(err?.message || 'Failed to create platform superadmin');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStartEdit = (adm: PlatformAdmin) => {
    setEditingAdmin(adm);
    setEditFullName(adm.fullName);
    setEditEmail(adm.email);
    setEditPhone(adm.phone);
    setEditStatus(adm.status);
    setEditNewPassword('');
    setShowAddForm(false);
    setError(null);
    setSuccessMsg(null);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAdmin) return;
    setError(null);
    setSuccessMsg(null);

    if (editNewPassword && editNewPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      return;
    }

    try {
      setSubmitting(true);
      const payload: any = {
        fullName: editFullName.trim(),
        email: editEmail.trim(),
        phone: editPhone.trim(),
        status: editStatus,
      };
      if (editNewPassword.trim()) {
        payload.newPassword = editNewPassword.trim();
      }

      await apiRequest(`/platform/admins/${editingAdmin.id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });

      setSuccessMsg(`Superadmin ${editingAdmin.username} updated successfully.`);
      setEditingAdmin(null);
      await fetchAdmins();
    } catch (err: any) {
      setError(err?.message || 'Failed to update platform superadmin');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingAdmin) return;
    setError(null);
    setSuccessMsg(null);

    try {
      setSubmitting(true);
      const res = await apiRequest(`/platform/admins/${deletingAdmin.id}`, {
        method: 'DELETE',
      });

      setSuccessMsg(res?.message || `Superadmin ${deletingAdmin.username} deleted.`);
      setDeletingAdmin(null);
      await fetchAdmins();
    } catch (err: any) {
      setError(err?.message || 'Failed to delete platform superadmin');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#0A5C36] rounded-lg">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                Platform Superuser Management
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#0A5C36] text-white rounded">
                  ROOT
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Provision, manage, and revoke platform-wide superadmin privileges
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="text-xs font-semibold text-slate-700">
            {admins.length} Superadmin{admins.length === 1 ? '' : 's'} Configured
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchAdmins}
              disabled={loading}
              className="p-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title="Refresh list"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => {
                setShowAddForm(!showAddForm);
                setEditingAdmin(null);
                setError(null);
                setSuccessMsg(null);
              }}
              className="py-1.5 px-3 bg-[#0A5C36] hover:bg-[#084A2B] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              {showAddForm ? 'Cancel' : '+ Add Superadmin'}
            </button>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Add Superadmin Form */}
          {showAddForm && (
            <form onSubmit={handleCreate} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <UserPlus className="w-3.5 h-3.5 text-[#0A5C36]" />
                Provision New Platform Superadmin
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0A5C36]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Username *
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase())}
                    placeholder="e.g. superuser2"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0A5C36]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="super@vyhir.com"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0A5C36]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+919876543210"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0A5C36]"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Initial Password * (min 8 characters)
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 8 characters"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0A5C36]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-[#0A5C36] hover:bg-[#084A2B] rounded-lg disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Create Superadmin'}
                </button>
              </div>
            </form>
          )}

          {/* Edit Superadmin Form */}
          {editingAdmin && (
            <form onSubmit={handleSaveEdit} className="p-4 bg-amber-50/60 rounded-xl border border-amber-200 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Edit2 className="w-3.5 h-3.5 text-amber-700" />
                  Manage Superadmin: @{editingAdmin.username}
                </h3>
                <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                  Editing Account
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Account Status
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    disabled={editingAdmin.id === currentUser?.id}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600 disabled:bg-slate-100 disabled:text-slate-500"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                  {editingAdmin.id === currentUser?.id && (
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Cannot deactivate your own logged-in account
                    </span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Reset Password (leave empty to keep unchanged)
                  </label>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                    <input
                      type="password"
                      value={editNewPassword}
                      onChange={(e) => setEditNewPassword(e.target.value)}
                      placeholder="Optional new password (min 8 characters)"
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-amber-600"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingAdmin(null)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-lg disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

          {/* Delete Confirmation Dialog */}
          {deletingAdmin && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-red-800 font-bold text-xs font-mono">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                CONFIRM SUPERUSER REMOVAL
              </div>
              <p className="text-xs text-red-700">
                Are you sure you want to remove superadmin privileges for{' '}
                <strong className="font-mono">@{deletingAdmin.username}</strong> ({deletingAdmin.fullName})?
                This action is logged in the permanent audit trail.
              </p>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setDeletingAdmin(null)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleConfirmDelete}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? 'Removing...' : 'Confirm Remove Superadmin'}
                </button>
              </div>
            </div>
          )}

          {/* Table of Superadmins */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/75 border-b border-slate-200 text-slate-600 font-mono text-[11px]">
                  <th className="py-2.5 px-3">ADMIN NAME</th>
                  <th className="py-2.5 px-3">USERNAME</th>
                  <th className="py-2.5 px-3">CONTACT</th>
                  <th className="py-2.5 px-3">STATUS</th>
                  <th className="py-2.5 px-3 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {admins.map((adm) => {
                  const isCurrent = adm.id === currentUser?.id;
                  const isSole = admins.length <= 1;

                  return (
                    <tr key={adm.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        <div className="flex items-center gap-1.5">
                          <span>{adm.fullName}</span>
                          {isCurrent && (
                            <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold bg-[#0A5C36] text-white rounded">
                              YOU
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">
                        @{adm.username}
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">
                        <div>{adm.email}</div>
                        <div className="text-[10px] text-slate-400">{adm.phone}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${
                            adm.status === 'ACTIVE'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border-slate-300'
                          }`}
                        >
                          {adm.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleStartEdit(adm)}
                            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                            title="Edit / Reset Password"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeletingAdmin(adm)}
                            disabled={isCurrent || isSole}
                            className={`p-1.5 rounded-lg border transition-colors ${
                              isCurrent || isSole
                                ? 'text-slate-300 border-slate-200 cursor-not-allowed bg-slate-50'
                                : 'text-red-600 hover:text-red-800 hover:bg-red-50 border-red-200 cursor-pointer'
                            }`}
                            title={
                              isCurrent
                                ? 'Cannot delete your own account'
                                : isSole
                                  ? 'Cannot delete sole remaining superadmin'
                                  : 'Remove superadmin'
                            }
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {admins.length === 0 && !loading && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-400 italic">
                      No platform superadmin accounts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
