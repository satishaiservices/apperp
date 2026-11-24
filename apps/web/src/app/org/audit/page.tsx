'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { apiRequest } from '@/lib/api-client';
import {
  ShieldAlert,
  Search,
  RefreshCw,
  Clock,
  User,
  Activity,
  Layers,
  Building2,
  FileCheck2,
  ChevronDown,
} from 'lucide-react';

interface AuditItem {
  id: string;
  action: string;
  entityType: string;
  entityId: string | null;
  occurredAt: string;
  metadata: Record<string, any>;
  actorMembership?: {
    user?: {
      fullName?: string;
      username?: string;
      email?: string;
    };
  };
}

export default function AuditTrailPage() {
  const [logs, setLogs] = useState<AuditItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');

  const fetchAuditLogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiRequest<{ items: AuditItem[]; total: number }>('/audit?limit=100');
      setLogs(res.items || []);
    } catch (err: any) {
      setError(err?.message || 'Failed to load audit logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      if (actionFilter !== 'ALL' && log.action !== actionFilter) {
        return false;
      }
      if (!search.trim()) return true;

      const q = search.toLowerCase();
      const actionMatch = log.action.toLowerCase().includes(q);
      const entityMatch = log.entityType.toLowerCase().includes(q);
      const actorMatch =
        (log.actorMembership?.user?.fullName || '').toLowerCase().includes(q) ||
        (log.actorMembership?.user?.username || '').toLowerCase().includes(q);
      const metaMatch = JSON.stringify(log.metadata || {}).toLowerCase().includes(q);

      return actionMatch || entityMatch || actorMatch || metaMatch;
    });
  }, [logs, actionFilter, search]);

  const uniqueActions = useMemo(() => {
    const set = new Set(logs.map((l) => l.action));
    return Array.from(set);
  }, [logs]);

  const getActionBadge = (action: string) => {
    if (action.includes('DELETE') || action.includes('REVOKE') || action.includes('CANCEL')) {
      return 'bg-rose-50 text-rose-700 border-rose-200';
    }
    if (action.includes('CREATE') || action.includes('PROVISION') || action.includes('ONBOARD')) {
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    }
    if (action.includes('UPDATE') || action.includes('RESET')) {
      return 'bg-amber-50 text-amber-800 border-amber-200';
    }
    if (action.includes('DUPLICATE')) {
      return 'bg-purple-50 text-purple-800 border-purple-200';
    }
    return 'bg-sky-50 text-sky-800 border-sky-200';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0A5C36] uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-[#0A5C36]" />
            <span>Governance & Compliance</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Company Audit Trail
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Immutable system stream of administrative, project, and workforce activities.
          </p>
        </div>

        <button
          onClick={fetchAuditLogs}
          disabled={loading}
          className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg shadow-2xs transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Feed</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Total Events</div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{logs.length}</div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">Immutable Store</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Unique Actions</div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{uniqueActions.length}</div>
          <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Lifecycle Operations</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Filtered Results</div>
          <div className="text-xl font-extrabold text-[#0A5C36] mt-1">{filteredLogs.length}</div>
          <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Current View</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Compliance Status</div>
          <div className="text-xl font-extrabold text-emerald-700 mt-1">VERIFIED</div>
          <div className="text-[11px] text-slate-500 font-semibold mt-0.5">Tamper-Evident DB</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by action, actor username, entity, or details..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 shrink-0">Action:</span>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Actions ({logs.length})</option>
            {uniqueActions.map((act) => (
              <option key={act} value={act}>
                {act}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-400 flex flex-col items-center gap-2 font-mono">
            <RefreshCw className="w-5 h-5 animate-spin text-[#0A5C36]" />
            <span>Loading audit log entries...</span>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-xs text-rose-600 bg-rose-50/50">
            {error}
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <ShieldAlert className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <div className="text-sm font-semibold text-slate-700">No audit events match your filter</div>
            <div className="text-xs text-slate-400 mt-1">Try resetting search or filter criteria.</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Target Entity</th>
                  <th className="py-3 px-4">Performed By</th>
                  <th className="py-3 px-4">Details / Metadata</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => {
                  const date = new Date(log.occurredAt);
                  const actor = log.actorMembership?.user;
                  const metadataStr = JSON.stringify(log.metadata || {}, null, 1);

                  return (
                    <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                        <div>{date.toLocaleDateString()}</div>
                        <div className="text-[10px] text-slate-400">
                          {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-full border ${getActionBadge(
                            log.action,
                          )}`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap font-medium text-slate-800">
                        <div className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-slate-400" />
                          <span>{log.entityType}</span>
                        </div>
                        {log.entityId && (
                          <div className="text-[10px] font-mono text-slate-400 truncate max-w-[120px]">
                            {log.entityId.slice(0, 8)}...
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="font-semibold text-slate-900">
                          {actor?.fullName || 'System Event'}
                        </div>
                        {actor?.username && (
                          <div className="text-[10px] font-mono text-emerald-800">
                            @{actor.username}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                        <pre className="max-w-md truncate bg-slate-50 px-2 py-1 rounded border border-slate-200/60 overflow-hidden text-[10px]">
                          {metadataStr}
                        </pre>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
