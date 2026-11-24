'use client';

import React, { useState } from 'react';
import {
  Building2,
  FolderKanban,
  Users,
  Search,
  ExternalLink,
  ShieldCheck,
  ShieldBan,
  Clock,
  Sparkles,
} from 'lucide-react';

export interface TenantRow {
  id: string;
  name: string;
  slug: string;
  status: string;
  createdAt: string;
  projectsCount: number;
  usersCount: number;
}

interface TenantListTableProps {
  tenants: TenantRow[];
  onRefresh: () => void;
  onOpenOnboard: () => void;
  onManage: (tenant: TenantRow) => void;
}

export function TenantListTable({
  tenants,
  onRefresh,
  onOpenOnboard,
  onManage,
}: TenantListTableProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'SUSPENDED'>('ALL');

  const filtered = tenants.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.slug.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filter === 'ALL' || t.status === filter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
      {/* Search and Filter Strip */}
      <div className="p-3 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 max-w-sm relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter org, slug, GSTIN or tenant..."
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-slate-200/70 p-0.5 rounded-md font-medium text-[11px]">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filter === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({tenants.length})
            </button>
            <button
              onClick={() => setFilter('ACTIVE')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filter === 'ACTIVE' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Active ({tenants.filter((t) => t.status === 'ACTIVE').length})
            </button>
            <button
              onClick={() => setFilter('SUSPENDED')}
              className={`px-2.5 py-1 rounded transition-colors ${
                filter === 'SUSPENDED' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Suspended ({tenants.filter((t) => t.status === 'SUSPENDED').length})
            </button>
          </div>

          <button
            onClick={onOpenOnboard}
            className="px-3 py-1.5 bg-[#0A5C36] hover:bg-[#084A2B] text-white font-bold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            + Onboard Client
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100/70 text-slate-500 font-mono text-[10px] uppercase border-b border-slate-200">
              <th className="py-2.5 px-4 font-semibold">ORGANIZATION NAME</th>
              <th className="py-2.5 px-3 font-semibold">SLUG / TENANT ID</th>
              <th className="py-2.5 px-3 font-semibold">DEPLOYED TIER</th>
              <th className="py-2.5 px-3 font-semibold text-center">PACKAGES / SITES</th>
              <th className="py-2.5 px-3 font-semibold text-center">FIELD TERMINALS</th>
              <th className="py-2.5 px-3 font-semibold text-center">STATUS</th>
              <th className="py-2.5 px-4 font-semibold text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-slate-400 font-mono text-xs">
                  No organizations found matching query
                </td>
              </tr>
            ) : (
              filtered.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0A5C36] font-bold text-xs">
                        {tenant.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{tenant.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Joined {new Date(tenant.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                    <span className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                      {tenant.slug}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-[#0A5C36] border border-emerald-200">
                      ENTERPRISE
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="inline-flex items-center gap-1 font-mono font-semibold text-slate-800">
                      <FolderKanban className="w-3.5 h-3.5 text-slate-400" />
                      {tenant.projectsCount} Pkg
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="inline-flex items-center gap-1 font-mono font-semibold text-slate-800">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {tenant.usersCount} Users
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    {tenant.status === 'ACTIVE' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-800 border border-rose-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                        Suspended
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => onManage(tenant)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-[#0A5C36] hover:text-white border border-emerald-300 rounded hover:bg-[#0A5C36] transition-colors"
                      >
                        Manage
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer count */}
      <div className="py-2.5 px-4 bg-slate-50 border-t border-slate-200 text-[10px] font-mono text-slate-500 flex justify-between items-center">
        <span>Showing {filtered.length} of {tenants.length} Client Organizations</span>
        <span>VYHIR Multi-Tenant Isolation Engine Active</span>
      </div>
    </div>
  );
}
