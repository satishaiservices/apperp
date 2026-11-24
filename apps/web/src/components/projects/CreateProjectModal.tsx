'use client';

import React, { useState } from 'react';
import { apiRequest } from '@/lib/api-client';
import {
  X,
  FolderPlus,
  Route,
  MapPin,
  Calendar,
  DollarSign,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateProjectModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateProjectModalProps) {
  const [projectCode, setProjectCode] = useState('');
  const [name, setName] = useState('');
  const [clientName, setClientName] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [startChainage, setStartChainage] = useState('CH 00+000');
  const [endChainage, setEndChainage] = useState('CH 48+500');
  const [startLatitude, setStartLatitude] = useState('28.4595');
  const [startLongitude, setStartLongitude] = useState('77.0266');
  const [endLatitude, setEndLatitude] = useState('28.1482');
  const [endLongitude, setEndLongitude] = useState('76.8198');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState('ACTIVE');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await apiRequest('/projects', {
        method: 'POST',
        body: JSON.stringify({
          projectCode,
          name,
          clientName: clientName || undefined,
          siteAddress: siteAddress || undefined,
          startChainage: startChainage || undefined,
          endChainage: endChainage || undefined,
          startLatitude: startLatitude ? parseFloat(startLatitude) : undefined,
          startLongitude: startLongitude ? parseFloat(startLongitude) : undefined,
          endLatitude: endLatitude ? parseFloat(endLatitude) : undefined,
          endLongitude: endLongitude ? parseFloat(endLongitude) : undefined,
          budget: budget ? parseFloat(budget) : undefined,
          startDate: startDate || undefined,
          status,
        }),
      });

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <div className="flex items-center gap-2">
              <Route className="w-5 h-5 text-[#0A5C36]" />
              <h2 className="text-sm font-bold text-slate-900">
                Setup Civil Infrastructure Package / Project
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Define linear corridor alignment, start/end chainages, and benchmarks.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Basic Info */}
          <div className="space-y-3 pb-3 border-b border-slate-200">
            <div className="font-semibold text-slate-900 text-[11px] font-mono uppercase tracking-wider">
              1. Project Identification
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Package / Project Code *</label>
                <input
                  type="text"
                  required
                  value={projectCode}
                  onChange={(e) => setProjectCode(e.target.value)}
                  placeholder="e.g. HWY-402 or NH48-PKG2"
                  className="w-full px-3 py-1.5 font-mono border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. NH-48 Package-II Expressway"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Client Authority Name</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. National Highways Authority of India (NHAI)"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Site Address / Corridor Region</label>
                <input
                  type="text"
                  value={siteAddress}
                  onChange={(e) => setSiteAddress(e.target.value)}
                  placeholder="e.g. Gurugram to Rewari Section, Haryana"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                />
              </div>
            </div>
          </div>

          {/* Linear Alignment & Chainages */}
          <div className="space-y-3 pb-3 border-b border-slate-200">
            <div className="font-semibold text-slate-900 text-[11px] font-mono uppercase tracking-wider flex items-center justify-between">
              <span>2. Linear Alignment & Benchmarks</span>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                WGS84 Datum
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
              {/* Origin */}
              <div className="space-y-2">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                  Origin Terminus (Start Point)
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">Start Chainage</label>
                  <input
                    type="text"
                    value={startChainage}
                    onChange={(e) => setStartChainage(e.target.value)}
                    placeholder="CH 00+000"
                    className="w-full px-2.5 py-1.5 font-mono bg-white border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0A5C36]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-500">Start Lat</label>
                    <input
                      type="number"
                      step="any"
                      value={startLatitude}
                      onChange={(e) => setStartLatitude(e.target.value)}
                      placeholder="28.4595"
                      className="w-full px-2 py-1 font-mono bg-white border border-slate-300 rounded text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500">Start Lng</label>
                    <input
                      type="number"
                      step="any"
                      value={startLongitude}
                      onChange={(e) => setStartLongitude(e.target.value)}
                      placeholder="77.0266"
                      className="w-full px-2 py-1 font-mono bg-white border border-slate-300 rounded text-[11px]"
                    />
                  </div>
                </div>
              </div>

              {/* Terminal */}
              <div className="space-y-2">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-600" />
                  Terminal Point (End Point)
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">End Chainage</label>
                  <input
                    type="text"
                    value={endChainage}
                    onChange={(e) => setEndChainage(e.target.value)}
                    placeholder="CH 48+500"
                    className="w-full px-2.5 py-1.5 font-mono bg-white border border-slate-300 rounded text-xs focus:ring-1 focus:ring-[#0A5C36]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-500">End Lat</label>
                    <input
                      type="number"
                      step="any"
                      value={endLatitude}
                      onChange={(e) => setEndLatitude(e.target.value)}
                      placeholder="28.1482"
                      className="w-full px-2 py-1 font-mono bg-white border border-slate-300 rounded text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500">End Lng</label>
                    <input
                      type="number"
                      step="any"
                      value={endLongitude}
                      onChange={(e) => setEndLongitude(e.target.value)}
                      placeholder="76.8198"
                      className="w-full px-2 py-1 font-mono bg-white border border-slate-300 rounded text-[11px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Budget & Execution */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-600 font-medium mb-1">Sanctioned Budget (Optional)</label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Optional (e.g. 42500000)"
                className="w-full px-3 py-1.5 font-mono border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0A5C36]"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-medium mb-1">Commencement Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0A5C36]"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-medium mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-[#0A5C36]"
              >
                <option value="PLANNING">Planning</option>
                <option value="ACTIVE">Active</option>
                <option value="ON_HOLD">On Hold</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-[#0A5C36] hover:bg-[#084A2B] text-white font-bold rounded-lg flex items-center gap-2 shadow-sm transition-colors disabled:opacity-60 cursor-pointer"
            >
              {loading ? 'Creating Project...' : 'Save & Initialize Package'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
