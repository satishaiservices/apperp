'use client';

import React, { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api-client';
import {
  X,
  Building2,
  Users,
  FolderKanban,
  Settings,
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  Check,
  Copy,
  Clock,
  Mail,
  Phone,
  Search,
  ExternalLink,
  Save,
  RefreshCw,
  AlertCircle,
  UserPlus,
  Sparkles,
} from 'lucide-react';

interface ManageTenantDrawerProps {
  tenantId: string | null;
  onClose: () => void;
  onTenantUpdated: () => void;
}

export function ManageTenantDrawer({
  tenantId,
  onClose,
  onTenantUpdated,
}: ManageTenantDrawerProps) {
  const [tenant, setTenant] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'settings' | 'users' | 'projects'>('settings');

  // Edit settings form
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Users filter
  const [userSearch, setUserSearch] = useState('');

  // Add User State
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [addFullName, setAddFullName] = useState('');
  const [addUsername, setAddUsername] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addPhone, setAddPhone] = useState('');
  const [addRole, setAddRole] = useState('SUPERVISOR');
  const [addPassword, setAddPassword] = useState('VyhirEmp@2026');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [addUserError, setAddUserError] = useState<string | null>(null);
  const [createdUserResult, setCreatedUserResult] = useState<any | null>(null);
  const [copiedNewUserPass, setCopiedNewUserPass] = useState(false);

  // Password Reset Modal
  const [resettingUser, setResettingUser] = useState<any | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState<string | null>(null);
  const [copiedPass, setCopiedPass] = useState(false);

  const generateNewUserPasscode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$';
    let res = 'Emp-';
    for (let i = 0; i < 6; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setAddPassword(res);
  };

  const handleAddNameChange = (val: string) => {
    setAddFullName(val);
    if (!addUsername) {
      const parts = val.trim().toLowerCase().split(' ');
      if (parts.length > 1) {
        setAddUsername(`${parts[0][0]}.${parts[parts.length - 1]}`);
      } else if (parts.length === 1 && parts[0]) {
        setAddUsername(parts[0]);
      }
    }
  };

  const resetAddUserForm = () => {
    setIsAddUserOpen(false);
    setAddFullName('');
    setAddUsername('');
    setAddEmail('');
    setAddPhone('');
    setAddRole('SUPERVISOR');
    setAddPassword('VyhirEmp@2026');
    setAddUserError(null);
    setCreatedUserResult(null);
    setCopiedNewUserPass(false);
  };

  const handleAddUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addFullName.trim() || !addUsername.trim() || !addEmail.trim() || !addPhone.trim()) {
      setAddUserError('Full Name, Username, Email ID, and Contact Phone are compulsory');
      return;
    }
    try {
      setIsAddingUser(true);
      setAddUserError(null);
      const res = await apiRequest(`/platform/tenants/${tenantId}/users`, {
        method: 'POST',
        body: JSON.stringify({
          fullName: addFullName.trim(),
          username: addUsername.trim(),
          email: addEmail.trim(),
          phone: addPhone.trim(),
          roleName: addRole,
          password: addPassword.trim(),
        }),
      });
      setCreatedUserResult(res);
      await fetchTenantDetails(tenantId!);
      onTenantUpdated();
    } catch (err: any) {
      setAddUserError(err.message || 'Failed to add user to organization');
    } finally {
      setIsAddingUser(false);
    }
  };

  const fetchTenantDetails = async (id: string) => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const data = await apiRequest(`/platform/tenants/${id}`);
      setTenant(data);
      setName(data.name || '');
      setSlug(data.slug || '');
      setStatus(data.status || 'ACTIVE');
    } catch (err: any) {
      console.error('Failed to load tenant details', err);
      setErrorMessage(err.message || 'Failed to load organization details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tenantId) {
      fetchTenantDetails(tenantId);
      setActiveTab('settings');
      setSaveMessage(null);
      setResettingUser(null);
      setResetSuccess(null);
      resetAddUserForm();
    } else {
      setTenant(null);
    }
  }, [tenantId]);

  if (!tenantId) return null;

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setIsSaving(true);
      setSaveMessage(null);
      setErrorMessage(null);

      await apiRequest(`/platform/tenants/${tenantId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: name.trim(),
          slug: slug.trim(),
          status,
        }),
      });

      setSaveMessage('Organization settings updated successfully!');
      onTenantUpdated();
      // Refresh current tenant view
      await fetchTenantDetails(tenantId);
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err: any) {
      console.error('Failed to update tenant', err);
      setErrorMessage(err.message || 'Failed to update organization');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resettingUser) return;
    try {
      setIsResetting(true);
      const res = await apiRequest(
        `/platform/tenants/${tenantId}/users/${resettingUser.userId}/reset-password`,
        {
          method: 'POST',
          body: JSON.stringify({
            newPassword: newPassword.trim() || undefined,
          }),
        },
      );
      setResetSuccess(res.temporaryPassword);
      setNewPassword('');
    } catch (err: any) {
      alert(err.message || 'Failed to reset password');
    } finally {
      setIsResetting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 2000);
  };

  const filteredUsers = (tenant?.users || []).filter((u: any) => {
    const q = userSearch.toLowerCase();
    return (
      (u.fullName || '').toLowerCase().includes(q) ||
      (u.username || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      (u.roles || []).some((r: string) => r.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-white border-l border-slate-200 shadow-2xl flex flex-col text-xs animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0A5C36] font-bold text-sm">
            {tenant?.name ? tenant.name.slice(0, 2).toUpperCase() : 'OR'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-900">
                {tenant?.name || 'Manage Organization'}
              </h3>
              {tenant?.status === 'ACTIVE' ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  ACTIVE
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-100 text-rose-800 border border-rose-200">
                  {tenant?.status || 'SUSPENDED'}
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">
              Slug: <strong className="text-slate-700">{tenant?.slug || 'loading...'}</strong> • ID: {tenantId.slice(0, 8)}...
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => fetchTenantDetails(tenantId)}
            title="Reload details"
            className="p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-white px-4 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('settings')}
          className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'settings'
              ? 'border-[#0A5C36] text-[#0A5C36]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          Organization Settings & Edit
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'users'
              ? 'border-[#0A5C36] text-[#0A5C36]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          Users & Personnel ({tenant?.usersCount ?? 0})
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`py-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
            activeTab === 'projects'
              ? 'border-[#0A5C36] text-[#0A5C36]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FolderKanban className="w-3.5 h-3.5" />
          Civil Projects ({tenant?.projectsCount ?? 0})
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {loading && !tenant ? (
          <div className="py-16 text-center text-slate-400 font-mono text-xs">
            Loading organization details & personnel...
          </div>
        ) : (
          <>
            {/* TAB 1: Organization Settings & Edit */}
            {activeTab === 'settings' && (
              <div className="space-y-4">
                {saveMessage && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-medium flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    {saveMessage}
                  </div>
                )}
                {errorMessage && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    {errorMessage}
                  </div>
                )}

                {/* Edit Form */}
                <form onSubmit={handleSaveSettings} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3.5">
                  <div className="font-bold text-slate-900 font-mono text-[11px] uppercase tracking-wider pb-1 border-b border-slate-100 flex items-center justify-between">
                    <span>Edit Organization Details</span>
                    <span className="text-[10px] text-slate-400 font-normal">Super Admin Control</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Organization Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="e.g. Apex Highway Infra Ltd"
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        URL Slug / Subdomain Identifier
                      </label>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        placeholder="e.g. apex-infra"
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-xs font-mono text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Account Status
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-xs font-semibold text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                      >
                        <option value="ACTIVE">ACTIVE (Full Platform Access)</option>
                        <option value="SUSPENDED">SUSPENDED (Locked Access)</option>
                        <option value="CLOSED">CLOSED (Terminated)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-4 py-2 bg-[#0A5C36] hover:bg-[#084A2B] text-white font-bold rounded-lg flex items-center gap-2 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" />
                      {isSaving ? 'Saving Changes...' : 'Save Organization Changes'}
                    </button>
                  </div>
                </form>

                {/* Organization Infrastructure Overview */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Projects</div>
                    <div className="text-xl font-bold font-mono text-slate-900 mt-1">
                      {tenant?.projectsCount ?? 0}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Users / Crew</div>
                    <div className="text-xl font-bold font-mono text-slate-900 mt-1">
                      {tenant?.usersCount ?? 0}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Submissions</div>
                    <div className="text-xl font-bold font-mono text-[#0A5C36] mt-1">
                      {tenant?.submissionsCount ?? 0}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Activities</div>
                    <div className="text-xl font-bold font-mono text-slate-900 mt-1">
                      {tenant?.activitiesCount ?? 0}
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[10px] text-slate-500 space-y-1">
                  <div>Created At: {new Date(tenant?.createdAt).toLocaleString()}</div>
                  <div>Last Updated: {new Date(tenant?.updatedAt).toLocaleString()}</div>
                  <div>Tenant UUID: {tenant?.id}</div>
                </div>
              </div>
            )}

            {/* TAB 2: Users & Personnel */}
            {activeTab === 'users' && (
              <div className="space-y-3">
                {/* Search Bar & Add User Action */}
                <div className="flex items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      placeholder="Search user name, username, email or role..."
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-xs placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      resetAddUserForm();
                      setIsAddUserOpen(true);
                    }}
                    className="py-1.5 px-3 bg-[#0A5C36] hover:bg-[#084A2B] text-white rounded-md font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs shrink-0"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    Add User
                  </button>
                </div>

                {/* Users List */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100/70 text-slate-500 font-mono text-[10px] uppercase border-b border-slate-200">
                        <th className="py-2.5 px-3 font-semibold">USER / IDENTIFIER</th>
                        <th className="py-2.5 px-2 font-semibold">ROLES</th>
                        <th className="py-2.5 px-2 font-semibold">CONTACT DETAILS</th>
                        <th className="py-2.5 px-2 font-semibold text-center">STATUS</th>
                        <th className="py-2.5 px-3 font-semibold text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-slate-400 font-mono text-xs">
                            No users found in this organization matching search.
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((u: any) => (
                          <tr key={u.membershipId} className="hover:bg-slate-50/80 transition-colors">
                            {/* User Name & Handle */}
                            <td className="py-2.5 px-3">
                              <div className="font-semibold text-slate-900">{u.fullName || 'Employee'}</div>
                              <div className="text-[10px] font-mono text-[#0A5C36] font-bold">
                                @{u.username || 'user'}
                              </div>
                            </td>

                            {/* Roles */}
                            <td className="py-2.5 px-2">
                              <div className="flex flex-wrap gap-1">
                                {(u.roles || []).map((role: string, rIdx: number) => {
                                  const isOwner = role === 'OWNER';
                                  const isSupervisor = role === 'SUPERVISOR';
                                  return (
                                    <span
                                      key={rIdx}
                                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border ${
                                        isOwner
                                          ? 'bg-amber-50 text-amber-900 border-amber-200'
                                          : isSupervisor
                                          ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                                          : 'bg-blue-50 text-blue-900 border-blue-200'
                                      }`}
                                    >
                                      {role}
                                    </span>
                                  );
                                })}
                              </div>
                            </td>

                            {/* Contact Details */}
                            <td className="py-2.5 px-2 text-[11px] text-slate-600">
                              <div className="flex items-center gap-1 text-slate-700">
                                <Mail className="w-3 h-3 text-slate-400" />
                                <span>{u.email || <span className="text-slate-400 italic">No email</span>}</span>
                              </div>
                              {u.phone && (
                                <div className="flex items-center gap-1 text-slate-500 text-[10px]">
                                  <Phone className="w-3 h-3 text-slate-400" />
                                  <span>{u.phone}</span>
                                </div>
                              )}
                            </td>

                            {/* Status */}
                            <td className="py-2.5 px-2 text-center">
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-100 text-emerald-800">
                                {u.userStatus || 'ACTIVE'}
                              </span>
                            </td>

                            {/* Reset Password Button */}
                            <td className="py-2.5 px-3 text-right">
                              <button
                                onClick={() => {
                                  setResettingUser(u);
                                  setResetSuccess(null);
                                  setNewPassword('');
                                }}
                                className="px-2 py-1 text-[10px] font-semibold text-slate-700 hover:text-[#0A5C36] hover:bg-emerald-50 border border-slate-200 rounded transition-colors inline-flex items-center gap-1"
                              >
                                <KeyRound className="w-3 h-3" />
                                Reset PIN
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: Projects & Sites */}
            {activeTab === 'projects' && (
              <div className="space-y-3">
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-100/70 text-slate-500 font-mono text-[10px] uppercase border-b border-slate-200">
                        <th className="py-2.5 px-3 font-semibold">PROJECT NAME & CODE</th>
                        <th className="py-2.5 px-3 font-semibold">CHAINAGE CORRIDOR</th>
                        <th className="py-2.5 px-2 font-semibold">BUDGET</th>
                        <th className="py-2.5 px-3 font-semibold text-center">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(tenant?.projects || []).length === 0 ? (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-slate-400 font-mono text-xs">
                            No projects created yet for this organization.
                          </td>
                        </tr>
                      ) : (
                        tenant.projects.map((p: any) => (
                          <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-3">
                              <div className="font-semibold text-slate-900">{p.name}</div>
                              <div className="text-[10px] font-mono text-slate-500">
                                Code: {p.projectCode}
                              </div>
                            </td>
                            <td className="py-3 px-3 font-mono font-medium text-slate-700">
                              {p.startChainage || 'CH 00+000'} → {p.endChainage || 'CH 00+000'}
                            </td>
                            <td className="py-3 px-2 font-mono text-slate-800">
                              {p.budget ? `₹${(Number(p.budget) / 10000000).toFixed(2)} Cr` : 'Not set'}
                            </td>
                            <td className="py-3 px-3 text-center">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-[#0A5C36] border border-emerald-200">
                                {p.status || 'ACTIVE'}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Password Reset Dialog */}
      {resettingUser && (
        <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-4.5 space-y-3.5 border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-[#0A5C36]" />
                <h4 className="font-bold text-sm text-slate-900">Reset User Password</h4>
              </div>
              <button
                onClick={() => setResettingUser(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-1">
              <div>
                User: <strong>{resettingUser.fullName}</strong> (@{resettingUser.username})
              </div>
              <div className="text-[11px] text-slate-500">
                Organization: <strong>{tenant?.name}</strong>
              </div>
            </div>

            {resetSuccess ? (
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 space-y-2">
                <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Password Reset Successfully!
                </div>
                <div className="p-2 bg-white rounded border border-emerald-300 font-mono text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span>{resetSuccess}</span>
                  <button
                    onClick={() => copyToClipboard(resetSuccess)}
                    className="p-1 hover:bg-emerald-50 rounded text-[#0A5C36]"
                    title="Copy Password"
                  >
                    {copiedPass ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-500">
                  Provide this password to the employee to sign in to the portal and mobile app.
                </p>
                <button
                  onClick={() => setResettingUser(null)}
                  className="w-full mt-2 py-1.5 bg-[#0A5C36] text-white font-bold text-xs rounded"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    New Password / Passcode (Optional)
                  </label>
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Leave blank to auto-generate random passcode"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    If empty, a secure temporary password will be generated for you.
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setResettingUser(null)}
                    className="px-3 py-1.5 border border-slate-300 rounded text-xs text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleResetPassword}
                    disabled={isResetting}
                    className="px-3.5 py-1.5 bg-[#0A5C36] hover:bg-[#084A2B] text-white font-bold text-xs rounded transition-colors disabled:opacity-50"
                  >
                    {isResetting ? 'Resetting...' : 'Confirm Reset'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Add User to Organization Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-5 space-y-4 border border-slate-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-[#0A5C36]" />
                <h4 className="font-bold text-sm text-slate-900">Add User to Organization</h4>
              </div>
              <button
                type="button"
                onClick={resetAddUserForm}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2.5 bg-emerald-50/70 border border-emerald-100 rounded-lg text-emerald-900 text-xs">
              Adding new member to: <span className="font-bold">{tenant?.name}</span> ({tenant?.slug})
            </div>

            {createdUserResult ? (
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#0A5C36] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs">User Successfully Added</h5>
                    <p className="text-[11px] text-emerald-800 mt-0.5">
                      {createdUserResult.user.fullName} is now provisioned in {tenant?.name}.
                    </p>
                  </div>
                </div>

                {/* Dispatchable Credentials */}
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-[11px] text-slate-400 font-sans">
                    <span>DISPATCHABLE CREDENTIALS</span>
                    <span className="text-emerald-400 font-mono">STATUS: ACTIVE</span>
                  </div>
                  <div><span className="text-slate-400">ORGANIZATION:</span> {tenant?.name}</div>
                  <div><span className="text-slate-400">FULL NAME:</span> {createdUserResult.user.fullName}</div>
                  <div><span className="text-slate-400">USERNAME:</span> <span className="text-amber-300 font-bold">@{createdUserResult.user.username}</span></div>
                  <div><span className="text-slate-400">EMAIL:</span> {createdUserResult.user.email}</div>
                  <div><span className="text-slate-400">PHONE:</span> {createdUserResult.user.phone}</div>
                  <div><span className="text-slate-400">ROLE:</span> <span className="text-blue-300 font-bold">{createdUserResult.user.role}</span></div>
                  <div><span className="text-slate-400">PASSCODE:</span> <span className="text-emerald-400 font-bold">{createdUserResult.temporaryPassword}</span></div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      const text = `VYHIR CivilERP — Personnel Credentials\n---------------------------------------\nOrganization: ${tenant?.name}\nFull Name: ${createdUserResult.user.fullName}\nUsername: ${createdUserResult.user.username}\nEmail: ${createdUserResult.user.email}\nPhone: ${createdUserResult.user.phone}\nRole: ${createdUserResult.user.role}\nTemporary Passcode: ${createdUserResult.temporaryPassword}\nLogin Portal: ${window.location.origin}/login`;
                      copyToClipboard(text);
                    }}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#0A5C36] hover:bg-[#084A2B] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedPass ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        COPIED CREDENTIALS!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        COPY CREDENTIALS
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetAddUserForm}
                    className="py-2 px-4 rounded-lg border border-slate-300 bg-white text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleAddUserSubmit} className="space-y-3.5">
                {addUserError && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{addUserError}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={addFullName}
                      onChange={(e) => handleAddNameChange(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Username / Handle *</label>
                    <input
                      type="text"
                      required
                      value={addUsername}
                      onChange={(e) => setAddUsername(e.target.value)}
                      placeholder="e.g. ramesh.k"
                      className="w-full px-3 py-1.5 font-mono border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Email ID * (Compulsory)</label>
                    <input
                      type="email"
                      required
                      value={addEmail}
                      onChange={(e) => setAddEmail(e.target.value)}
                      placeholder="ramesh@apexinfra.io"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Contact Phone * (Compulsory)</label>
                    <input
                      type="tel"
                      required
                      value={addPhone}
                      onChange={(e) => setAddPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Assigned Role *</label>
                  <select
                    value={addRole}
                    onChange={(e) => setAddRole(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                  >
                    <option value="SUPERVISOR">Site Supervisor</option>
                    <option value="PROJECT_MANAGER">Project Manager</option>
                    <option value="OWNER">Organization Admin / Owner</option>
                    <option value="QUALITY_INSPECTOR">Quality Inspector</option>
                    <option value="SURVEYOR">Surveyor / Alignment Tech</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-slate-600 font-medium">Initial Passcode *</label>
                    <button
                      type="button"
                      onClick={generateNewUserPasscode}
                      className="text-[11px] text-[#0A5C36] font-semibold flex items-center gap-1 hover:underline"
                    >
                      <Sparkles className="w-3 h-3" />
                      Auto-generate
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={addPassword}
                    onChange={(e) => setAddPassword(e.target.value)}
                    className="w-full px-3 py-1.5 font-mono border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={resetAddUserForm}
                    className="px-3 py-1.5 border border-slate-300 rounded-md text-xs text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isAddingUser}
                    className="px-4 py-1.5 bg-[#0A5C36] hover:bg-[#084A2B] text-white font-bold text-xs rounded-md transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                  >
                    {isAddingUser ? 'Creating User...' : 'Add User to Organization'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
