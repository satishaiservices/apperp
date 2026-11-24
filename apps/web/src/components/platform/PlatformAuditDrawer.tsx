'use client';

import React, { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api-client';
import {
  X,
  ShieldAlert,
  RefreshCw,
  Search,
  Building2,
  Layers,
  Clock,
  User,
} from 'lucide-react';

interface PlatformAuditDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlatformAuditDrawer({ isOpen, onClose }: PlatformAuditDrawerProps) {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiRequest<{ items: any[]; total: number }>('/platform/audit?limit=100');
      setLogs(res.items || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch platform audit logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLogs();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredLogs = logs.filter((log) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const actionMatch = (log.action || '').toLowerCase().includes(q);
    const tenantMatch = (log.tenant?.name || '').toLowerCase().includes(q) || (log.tenant?.slug || '').toLowerCase().includes(q);
    const actorMatch = (log.actorMembership?.user?.fullName || '').toLowerCase().includes(q) || (log.actorMembership?.user?.username || '').toLowerCase().includes(q);
    const metaMatch = JSON.stringify(log.metadata || {}).toLowerCase().includes(q);
    return actionMatch || tenantMatch || actorMatch || metaMatch;
  });

  const getActionBadge = (action: string) => {
    if (action.includes('DELETE') || action.includes('REVOKE')) {
      return 'bg-rose-50 text-rose-700 border-rose-200';
    }
    if (action.includes('CREATE') || action.includes('ONBOARD') || action.includes('PROVISION')) {
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    }
    if (action.includes('UPDATE') || action.includes('RESET')) {
      return 'bg-amber-50 text-amber-800 border-amber-200';
    }
    return 'bg-sky-50 text-sky-800 border-sky-200';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-2xl bg-white shadow-2xl flex flex-col z-10 border-l border-slate-200">
        {/* Header */}
        <div className="h-16 px-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-[#0A5C36]" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">Platform Global Audit Stream</h2>
              <p className="text-[11px] text-slate-500 font-mono">Cross-tenant administrative governance trail</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchLogs}
              disabled={loading}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500 cursor-pointer disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-200 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search across organizations, actions, actors, or metadata..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
            />
          </div>
        </div>

        {/* Feed List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="p-12 text-center text-xs text-slate-400 font-mono flex flex-col items-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin text-[#0A5C36]" />
              <span>Fetching global system audit logs...</span>
            </div>
          ) : error ? (
            <div className="p-6 text-center text-xs text-rose-600 bg-rose-50 rounded-xl border border-rose-200">
              {error}
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <ShieldAlert className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <div className="text-sm font-semibold text-slate-700">No audit logs found</div>
            </div>
          ) : (
            filteredLogs.map((log) => {
              const date = new Date(log.occurredAt);
              const actor = log.actorMembership?.user;

              return (
                <div
                  key={log.id}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white shadow-2xs space-y-2 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-full border ${getActionBadge(
                        log.action,
                      )}`}
                    >
                      {log.action}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    {log.tenant && (
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{log.tenant.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">({log.tenant.slug})</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Layers className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{log.entityType}</span>
                    </div>
                  </div>

                  {actor && (
                    <div className="text-[11px] text-slate-500 font-mono">
                      Actor: <span className="font-semibold text-slate-800">{actor.fullName}</span> (@{actor.username})
                    </div>
                  )}

                  {log.metadata && Object.keys(log.metadata).length > 0 && (
                    <pre className="text-[10px] font-mono bg-slate-50 p-2 rounded border border-slate-200/60 overflow-x-auto text-slate-700">
                      {JSON.stringify(log.metadata, null, 1)}
                    </pre>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
