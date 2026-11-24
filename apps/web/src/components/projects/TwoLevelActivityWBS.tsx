'use client';

import React, { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api-client';
import {
  Layers,
  Plus,
  ChevronDown,
  ChevronRight,
  FolderTree,
  Tag,
  CheckCircle2,
  Clock,
  Trash2,
  Edit2,
  Sparkles,
  X,
  AlertTriangle,
} from 'lucide-react';

interface SubActivity {
  id: string;
  activityCode: string;
  name: string;
  unit: string | null;
  status: string;
}

interface ParentActivity {
  id: string;
  activityCode: string;
  name: string;
  description: string | null;
  status: string;
  subactivities: SubActivity[];
}

interface TwoLevelActivityWBSProps {
  projectId: string;
}

export function TwoLevelActivityWBS({ projectId }: TwoLevelActivityWBSProps) {
  const [activities, setActivities] = useState<ParentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  // Parent form state
  const [isAddingParent, setIsAddingParent] = useState(false);
  const [parentCode, setParentCode] = useState('1.0');
  const [parentName, setParentName] = useState('');
  const [parentDesc, setParentDesc] = useState('');

  // Subactivity form state
  const [addingSubForParentId, setAddingSubForParentId] = useState<string | null>(null);
  const [subCode, setSubCode] = useState('');
  const [subName, setSubName] = useState('');

  // Edit Activity State
  const [editingActivity, setEditingActivity] = useState<{
    id: string;
    activityCode: string;
    name: string;
    unit?: string | null;
    isParent: boolean;
  } | null>(null);
  const [editCode, setEditCode] = useState('');
  const [editName, setEditName] = useState('');
  const [editUnit, setEditUnit] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Delete Activity State
  const [deletingActivity, setDeletingActivity] = useState<{
    id: string;
    name: string;
    isParent: boolean;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchTree = async () => {
    try {
      setLoading(true);
      const res = await apiRequest(`/projects/${projectId}/activities/tree`);
      setActivities(res);

      // Expand all by default
      const exp: Record<string, boolean> = {};
      res.forEach((p: ParentActivity) => {
        exp[p.id] = true;
      });
      setExpanded(exp);
    } catch (e) {
      console.error('Failed to load activity tree', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchTree();
    }
  }, [projectId]);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddParent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiRequest(`/projects/${projectId}/activities`, {
        method: 'POST',
        body: JSON.stringify({
          activityCode: parentCode,
          name: parentName,
          description: parentDesc || undefined,
          status: 'IN_PROGRESS',
        }),
      });

      setParentName('');
      setParentDesc('');
      setIsAddingParent(false);
      fetchTree();
    } catch (err: any) {
      alert(err.message || 'Failed to add parent activity');
    }
  };

  const handleAddSub = async (parentId: string, e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiRequest(`/projects/${projectId}/activities`, {
        method: 'POST',
        body: JSON.stringify({
          parentId,
          activityCode: subCode,
          name: subName,
          status: 'IN_PROGRESS',
        }),
      });

      setSubCode('');
      setSubName('');
      setAddingSubForParentId(null);
      fetchTree();
    } catch (err: any) {
      alert(err.message || 'Failed to add subactivity');
    }
  };

  const startEdit = (act: any, isParent: boolean) => {
    setEditingActivity({
      id: act.id,
      activityCode: act.activityCode,
      name: act.name,
      unit: act.unit || '',
      isParent,
    });
    setEditCode(act.activityCode);
    setEditName(act.name);
    setEditUnit(act.unit || '');
  };

  const handleUpdateActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingActivity) return;
    try {
      setIsUpdating(true);
      await apiRequest(`/activities/${editingActivity.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          activityCode: editCode.trim(),
          name: editName.trim(),
          unit: editUnit.trim() || null,
        }),
      });
      setEditingActivity(null);
      await fetchTree();
    } catch (err: any) {
      alert(err.message || 'Failed to update activity');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteActivity = async () => {
    if (!deletingActivity) return;
    try {
      setIsDeleting(true);
      await apiRequest(`/activities/${deletingActivity.id}`, {
        method: 'DELETE',
      });
      setDeletingActivity(null);
      await fetchTree();
    } catch (err: any) {
      alert(err.message || 'Failed to delete activity');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Action Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-[#0A5C36]" />
            <h3 className="font-bold text-sm text-slate-900">
              2-Level Activity Breakdown (WBS)
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Structured hierarchy for daily field report submission and layer-by-layer progress.
          </p>
        </div>

        <button
          onClick={() => setIsAddingParent(true)}
          className="px-3 py-1.5 bg-[#0A5C36] hover:bg-[#084A2B] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          + Add Parent Activity
        </button>
      </div>

      {/* Add Parent Drawer/Card */}
      {isAddingParent && (
        <form onSubmit={handleAddParent} className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-lg text-xs space-y-3 animate-in fade-in">
          <div className="font-semibold text-emerald-950 flex items-center justify-between">
            <span>New Parent Activity Group</span>
            <button
              type="button"
              onClick={() => setIsAddingParent(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              Cancel
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-600 font-medium mb-1">Code</label>
              <input
                type="text"
                required
                value={parentCode}
                onChange={(e) => setParentCode(e.target.value)}
                placeholder="e.g. 1.0 or 2.0"
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded font-mono text-xs"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-slate-600 font-medium mb-1">Activity Name</label>
              <input
                type="text"
                required
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="e.g. Earthwork & Embankment or Drainage"
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#0A5C36] text-white font-bold rounded shadow-2xs hover:bg-[#084A2B]"
            >
              Save Parent Activity
            </button>
          </div>
        </form>
      )}

      {/* Activity Tree List */}
      {loading ? (
        <div className="py-8 text-center text-xs font-mono text-slate-400">
          Loading WBS activity hierarchy...
        </div>
      ) : activities.length === 0 ? (
        <div className="py-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-xs text-slate-400">
          No activities configured yet. Click "+ Add Parent Activity" to initialize the WBS structure.
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((parent) => {
            const isExp = expanded[parent.id] ?? true;
            return (
              <div
                key={parent.id}
                className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden"
              >
                {/* Parent Row */}
                <div className="p-3.5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => toggleExpand(parent.id)}
                      className="p-1 rounded text-slate-400 hover:text-slate-700"
                    >
                      {isExp ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                      {parent.activityCode}
                    </span>
                    <span className="font-bold text-xs text-slate-900">{parent.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      ({parent.subactivities?.length || 0} Subactivities)
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setAddingSubForParentId(parent.id);
                        setSubCode(`${parent.activityCode}.${(parent.subactivities?.length || 0) + 1}`);
                      }}
                      className="px-2 py-1 bg-white border border-emerald-300 text-[#0A5C36] font-semibold text-[11px] rounded hover:bg-emerald-50 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      Sub
                    </button>
                    <button
                      type="button"
                      onClick={() => startEdit(parent, true)}
                      title="Edit parent activity"
                      className="p-1 rounded text-slate-400 hover:text-[#0A5C36] hover:bg-emerald-50 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingActivity({ id: parent.id, name: parent.name, isParent: true })}
                      title="Delete parent activity and its subactivities"
                      className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Subactivities Container */}
                {isExp && (
                  <div className="p-3 divide-y divide-slate-100">
                    {/* Inline Form to Add Subactivity */}
                    {addingSubForParentId === parent.id && (
                      <form
                        onSubmit={(e) => handleAddSub(parent.id, e)}
                        className="mb-3 p-3 bg-emerald-50/50 rounded-lg border border-emerald-200 flex items-center gap-3 text-xs"
                      >
                        <div className="w-24">
                          <input
                            type="text"
                            required
                            value={subCode}
                            onChange={(e) => setSubCode(e.target.value)}
                            placeholder="1.1"
                            className="w-full px-2 py-1 font-mono bg-white border border-slate-300 rounded text-xs"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            required
                            value={subName}
                            onChange={(e) => setSubName(e.target.value)}
                            placeholder="Subactivity name (e.g. Clearing & Grubbing)"
                            className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-xs"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-3 py-1 bg-[#0A5C36] text-white font-bold rounded hover:bg-[#084A2B] cursor-pointer"
                        >
                          Add Sub
                        </button>
                        <button
                          type="button"
                          onClick={() => setAddingSubForParentId(null)}
                          className="text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                      </form>
                    )}

                    {(!parent.subactivities || parent.subactivities.length === 0) ? (
                      <div className="text-center py-2 text-slate-400 text-[11px] italic">
                        No subactivities added yet. Click "+ Sub" to add subactivities.
                      </div>
                    ) : (
                      parent.subactivities.map((sub) => (
                        <div
                          key={sub.id}
                          className="py-2 px-3 flex items-center justify-between hover:bg-slate-50/60 rounded-md transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-[11px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                              {sub.activityCode}
                            </span>
                            <span className="text-xs font-medium text-slate-800">{sub.name}</span>
                            {sub.unit && (
                              <span className="px-1.5 py-0.2 rounded font-mono text-[10px] bg-slate-100 text-slate-600 border border-slate-200">
                                {sub.unit}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                              ACTIVE IN FIELD
                            </span>
                            <button
                              type="button"
                              onClick={() => startEdit(sub, false)}
                              title="Edit subactivity"
                              className="p-1 rounded text-slate-400 hover:text-[#0A5C36] hover:bg-emerald-50 transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingActivity({ id: sub.id, name: sub.name, isParent: false })}
                              title="Delete subactivity"
                              className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Activity / Subactivity Modal */}
      {editingActivity && (
        <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-5 space-y-4 border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Edit2 className="w-4 h-4 text-[#0A5C36]" />
                <h4 className="font-bold text-sm text-slate-900">
                  {editingActivity.isParent ? 'Edit Parent Activity Group' : 'Edit Subactivity'}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setEditingActivity(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateActivity} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Activity Code *</label>
                <input
                  type="text"
                  required
                  value={editCode}
                  onChange={(e) => setEditCode(e.target.value)}
                  className="w-full px-3 py-1.5 font-mono border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Activity Name *</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                />
              </div>

              {!editingActivity.isParent && (
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Unit of Measurement (Optional)</label>
                  <input
                    type="text"
                    value={editUnit}
                    onChange={(e) => setEditUnit(e.target.value)}
                    placeholder="e.g. Cum, Sqm, RM, Tonnes"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0A5C36]"
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingActivity(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded-md text-xs text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-1.5 bg-[#0A5C36] hover:bg-[#084A2B] text-white font-bold text-xs rounded-md transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingActivity && (
        <div className="fixed inset-0 z-60 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-4.5 space-y-3.5 border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-2 text-rose-600">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h4 className="font-bold text-sm text-slate-900">Confirm Deletion</h4>
            </div>

            <p className="text-xs text-slate-600">
              Are you sure you want to delete <span className="font-bold text-slate-900">"{deletingActivity.name}"</span>?
              {deletingActivity.isParent && (
                <span className="block mt-1 text-rose-600 font-medium">
                  Warning: Deleting this parent activity will permanently remove all of its child subactivities as well.
                </span>
              )}
            </p>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeletingActivity(null)}
                className="px-3 py-1.5 border border-slate-300 rounded-md text-xs text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteActivity}
                disabled={isDeleting}
                className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-md transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? 'Deleting...' : 'Delete Activity'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
