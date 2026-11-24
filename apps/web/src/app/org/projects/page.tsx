'use client';

import React, { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api-client';
import { CreateProjectModal } from '@/components/projects/CreateProjectModal';
import { ProjectDetailDrawer } from '@/components/projects/ProjectDetailDrawer';
import {
  Route,
  Plus,
  Search,
  MapPin,
  Calendar,
  Layers,
  Users,
  ChevronRight,
  ExternalLink,
  DollarSign,
  TrendingUp,
  Copy,
  X,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'PLANNING' | 'COMPLETED'>('ALL');

  // Duplicate Project State
  const [duplicatingProject, setDuplicatingProject] = useState<any | null>(null);
  const [dupCode, setDupCode] = useState('');
  const [dupName, setDupName] = useState('');
  const [isDuplicating, setIsDuplicating] = useState(false);
  const [dupError, setDupError] = useState<string | null>(null);

  const startDuplicate = (proj: any) => {
    setDuplicatingProject(proj);
    setDupCode(`${proj.projectCode}-COPY`);
    setDupName(`${proj.name} (Copy)`);
    setDupError(null);
  };

  const handleDuplicateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!duplicatingProject) return;
    try {
      setIsDuplicating(true);
      setDupError(null);
      const newProj = await apiRequest(`/projects/${duplicatingProject.id}/duplicate`, {
        method: 'POST',
        body: JSON.stringify({
          projectCode: dupCode.trim(),
          name: dupName.trim(),
        }),
      });
      setDuplicatingProject(null);
      await fetchProjects();
      setSelectedProject(newProj);
    } catch (err: any) {
      setDupError(err.message || 'Failed to duplicate project package');
    } finally {
      setIsDuplicating(false);
    }
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await apiRequest('/projects');
      setProjects(res);
    } catch (e) {
      console.error('Failed to load projects', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.projectCode.toLowerCase().includes(search.toLowerCase()) ||
      (p.clientName && p.clientName.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = filter === 'ALL' || p.status === filter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Route className="w-5 h-5 text-[#0A5C36]" />
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Package Master & Chainage Alignment
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage highway packages, linear corridors, start/end chainages, and 2-level WBS activities.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="py-2 px-4 bg-[#0A5C36] hover:bg-[#084A2B] text-white font-bold text-xs rounded-lg flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          + New Project Package
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 max-w-md relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search code, package ID, or chainage..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md text-xs placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
          />
        </div>

        <div className="flex bg-slate-100 p-0.5 rounded-md text-[11px] font-semibold">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1 rounded transition-colors ${
              filter === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({projects.length})
          </button>
          <button
            onClick={() => setFilter('ACTIVE')}
            className={`px-3 py-1 rounded transition-colors ${
              filter === 'ACTIVE' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Active ({projects.filter((p) => p.status === 'ACTIVE').length})
          </button>
          <button
            onClick={() => setFilter('PLANNING')}
            className={`px-3 py-1 rounded transition-colors ${
              filter === 'PLANNING' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Planning ({projects.filter((p) => p.status === 'PLANNING').length})
          </button>
        </div>
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="py-12 text-center text-xs font-mono text-slate-400">
          Loading project packages...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-white text-xs text-slate-400">
          No project packages found. Click "+ New Project Package" to create your first package.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:border-[#0A5C36]/50 transition-all p-5 flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              {/* Left Column: Project Info */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono font-bold text-xs bg-slate-900 text-white px-2 py-0.5 rounded">
                    #{proj.projectCode}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-[#0A5C36] border border-emerald-200">
                    {proj.status === 'ACTIVE' ? 'Active Package' : proj.status}
                  </span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500 font-medium">
                    {proj.clientName || 'National Highways Authority of India (NHAI)'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{proj.name}</h3>

                {/* Chainage & Benchmarks */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span>
                      {proj.startChainage || 'CH 00+000'} <span className="text-slate-400">to</span> {proj.endChainage || 'CH 48+500'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                    <Layers className="w-3.5 h-3.5 text-slate-500" />
                    <span>{proj._count?.activities || 0} WBS Activities</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>14 Civil Crew Assigned</span>
                  </div>
                </div>

                {/* Linear Profile Bar Mini */}
                <div className="w-full max-w-md h-2 bg-slate-100 rounded-full overflow-hidden flex mt-2">
                  <div className="h-full bg-[#0A5C36]" style={{ width: '45%' }} title="Compacted" />
                  <div className="h-full bg-emerald-500" style={{ width: '25%' }} title="GSB Laying" />
                  <div className="h-full bg-amber-500" style={{ width: '15%' }} title="ROW Cleared" />
                  <div className="h-full bg-slate-200" style={{ width: '15%' }} title="Planned" />
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="flex md:flex-col items-end justify-between md:justify-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-[10px] font-mono uppercase text-slate-400">SANCTIONED BUDGET</div>
                  <div className="text-sm font-bold font-mono text-slate-900">
                    {proj.budget ? (
                      `$${Number(proj.budget).toLocaleString()}`
                    ) : (
                      <span className="text-slate-400 font-normal italic text-xs">Optional / Unset</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => startDuplicate(proj)}
                    title="Duplicate this project package and WBS activities"
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-300"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-600" />
                    Duplicate
                  </button>
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="px-4 py-2 bg-slate-900 hover:bg-[#0A5C36] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    Manage Package & WBS
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <CreateProjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={fetchProjects}
      />

      {/* Detail Drawer */}
      <ProjectDetailDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onDuplicate={startDuplicate}
        onRefresh={async () => {
          await fetchProjects();
          if (selectedProject) {
            try {
              const updated = await apiRequest(`/projects/${selectedProject.id}`);
              setSelectedProject(updated);
            } catch {}
          }
        }}
      />

      {/* Duplicate Project Modal */}
      {duplicatingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-100 text-[#0A5C36]">
                  <Copy className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Duplicate Project Package</h3>
                  <p className="text-[11px] text-slate-500">Clones chainages and complete 2-level WBS activities</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDuplicatingProject(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleDuplicateSubmit} className="p-5 space-y-4 text-xs">
              {dupError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{dupError}</span>
                </div>
              )}

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-600">
                <div className="text-[11px] font-semibold text-slate-700">Source Package:</div>
                <div className="font-mono font-bold text-slate-900 text-xs mt-0.5">
                  [{duplicatingProject.projectCode}] {duplicatingProject.name}
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  New Package Code <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={dupCode}
                  onChange={(e) => setDupCode(e.target.value)}
                  placeholder="e.g. NH48-PKG2-COPY"
                  className="w-full px-3 py-2 font-mono bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0A5C36] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  New Project Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={dupName}
                  onChange={(e) => setDupName(e.target.value)}
                  placeholder="e.g. NH-48 Expansion (Copy)"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#0A5C36] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDuplicatingProject(null)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isDuplicating || !dupCode.trim() || !dupName.trim()}
                  className="px-4 py-2 bg-[#0A5C36] hover:bg-[#084A2B] text-white font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors disabled:opacity-60 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {isDuplicating ? 'Duplicating...' : 'Duplicate Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
