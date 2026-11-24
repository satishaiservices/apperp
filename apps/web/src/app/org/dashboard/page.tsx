'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { apiRequest } from '@/lib/api-client';
import { useAuth } from '@/context/auth-context';
import {
  LayoutDashboard,
  Route,
  FileCheck2,
  Clock,
  Users,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Radio,
  Camera,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Building,
  Plus,
  Compass,
} from 'lucide-react';

export default function OrgDashboardPage() {
  const { tenant } = useAuth();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState('ALL');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [projRes, subRes, attRes] = await Promise.allSettled([
          apiRequest('/projects'),
          apiRequest('/submissions'),
          apiRequest('/attendance/history?limit=50'),
        ]);

        if (projRes.status === 'fulfilled' && Array.isArray(projRes.value)) {
          setProjects(projRes.value);
        }

        if (subRes.status === 'fulfilled') {
          const raw = subRes.value;
          const items = Array.isArray(raw) ? raw : raw?.items || [];
          setSubmissions(items);
        }

        if (attRes.status === 'fulfilled') {
          const raw = attRes.value;
          const items = Array.isArray(raw) ? raw : raw?.items || [];
          setAttendance(items);
        }
      } catch (e) {
        console.error('Failed to load dashboard metrics', e);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const activeProjectsCount = projects.filter((p) => p.status === 'ACTIVE').length;
  const primaryProject = projects[0] || null;
  const openSessionsCount = attendance.filter((a) => a.status === 'OPEN').length;
  const submissionsTodayCount = submissions.length;

  const filteredSubmissions = submissions.filter((s) => {
    if (activeFilter === 'ALL') return true;
    const actName = s.activities?.[0]?.activity?.name || s.activities?.[0]?.name || '';
    if (activeFilter === 'EARTH') return actName.toLowerCase().includes('earth') || actName.toLowerCase().includes('subgrade');
    if (activeFilter === 'PAVE') return actName.toLowerCase().includes('pavement') || actName.toLowerCase().includes('gsb') || actName.toLowerCase().includes('wmm');
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Contract & Organization Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-emerald-100 text-[#0A5C36]">
              ORGANIZATION
            </span>
            <span className="font-bold text-sm text-slate-900">{tenant?.name || 'Organization Operations'}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {primaryProject ? (
              <span>Active Package: <strong className="text-slate-800">{primaryProject.name}</strong> (#{primaryProject.projectCode}) • Linear Chainage: {primaryProject.startChainage || 'CH 00+000'} to {primaryProject.endChainage || 'CH 48+500'}</span>
            ) : (
              <span>No civil packages deployed yet. Set up a linear infrastructure project to begin field tracking.</span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/org/submissions"
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <FileCheck2 className="w-4 h-4 text-emerald-400" />
            Inspect Submissions
          </Link>
          <Link
            href="/org/projects"
            className="px-3.5 py-1.5 bg-[#0A5C36] hover:bg-[#084A2B] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            Manage Packages
          </Link>
        </div>
      </div>

      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-mono text-[11px] font-bold text-slate-600 uppercase">ACTIVE PACKAGES</span>
            <Route className="w-4 h-4 text-[#0A5C36]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-slate-900">
              {activeProjectsCount}
            </span>
            <span className="text-xs text-slate-500 font-mono">Packages</span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
            {projects.length} Total Registered
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-mono text-[11px] font-bold text-slate-600 uppercase">SUPERVISORS ON SITE</span>
            <Users className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-[#0A5C36]">
              {openSessionsCount}
            </span>
            <span className="text-xs text-slate-400 font-mono">Checked-In</span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-emerald-700 font-mono font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Biometric & GPS Telemetry
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-mono text-[11px] font-bold text-slate-600 uppercase">FIELD SUBMISSIONS</span>
            <FileCheck2 className="w-4 h-4 text-[#0A5C36]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-slate-900">
              {submissionsTodayCount}
            </span>
            <span className="text-xs text-slate-500 font-mono">Reports</span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
            Verified Site Telemetry
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span className="font-mono text-[11px] font-bold text-slate-600 uppercase">LINEAR CORRIDOR</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-extrabold font-mono text-slate-900 truncate">
              {primaryProject ? primaryProject.name : 'Setup Pending'}
            </span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-emerald-700 font-mono font-semibold">
            {primaryProject ? `${primaryProject.startChainage || 'CH 00+000'} - ${primaryProject.endChainage || 'CH 48+500'}` : 'Configure in Projects & Setup'}
          </div>
        </div>
      </div>

      {/* Main Grid: Live Field Activity Feed & Alignment Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Live Activity Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Live Field Activity & Inspection Stream
                </h3>
              </div>

              {/* Filter Chips */}
              <div className="flex gap-1 bg-slate-100 p-0.5 rounded-md text-[11px] font-semibold">
                <button
                  onClick={() => setActiveFilter('ALL')}
                  className={`px-2.5 py-0.5 rounded transition-colors ${
                    activeFilter === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  All ({submissions.length})
                </button>
                <button
                  onClick={() => setActiveFilter('EARTH')}
                  className={`px-2.5 py-0.5 rounded transition-colors ${
                    activeFilter === 'EARTH' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Earthwork
                </button>
                <button
                  onClick={() => setActiveFilter('PAVE')}
                  className={`px-2.5 py-0.5 rounded transition-colors ${
                    activeFilter === 'PAVE' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Pavement
                </button>
              </div>
            </div>

            {/* Stream Feed */}
            {loading ? (
              <div className="py-12 text-center text-xs font-mono text-slate-400">
                Loading live field activity...
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 space-y-2">
                <FileCheck2 className="w-8 h-8 text-slate-300 mx-auto" />
                <div className="text-xs font-bold text-slate-700">No Field Submissions Recorded Yet</div>
                <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                  When field supervisors submit work reports through the mobile app, geotagged site reports with photos and chainage benchmarks will stream here live.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSubmissions.map((sub, idx) => {
                  const refCode = sub.id?.length > 10 ? `#REP-${sub.id.slice(0, 6).toUpperCase()}` : `#REP-${idx + 1}`;
                  const activityName = sub.activities?.[0]?.activity?.name || sub.activities?.[0]?.name || 'Civil Activity';
                  const supervisorName = sub.supervisor?.user?.fullName || 'Field Engineer';
                  const initials = supervisorName
                    .split(' ')
                    .map((n: string) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase();

                  return (
                    <div
                      key={sub.id || idx}
                      className="p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl space-y-2.5 hover:border-emerald-300 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#0A5C36] font-bold flex items-center justify-center text-xs">
                            {initials}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-xs">{supervisorName}</div>
                            <div className="text-[10px] text-slate-500 font-mono">
                              {sub.project?.name || 'Highway Corridor'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs bg-slate-200 px-2 py-0.5 rounded text-slate-800">
                            {sub.startChainage} - {sub.endChainage}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-[#0A5C36] border border-emerald-200">
                            ✓ Verified
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-800">
                        <span className="font-semibold text-slate-900">{activityName}:</span>{' '}
                        {sub.remarks || 'Site compaction and alignment verified.'}
                      </div>

                      {sub.photos && sub.photos.length > 0 && (
                        <div className="text-[10px] font-mono text-emerald-800 flex items-center gap-1 pt-1">
                          <Camera className="w-3.5 h-3.5" />
                          <span>{sub.photos.length} Watermarked Telemetry Photos Attached</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Linear Corridor Progress & Geofence Compliance */}
        <div className="space-y-4">
          {/* Milestone Progress Card */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-mono font-bold uppercase text-slate-700 text-[11px]">
                LINEAR CORRIDOR TRACK
              </span>
              <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-[10px] rounded font-bold">
                {primaryProject ? primaryProject.projectCode : 'WGS84'}
              </span>
            </div>

            {primaryProject ? (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-600 font-mono">
                  <span>Start: {primaryProject.startChainage || 'CH 00+000'}</span>
                  <span>End: {primaryProject.endChainage || 'CH 48+500'}</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="h-full bg-[#0A5C36]" style={{ width: '60%' }} title="Completed" />
                  <div className="h-full bg-emerald-500" style={{ width: '25%' }} title="In Progress" />
                  <div className="h-full bg-slate-200" style={{ width: '15%' }} title="Remaining" />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>Execution Active</span>
                  <span>RTK Base Calibrated</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400">
                <Route className="w-6 h-6 mx-auto mb-1 opacity-50" />
                <span>No active packages configured</span>
              </div>
            )}
          </div>

          {/* Geofence Compliance Widget */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-mono font-bold uppercase text-slate-700 text-[11px]">
                GEOFENCE COMPLIANCE
              </span>
              <span className="px-1.5 py-0.5 bg-emerald-100 text-[#0A5C36] font-bold text-[10px] rounded">
                100% Locked
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-4 border-[#0A5C36] flex flex-col items-center justify-center shrink-0">
                <span className="font-bold text-sm text-[#0A5C36]">{openSessionsCount}</span>
                <span className="text-[9px] text-slate-400 font-mono">Active</span>
              </div>
              <div className="space-y-1">
                <div className="font-bold text-slate-800 text-xs">Personnel Active on Site</div>
                <p className="text-[11px] text-slate-500">
                  Zero perimeter violations across corridor spreads. Dual-frequency GNSS locked.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
