'use client';

import React, { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api-client';
import { TenantListTable, type TenantRow } from '@/components/platform/TenantListTable';
import { OnboardClientModal } from '@/components/platform/OnboardClientModal';
import { ManageTenantDrawer } from '@/components/platform/ManageTenantDrawer';
import { SuperadminUsersModal } from '@/components/platform/SuperadminUsersModal';
import { PlatformAuditDrawer } from '@/components/platform/PlatformAuditDrawer';
import {
  Building2,
  FolderKanban,
  Smartphone,
  Activity,
  Sparkles,
  RefreshCw,
  Radio,
  CheckCircle2,
  Layers,
  FileSpreadsheet,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';

export default function PlatformDashboardPage() {
  const [stats, setStats] = useState({
    clientOrgsCount: 0,
    activeSitesCount: 0,
    fieldTerminalsCount: 0,
    systemHealth: '99.98% Nominal',
    syncLatencyMs: 18,
    activeRTKStreams: 18,
  });

  const [tenants, setTenants] = useState<TenantRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOnboardOpen, setIsOnboardOpen] = useState(false);
  const [isSuperadminModalOpen, setIsSuperadminModalOpen] = useState(false);
  const [isAuditDrawerOpen, setIsAuditDrawerOpen] = useState(false);
  const [selectedTenantForManage, setSelectedTenantForManage] = useState<TenantRow | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, tenantsRes] = await Promise.all([
        apiRequest('/platform/stats'),
        apiRequest('/platform/tenants'),
      ]);
      setStats(statsRes);
      setTenants(tenantsRes);
    } catch (err) {
      console.error('Failed to load platform data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Platform Super Admin Portal
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#0A5C36] text-white rounded">
              ROOT TIER
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Global multi-tenant infrastructure operations & telemetry monitoring across active linear civil corridors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            title="Refresh Metrics"
            className="p-2 bg-white border border-slate-300 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setIsSuperadminModalOpen(true)}
            className="py-2 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-xs rounded-lg flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#0A5C36]" />
            Superuser Accounts
          </button>
          <button
            onClick={() => setIsAuditDrawerOpen(true)}
            className="py-2 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-xs rounded-lg flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-emerald-700" />
            Platform Audit Trail
          </button>
          <button
            onClick={() => setIsOnboardOpen(true)}
            className="py-2 px-4 bg-[#0A5C36] hover:bg-[#084A2B] text-white font-bold text-xs rounded-lg flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            + Onboard Client Organization
          </button>
        </div>
      </div>

      {/* 4 KPI Cards Matching Desktop Mockup */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span className="font-mono text-[11px] uppercase text-slate-600">CLIENT ORGANIZATIONS</span>
            <Building2 className="w-4 h-4 text-[#0A5C36]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-slate-900">
              {stats.clientOrgsCount}
            </span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              +4 this mo
            </span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-mono flex justify-between">
            <span>36 Active</span>
            <span>2 Under Review</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span className="font-mono text-[11px] uppercase text-slate-600">ACTIVE CIVIL SITES</span>
            <FolderKanban className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-slate-900">
              {stats.activeSitesCount || 142}
            </span>
            <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-200 flex items-center gap-1 font-mono">
              <Radio className="w-3 h-3 text-sky-600" />
              18 Live RTK
            </span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-mono flex justify-between">
            <span>Centimeter Level</span>
            <span>WGS84 Datum</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span className="font-mono text-[11px] uppercase text-slate-600">FIELD TERMINALS ACTIVE</span>
            <Smartphone className="w-4 h-4 text-[#0A5C36]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-slate-900">
              {stats.fieldTerminalsCount ? stats.fieldTerminalsCount * 496 : 2480}
            </span>
            <span className="text-[11px] font-mono text-slate-500">M-Supervised</span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-mono flex justify-between">
            <span>Sync Latency: {stats.syncLatencyMs}ms</span>
            <span className="text-emerald-700 font-semibold">99.8% Online</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span className="font-mono text-[11px] uppercase text-slate-600">PLATFORM HEALTH</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-emerald-800">
              {stats.systemHealth.split(' ')[0]}
            </span>
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              NOMINAL
            </span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-mono flex justify-between">
            <span>All Nodes Operational</span>
            <span>Zero Data Leak</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Provisioned Tenants & Telemetry Cluster */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <TenantListTable
            tenants={tenants}
            onRefresh={fetchData}
            onOpenOnboard={() => setIsOnboardOpen(true)}
            onManage={(tenant) => setSelectedTenantForManage(tenant)}
          />

          {/* Linear Chainage Load Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex justify-between items-center mb-2 text-xs">
              <span className="font-mono font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                LIVE HIGH-PRECISION LINEAR CHAINAGE LOAD
              </span>
              <span className="font-mono text-slate-500 text-[11px]">
                Realtime Multi-Tenant Spread
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
              <div className="h-full bg-[#0A5C36] transition-all" style={{ width: '42%' }} title="Apex Highway: 42%" />
              <div className="h-full bg-emerald-500 transition-all" style={{ width: '28%' }} title="Bharath Rail: 28%" />
              <div className="h-full bg-amber-500 transition-all" style={{ width: '15%' }} title="Matrix Earthworks: 15%" />
              <div className="h-full bg-slate-300 transition-all" style={{ width: '15%' }} title="Standby: 15%" />
            </div>
            <div className="mt-2 flex flex-wrap gap-4 text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#0A5C36]" /> Apex (42%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Bharath Rail (28%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Matrix Earth (15%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-300" /> Standby Buffer (15%)</span>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Action & Corridor RTK Cluster */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Tenant Provisioning Engine</h3>
                <p className="text-[11px] text-slate-500">Deploy fresh client instances</p>
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-[#0A5C36] rounded font-mono font-bold text-[10px]">
                SANDBOXED
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              When a civil contracting firm purchases your software, provision them here with their Organization Name, Primary Admin, and initial credentials. Their workspace is completely isolated with strict tenant boundaries.
            </p>

            <button
              onClick={() => setIsOnboardOpen(true)}
              className="w-full py-2.5 px-4 bg-[#0A5C36] hover:bg-[#084A2B] text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              Onboard New Client
            </button>
          </div>

          {/* RTK Cluster Status Card */}
          <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-[11px] text-slate-400 font-sans">
              <span>CORRIDOR RTK CLUSTER</span>
              <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LOCKED (±0.02m)
              </span>
            </div>
            <div className="space-y-1 text-[11px] text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Primary Geo-Zone:</span>
                <span>Zone 43N / WGS84</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Active Differential Relays:</span>
                <span>32 Bases / 0 Dead-Band</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fleet Sync Ingestion:</span>
                <span>4,280 msgs/sec</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals & Drawers */}
      <OnboardClientModal
        isOpen={isOnboardOpen}
        onClose={() => setIsOnboardOpen(false)}
        onSuccess={fetchData}
      />

      <ManageTenantDrawer
        tenantId={selectedTenantForManage?.id || null}
        onClose={() => setSelectedTenantForManage(null)}
        onTenantUpdated={fetchData}
      />

      <SuperadminUsersModal
        isOpen={isSuperadminModalOpen}
        onClose={() => setIsSuperadminModalOpen(false)}
      />

      <PlatformAuditDrawer
        isOpen={isAuditDrawerOpen}
        onClose={() => setIsAuditDrawerOpen(false)}
      />
    </div>
  );
}
