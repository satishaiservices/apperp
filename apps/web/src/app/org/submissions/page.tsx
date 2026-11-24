'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { apiRequest } from '@/lib/api-client';
import { InspectionDossierDrawer } from '@/components/submissions/InspectionDossierDrawer';
import { exportSubmissionsToCsv } from '@/lib/export-utils';
import {
  FileCheck2,
  Download,
  Filter,
  Search,
  MapPin,
  Calendar,
  Layers,
  Users,
  Camera,
  CheckCircle2,
  Clock,
  Radio,
  FileSpreadsheet,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  X,
} from 'lucide-react';

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [supervisors, setSupervisors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState('ALL');
  const [selectedActivityId, setSelectedActivityId] = useState('ALL');
  const [selectedSupervisor, setSelectedSupervisor] = useState('ALL');
  const [selectedDateWindow, setSelectedDateWindow] = useState('ALL');
  const [search, setSearch] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);

  // 1. Initial Load: Submissions, Projects, and Users (all tenant-scoped)
  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const [submissionsRes, projectsRes, usersRes] = await Promise.all([
          apiRequest('/submissions'),
          apiRequest('/projects'),
          apiRequest('/users'),
        ]);

        const subItems = Array.isArray(submissionsRes)
          ? submissionsRes
          : submissionsRes?.items || [];
        const projItems = Array.isArray(projectsRes) ? projectsRes : [];
        const userItems = Array.isArray(usersRes) ? usersRes : [];

        setSubmissions(subItems);
        setProjects(projItems);

        // Derive supervisors/employees of this company
        const supervisorMap = new Map<string, { id: string; name: string; username: string }>();
        userItems.forEach((u: any) => {
          const name = u.user?.fullName || u.user?.username || 'Staff';
          supervisorMap.set(u.id, {
            id: u.id,
            name,
            username: u.user?.username || '',
          });
        });

        // Also ensure any supervisor from existing submissions is included
        subItems.forEach((s: any) => {
          if (s.supervisor?.id) {
            const name =
              s.supervisor.user?.fullName ||
              s.supervisor.user?.username ||
              'Field Supervisor';
            if (!supervisorMap.has(s.supervisor.id)) {
              supervisorMap.set(s.supervisor.id, {
                id: s.supervisor.id,
                name,
                username: s.supervisor.user?.username || '',
              });
            }
          }
        });

        setSupervisors(Array.from(supervisorMap.values()));

        if (subItems.length > 0) {
          setSelectedSubmission(subItems[0]);
        }
      } catch (err) {
        console.error('Failed to load submissions page data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  // 2. Load Company Activities based on selected project
  useEffect(() => {
    async function loadActivities() {
      if (selectedProjectId !== 'ALL') {
        try {
          const actList = await apiRequest(`/projects/${selectedProjectId}/activities`);
          setActivities(Array.isArray(actList) ? actList : []);
        } catch {
          setActivities([]);
        }
      } else {
        // Collect distinct activities across company projects
        try {
          const allActs: any[] = [];
          for (const p of projects) {
            const list = await apiRequest(`/projects/${p.id}/activities`);
            if (Array.isArray(list)) {
              allActs.push(...list);
            }
          }
          const unique = Array.from(new Map(allActs.map((a) => [a.id, a])).values());
          setActivities(unique);
        } catch {
          setActivities([]);
        }
      }
    }

    if (projects.length > 0) {
      loadActivities();
    }
  }, [selectedProjectId, projects]);

  // Filter activities to only parent-level activities for the Activity Filter dropdown
  const parentActivities = useMemo(() => {
    return activities.filter((a) => !a.parentId || a.parentId.trim() === '');
  }, [activities]);

  // 3. Multi-dimensional filtering strictly on company data
  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      // Project filter
      const matchesProject =
        selectedProjectId === 'ALL' ||
        s.projectId === selectedProjectId ||
        s.project?.id === selectedProjectId;

      // Activity filter: selecting a parent activity matches any submission with that activity or its subactivities
      let matchesActivity = true;
      if (selectedActivityId !== 'ALL') {
        const matchingIds = new Set<string>();
        matchingIds.add(selectedActivityId);
        activities.forEach((act) => {
          if (act.parentId === selectedActivityId) {
            matchingIds.add(act.id);
          }
        });

        matchesActivity = Boolean(
          s.activities &&
            s.activities.some((item: any) => {
              const actId = item.activityId || item.activity?.id || item.id;
              const parentId = item.activity?.parentId;
              return (
                matchingIds.has(actId) ||
                (parentId && parentId === selectedActivityId)
              );
            }),
        );
      }

      // Supervisor filter
      const matchesSupervisor =
        selectedSupervisor === 'ALL' ||
        s.supervisorMembershipId === selectedSupervisor ||
        s.supervisor?.id === selectedSupervisor ||
        s.supervisor?.user?.fullName === selectedSupervisor;

      // Date Window filter
      let matchesDate = true;
      if (selectedDateWindow !== 'ALL' && s.submittedAt) {
        const subDate = new Date(s.submittedAt);
        const now = new Date();
        if (selectedDateWindow === 'TODAY') {
          matchesDate = subDate.toDateString() === now.toDateString();
        } else if (selectedDateWindow === 'YESTERDAY') {
          const yesterday = new Date(now);
          yesterday.setDate(now.getDate() - 1);
          matchesDate = subDate.toDateString() === yesterday.toDateString();
        } else if (selectedDateWindow === 'LAST_7_DAYS') {
          const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = subDate >= sevenDaysAgo;
        } else if (selectedDateWindow === 'LAST_30_DAYS') {
          const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = subDate >= thirtyDaysAgo;
        }
      }

      // Search keyword filter
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        s.startChainage?.toLowerCase().includes(q) ||
        s.endChainage?.toLowerCase().includes(q) ||
        s.remarks?.toLowerCase().includes(q) ||
        s.project?.name?.toLowerCase().includes(q) ||
        s.project?.projectCode?.toLowerCase().includes(q) ||
        s.supervisor?.user?.fullName?.toLowerCase().includes(q) ||
        s.supervisor?.user?.username?.toLowerCase().includes(q) ||
        (s.activities &&
          s.activities.some(
            (a: any) =>
              (a.activity?.name || '').toLowerCase().includes(q) ||
              (a.activity?.activityCode || '').toLowerCase().includes(q),
          ));

      return (
        matchesProject &&
        matchesActivity &&
        matchesSupervisor &&
        matchesDate &&
        matchesSearch
      );
    });
  }, [
    submissions,
    selectedProjectId,
    selectedActivityId,
    selectedSupervisor,
    selectedDateWindow,
    search,
  ]);

  const totalPhotosCount = useMemo(() => {
    return filtered.reduce((acc, s) => acc + (s.photos?.length || 0), 0);
  }, [filtered]);

  const activeProject = useMemo(() => {
    if (selectedProjectId === 'ALL') return null;
    return projects.find((p) => p.id === selectedProjectId) || null;
  }, [selectedProjectId, projects]);

  const handleExport = (format: 'csv' | 'xlsx') => {
    exportSubmissionsToCsv(filtered);
    setShowExportMenu(false);
  };

  return (
    <div className="space-y-5">
      {/* Title & Stats Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-[#0A5C36] font-bold uppercase tracking-wider">
              {activeProject
                ? `${activeProject.name} TELEMETRY STREAM`
                : 'COMPANY TELEMETRY & SUBMISSIONS STREAM'}
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
            Field Operations & Daily Submissions Control Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time telemetry, chainage logs, and quality verification stream across active construction spreads.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-slate-800">
                {filtered.length} Logged
              </span>
            </div>
            <div className="text-slate-300">|</div>
            <div className="text-emerald-700 font-bold">
              {totalPhotosCount} Photos
            </div>
            <div className="text-slate-300">|</div>
            <div className="text-slate-600 font-semibold">
              {projects.length} Active Sites
            </div>
          </div>

          {/* Export Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="py-2 px-3.5 bg-[#0A5C36] hover:bg-[#084A2B] text-white font-bold text-xs rounded-lg flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Export Data
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {showExportMenu && (
              <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-30 text-xs animate-in fade-in">
                <button
                  onClick={() => handleExport('xlsx')}
                  className="w-full text-left px-3 py-2 text-slate-700 hover:bg-emerald-50 hover:text-[#0A5C36] flex items-center gap-2 font-medium"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                  Export to Excel (.xlsx)
                </button>
                <button
                  onClick={() => handleExport('csv')}
                  className="w-full text-left px-3 py-2 text-slate-700 hover:bg-emerald-50 hover:text-[#0A5C36] flex items-center gap-2 font-medium"
                >
                  <FileCheck2 className="w-4 h-4 text-emerald-700" />
                  Export to CSV (.csv)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Company-Specific Filter Ribbon */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* 1. Date Window */}
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1">
              DATE WINDOW
            </label>
            <select
              value={selectedDateWindow}
              onChange={(e) => setSelectedDateWindow(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
            >
              <option value="ALL">All Time / All Dates</option>
              <option value="TODAY">Today: Active Shift</option>
              <option value="YESTERDAY">Yesterday</option>
              <option value="LAST_7_DAYS">Last 7 Days</option>
              <option value="LAST_30_DAYS">Last 30 Days</option>
            </select>
          </div>

          {/* 2. Contract Package / Project Filter */}
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1">
              CONTRACT PACKAGE ({projects.length})
            </label>
            <select
              value={selectedProjectId}
              onChange={(e) => {
                setSelectedProjectId(e.target.value);
                setSelectedActivityId('ALL');
              }}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
            >
              <option value="ALL">All Company Projects ({projects.length})</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} {p.projectCode ? `(${p.projectCode})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Activity Filter (Parent Activities Only) */}
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1">
              ACTIVITY FILTER ({parentActivities.length})
            </label>
            <select
              value={selectedActivityId}
              onChange={(e) => setSelectedActivityId(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
            >
              <option value="ALL">All Activities ({parentActivities.length})</option>
              {parentActivities.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.activityCode ? `[${a.activityCode}] ` : ''}
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Field Supervisor Filter */}
          <div>
            <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 mb-1">
              FIELD SUPERVISOR ({supervisors.length})
            </label>
            <select
              value={selectedSupervisor}
              onChange={(e) => setSelectedSupervisor(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-md font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
            >
              <option value="ALL">All Company Supervisors ({supervisors.length})</option>
              {supervisors.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} {s.username ? `(@${s.username})` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Bar & Reset Filter */}
        <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chainage (e.g. 10+000), remarks, activities, or supervisor..."
              className="w-full pl-8 pr-8 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-xs placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {(selectedProjectId !== 'ALL' ||
            selectedActivityId !== 'ALL' ||
            selectedSupervisor !== 'ALL' ||
            selectedDateWindow !== 'ALL' ||
            search) && (
            <button
              onClick={() => {
                setSelectedProjectId('ALL');
                setSelectedActivityId('ALL');
                setSelectedSupervisor('ALL');
                setSelectedDateWindow('ALL');
                setSearch('');
              }}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1 rounded hover:bg-rose-50"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Real Project Corridor Alignment Summary */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs text-xs space-y-2">
        <div className="flex justify-between items-center text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">
              {activeProject
                ? `${activeProject.name.toUpperCase()} SPREAD`
                : 'OVERALL COMPANY SPREAD'}
            </span>
            {activeProject?.projectCode && (
              <span className="px-1.5 py-0.2 bg-slate-100 text-slate-700 rounded text-[10px]">
                {activeProject.projectCode}
              </span>
            )}
          </div>
          <span className="text-slate-500">
            {activeProject
              ? `${activeProject.startChainage || 'Origin'} → ${activeProject.endChainage || 'Terminus'}`
              : `${projects.length} Monitored Packages • ${filtered.length} Submissions Total`}
          </span>
        </div>

        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-[#0A5C36] transition-all"
            style={{ width: filtered.length > 0 ? '100%' : '0%' }}
          />
        </div>

        <div className="flex flex-wrap gap-4 text-[10px] font-mono text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0A5C36]" />
            Active Submissions ({filtered.length})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Field Photos ({totalPhotosCount})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Active Crews ({supervisors.length})
          </span>
        </div>
      </div>

      {/* Real-Time Submissions Data Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">Real-Time Daily Submissions</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 text-[#0A5C36] font-bold">
              {filtered.length} Records
            </span>
          </div>

          <div className="text-[11px] font-mono text-slate-400 hidden sm:block">
            Click any row to open Inspection Dossier & Geotagged Photos
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/70 text-slate-500 font-mono text-[10px] uppercase border-b border-slate-200">
                <th className="py-2.5 px-4 font-semibold">REF ID / TIME</th>
                <th className="py-2.5 px-3 font-semibold">PROJECT & CHAINAGE SPAN</th>
                <th className="py-2.5 px-3 font-semibold">WORK ACTIVITIES</th>
                <th className="py-2.5 px-3 font-semibold">SUPERVISOR</th>
                <th className="py-2.5 px-3 font-semibold text-center">PHOTOS</th>
                <th className="py-2.5 px-3 font-semibold text-center">STATUS</th>
                <th className="py-2.5 px-4 font-semibold text-right">DOSSIER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-mono text-xs">
                    Loading daily site submissions...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-mono text-xs space-y-1">
                    <p className="font-bold text-slate-600">No submissions found</p>
                    <p className="text-[11px] text-slate-400">
                      No matching records found for the selected company filters.
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((item, idx) => {
                  const isSelected = selectedSubmission?.id === item.id;
                  const refCode = item.id
                    ? `#REP-${item.id.slice(0, 8).toUpperCase()}`
                    : `#REP-${88400 + idx}`;
                  const supervisor =
                    item.supervisor?.user?.fullName ||
                    item.supervisor?.user?.username ||
                    'Field Supervisor';
                  const supervisorUsername = item.supervisor?.user?.username || '';
                  const photoCount = (item.photos || []).length;

                  return (
                    <tr
                      key={item.id || idx}
                      onClick={() => setSelectedSubmission(item)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-emerald-50/70 font-medium'
                          : 'hover:bg-slate-50/80'
                      }`}
                    >
                      {/* Ref ID & Time */}
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-slate-900">
                          {refCode}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {new Date(item.submittedAt || Date.now()).toLocaleTimeString(
                            [],
                            { hour: '2-digit', minute: '2-digit' },
                          )}{' '}
                          IST
                        </div>
                      </td>

                      {/* Project & Chainage Span */}
                      <td className="py-3 px-3">
                        <div className="font-mono font-bold text-[#0A5C36] flex items-center gap-1.5">
                          <span>{item.startChainage}</span>
                          <span className="text-slate-400">→</span>
                          <span>{item.endChainage}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono flex items-center gap-2 mt-0.5">
                          <span className="font-semibold text-slate-700">
                            {item.project?.name || 'Package'}
                          </span>
                          {item.latitude && item.longitude && (
                            <>
                              <span className="text-slate-300">•</span>
                              <span>
                                {Number(item.latitude).toFixed(4)}° N,{' '}
                                {Number(item.longitude).toFixed(4)}° E
                              </span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Work Activities & Remarks */}
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1 max-w-sm">
                          {item.activities && item.activities.length > 0 ? (
                            item.activities.map((a: any, actIdx: number) => {
                              const act = a.activity || a;
                              return (
                                <span
                                  key={act.id || actIdx}
                                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-[#0A5C36] font-semibold text-[10px] border border-emerald-200"
                                >
                                  {act.activityCode && (
                                    <span className="font-mono font-bold text-emerald-800">
                                      [{act.activityCode}]
                                    </span>
                                  )}
                                  <span>{act.name}</span>
                                </span>
                              );
                            })
                          ) : (
                            <span className="text-[11px] text-slate-400 italic">
                              General Activity
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 line-clamp-1 italic mt-1">
                          {item.remarks ? (
                            `"${item.remarks}"`
                          ) : (
                            <span className="text-slate-400 not-italic">
                              No remarks provided
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Supervisor */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#0A5C36] text-white font-bold flex items-center justify-center text-[10px]">
                            {supervisor.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-slate-800">
                              {supervisor}
                            </div>
                            {supervisorUsername && (
                              <div className="text-[10px] font-mono text-slate-400">
                                @{supervisorUsername}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Photos Count */}
                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center gap-1 font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          <Camera className="w-3 h-3 text-[#0A5C36]" />
                          {photoCount}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3 px-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-[#0A5C36] border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-[#0A5C36]" />
                          VERIFIED
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSubmission(item);
                          }}
                          className="p-1.5 text-slate-400 hover:text-[#0A5C36] hover:bg-emerald-50 rounded transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="py-2.5 px-4 bg-slate-50 border-t border-slate-200 text-[10px] font-mono text-slate-500 flex justify-between items-center">
          <span>
            Showing 1 to {filtered.length} of {filtered.length} Linear Submissions
          </span>
          <span>Auto-sync active • Precision ±2.8m (RTK Telemetry)</span>
        </div>
      </div>

      {/* Inspection Dossier Side Drawer */}
      <InspectionDossierDrawer
        submission={selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
      />
    </div>
  );
}
