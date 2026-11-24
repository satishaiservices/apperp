'use client';

import React, { useState, useEffect } from 'react';
import { TwoLevelActivityWBS } from './TwoLevelActivityWBS';
import { apiRequest } from '@/lib/api-client';
import {
  X,
  Route,
  MapPin,
  FolderTree,
  Users,
  Calendar,
  Building,
  CheckCircle2,
  Sliders,
  DollarSign,
  Edit2,
  Save,
  AlertCircle,
  Check,
  Copy,
} from 'lucide-react';

interface ProjectDetailDrawerProps {
  project: any | null;
  onClose: () => void;
  onRefresh: () => void;
  onDuplicate?: (project: any) => void;
}

export function ProjectDetailDrawer({
  project,
  onClose,
  onRefresh,
  onDuplicate,
}: ProjectDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState<'linear' | 'wbs'>('linear');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [projectCode, setProjectCode] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [clientName, setClientName] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [startChainage, setStartChainage] = useState('');
  const [endChainage, setEndChainage] = useState('');
  const [startLatitude, setStartLatitude] = useState('');
  const [startLongitude, setStartLongitude] = useState('');
  const [endLatitude, setEndLatitude] = useState('');
  const [endLongitude, setEndLongitude] = useState('');
  const [budget, setBudget] = useState('');

  useEffect(() => {
    if (project) {
      setName(project.name || '');
      setProjectCode(project.projectCode || '');
      setStatus(project.status || 'ACTIVE');
      setClientName(project.clientName || '');
      setSiteAddress(project.siteAddress || '');
      setStartChainage(project.startChainage || 'CH 00+000');
      setEndChainage(project.endChainage || 'CH 48+500');
      setStartLatitude(project.startLatitude ? String(project.startLatitude) : '');
      setStartLongitude(project.startLongitude ? String(project.startLongitude) : '');
      setEndLatitude(project.endLatitude ? String(project.endLatitude) : '');
      setEndLongitude(project.endLongitude ? String(project.endLongitude) : '');
      setBudget(project.budget ? String(project.budget) : '');
      setIsEditing(false);
      setError(null);
      setSuccessMsg(null);
    }
  }, [project]);

  if (!project) return null;

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      await apiRequest(`/projects/${project.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: name.trim(),
          projectCode: projectCode.trim(),
          status,
          clientName: clientName.trim() || undefined,
          siteAddress: siteAddress.trim() || undefined,
          startChainage: startChainage.trim(),
          endChainage: endChainage.trim(),
          startLatitude: startLatitude ? parseFloat(startLatitude) : null,
          startLongitude: startLongitude ? parseFloat(startLongitude) : null,
          endLatitude: endLatitude ? parseFloat(endLatitude) : null,
          endLongitude: endLongitude ? parseFloat(endLongitude) : null,
          budget: budget ? parseFloat(budget) : null,
        }),
      });

      setSuccessMsg('Project updated successfully!');
      setIsEditing(false);
      onRefresh();
    } catch (err: any) {
      setError(err.message || 'Failed to update project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-mono font-bold text-xs bg-slate-900 text-white px-2 py-0.5 rounded">
                #{project.projectCode}
              </span>
              <h2 className="text-base font-bold text-slate-900">{project.name}</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-[#0A5C36] border border-emerald-200">
                {project.status}
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <span>Client: {project.clientName || 'Civil Works Authority'}</span>
              <span>•</span>
              <span>Site: {project.siteAddress || 'Regional Corridor'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onDuplicate && (
              <button
                type="button"
                onClick={() => onDuplicate(project)}
                title="Duplicate this project package and WBS activities"
                className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                Duplicate Package
              </button>
            )}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isEditing
                  ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                  : 'bg-[#0A5C36] text-white hover:bg-[#084A2B]'
              }`}
            >
              <Edit2 className="w-3.5 h-3.5" />
              {isEditing ? 'Cancel Edit' : 'Edit Project Details'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Alerts */}
        {error && (
          <div className="mx-6 mt-3 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="mx-6 mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="px-6 border-b border-slate-200 bg-white flex gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('linear')}
            className={`py-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'linear'
                ? 'border-[#0A5C36] text-[#0A5C36]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Route className="w-4 h-4" />
            Linear Alignment & Chainages
          </button>

          <button
            onClick={() => setActiveTab('wbs')}
            className={`py-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'wbs'
                ? 'border-[#0A5C36] text-[#0A5C36]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FolderTree className="w-4 h-4" />
            2-Level Activity Master (WBS)
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {isEditing ? (
            /* Edit Project Form */
            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-4">
                <div className="font-bold text-emerald-950 flex items-center justify-between">
                  <span>Modify Project Package Parameters</span>
                  <span className="font-mono text-[11px] text-emerald-700">ID: {project.id}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Project Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-[#0A5C36]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Package Code *</label>
                    <input
                      type="text"
                      required
                      value={projectCode}
                      onChange={(e) => setProjectCode(e.target.value)}
                      className="w-full px-3 py-1.5 font-mono bg-white border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-[#0A5C36]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Execution Status *</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs font-semibold focus:ring-1 focus:ring-[#0A5C36]"
                    >
                      <option value="ACTIVE">ACTIVE (Under Execution)</option>
                      <option value="PLANNING">PLANNING (Pre-Construction)</option>
                      <option value="COMPLETED">COMPLETED (Commissioned)</option>
                      <option value="ON_HOLD">ON_HOLD (Suspended)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Sanctioned Budget ($)</label>
                    <input
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3 py-1.5 font-mono bg-white border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-[#0A5C36]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Client Authority Name</label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. NHAI / State PWD"
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-[#0A5C36]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Site / Regional Address</label>
                    <input
                      type="text"
                      value={siteAddress}
                      onChange={(e) => setSiteAddress(e.target.value)}
                      placeholder="e.g. Regional Corridor Section 04"
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs focus:ring-1 focus:ring-[#0A5C36]"
                    />
                  </div>
                </div>

                {/* Linear Alignment Coordinates */}
                <div className="border-t border-emerald-200/60 pt-3">
                  <div className="font-bold text-slate-800 mb-2">Linear Alignment & Chainages</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Start Chainage */}
                    <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                      <div className="font-semibold text-emerald-800 text-xs">Origin Terminus (Start)</div>
                      <input
                        type="text"
                        required
                        value={startChainage}
                        onChange={(e) => setStartChainage(e.target.value)}
                        placeholder="CH 00+000"
                        className="w-full px-2.5 py-1.5 font-mono border border-slate-300 rounded text-xs"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={startLatitude}
                          onChange={(e) => setStartLatitude(e.target.value)}
                          placeholder="Lat (e.g. 28.4595)"
                          className="px-2 py-1 font-mono border border-slate-300 rounded text-[11px]"
                        />
                        <input
                          type="text"
                          value={startLongitude}
                          onChange={(e) => setStartLongitude(e.target.value)}
                          placeholder="Lng (e.g. 77.0266)"
                          className="px-2 py-1 font-mono border border-slate-300 rounded text-[11px]"
                        />
                      </div>
                    </div>

                    {/* End Chainage */}
                    <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                      <div className="font-semibold text-rose-800 text-xs">Terminal Point (End)</div>
                      <input
                        type="text"
                        required
                        value={endChainage}
                        onChange={(e) => setEndChainage(e.target.value)}
                        placeholder="CH 48+500"
                        className="w-full px-2.5 py-1.5 font-mono border border-slate-300 rounded text-xs"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={endLatitude}
                          onChange={(e) => setEndLatitude(e.target.value)}
                          placeholder="Lat (e.g. 28.1482)"
                          className="px-2 py-1 font-mono border border-slate-300 rounded text-[11px]"
                        />
                        <input
                          type="text"
                          value={endLongitude}
                          onChange={(e) => setEndLongitude(e.target.value)}
                          placeholder="Lng (e.g. 76.8198)"
                          className="px-2 py-1 font-mono border border-slate-300 rounded text-[11px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-[#0A5C36] hover:bg-[#084A2B] text-white font-bold rounded-lg flex items-center gap-2 shadow-sm transition-colors disabled:opacity-60 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {loading ? 'Saving...' : 'Save Project Details'}
                </button>
              </div>
            </form>
          ) : (
            /* View Mode */
            <>
              {activeTab === 'linear' && (
                <div className="space-y-5">
                  {/* Benchmarks Card */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Origin */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-emerald-700" />
                          ORIGIN TERMINUS (START)
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">BENCHMARK 01</span>
                      </div>
                      <div className="text-xl font-extrabold font-mono text-slate-900">
                        {project.startChainage || 'CH 00+000'}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500">
                        GPS: {project.startLatitude ? `${project.startLatitude}° N, ${project.startLongitude}° E` : '28.4595° N, 77.0266° E'}
                      </div>
                    </div>

                    {/* Terminal */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-rose-600" />
                          TERMINAL POINT (END)
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">BENCHMARK 02</span>
                      </div>
                      <div className="text-xl font-extrabold font-mono text-slate-900">
                        {project.endChainage || 'CH 48+500'}
                      </div>
                      <div className="text-[11px] font-mono text-slate-500">
                        GPS: {project.endLatitude ? `${project.endLatitude}° N, ${project.endLongitude}° E` : '28.1482° N, 76.8198° E'}
                      </div>
                    </div>
                  </div>

                  {/* Linear Chainage Progress Bar */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-slate-800 uppercase font-mono">
                        Continuous Linear Profile Bar
                      </span>
                      <span className="text-emerald-700 font-mono font-semibold">68.2% Cleared</span>
                    </div>

                    <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-[#0A5C36]" style={{ width: '38%' }} title="Compacted: 38%" />
                      <div className="h-full bg-emerald-500" style={{ width: '22%' }} title="GSB Laying: 22%" />
                      <div className="h-full bg-amber-500" style={{ width: '15%' }} title="ROW Cleared: 15%" />
                      <div className="h-full bg-slate-200" style={{ width: '25%' }} title="Planned: 25%" />
                    </div>

                    <div className="flex flex-wrap gap-4 text-[10px] font-mono text-slate-500 pt-1">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-[#0A5C36]" /> Compacted Subgrade</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-500" /> GSB / WMM Base</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-500" /> ROW Issue / Encroachment</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-slate-300" /> Planned Spread</span>
                    </div>
                  </div>

                  {/* Sub-Package Sectional Configuration */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <div className="font-bold text-xs text-slate-800 uppercase font-mono">
                      Sectional Sub-Package Configuration
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <div className="font-bold text-slate-900">Section 1: Origin Reach</div>
                        <div className="font-mono text-slate-500 text-[11px] mt-1">{project.startChainage || 'CH 00+000'} - CH 12+500</div>
                        <div className="text-[10px] text-emerald-700 font-semibold mt-2">✓ Alignment Primed</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <div className="font-bold text-slate-900">Section 2: Mid-Corridor</div>
                        <div className="font-mono text-slate-500 text-[11px] mt-1">CH 12+500 - CH 28+000</div>
                        <div className="text-[10px] text-amber-700 font-semibold mt-2">⚡ Active Execution</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-slate-200">
                        <div className="font-bold text-slate-900">Section 3: Terminal Reach</div>
                        <div className="font-mono text-slate-500 text-[11px] mt-1">CH 28+000 - {project.endChainage || 'CH 48+500'}</div>
                        <div className="text-[10px] text-slate-500 font-semibold mt-2">⏳ Embankment Phase</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'wbs' && (
                <TwoLevelActivityWBS projectId={project.id} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
