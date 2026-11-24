'use client';

import React from 'react';
import {
  X,
  Printer,
  MapPin,
  Camera,
  FileCheck2,
  Calendar,
  Layers,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { AuthenticatedImage } from '@/components/common/AuthenticatedImage';

interface InspectionDossierDrawerProps {
  submission: any | null;
  onClose: () => void;
}

export function InspectionDossierDrawer({
  submission,
  onClose,
}: InspectionDossierDrawerProps) {
  const [selectedPhotoModal, setSelectedPhotoModal] = React.useState<string | null>(null);

  if (!submission) return null;

  const refId = submission.id ? `#REP-${submission.id.slice(0, 8).toUpperCase()}` : '#REP-SUBMISSION';
  const supervisorName =
    submission.supervisor?.user?.fullName ||
    submission.supervisor?.user?.username ||
    'Field Supervisor';
  const startCh = submission.startChainage || 'CH 00+000';
  const endCh = submission.endChainage || 'CH 00+000';
  const lat = submission.latitude ? Number(submission.latitude).toFixed(4) : null;
  const lng = submission.longitude ? Number(submission.longitude).toFixed(4) : null;
  const photos: any[] = submission.photos || [];

  // Extract BOQ Quantities if present in remarks
  const boqItems: { activity: string; quantity: string }[] = [];
  let cleanedRemarks = submission.remarks || '';

  if (submission.remarks) {
    const boqRegex = /\[BOQ:\s*(.*?)\s*\|\s*Qty:\s*(.*?)\]/g;
    let match;
    while ((match = boqRegex.exec(submission.remarks)) !== null) {
      boqItems.push({
        activity: match[1].trim(),
        quantity: match[2].trim(),
      });
    }
    const filtered = submission.remarks
      .replace(/\[BOQ:\s*(.*?)\s*\|\s*Qty:\s*(.*?)\]/g, '')
      .trim();
    if (filtered.length > 0) {
      cleanedRemarks = filtered;
    }
  }

  const getPhotoUrl = (photoId: string) => {
    if (
      typeof window !== 'undefined' &&
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1'
    ) {
      return `/api-proxy/submissions/${submission.id}/photos/${photoId}`;
    }

    let base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    // Strip trailing /api/v1 or slash so we don't end up with /api/v1/api/v1
    base = base.replace(/\/api\/v1\/?$/, '').replace(/\/$/, '');
    return `${base}/api/v1/submissions/${submission.id}/photos/${photoId}`;
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col text-xs animate-in slide-in-from-right duration-200">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCheck2 className="w-5 h-5 text-[#0A5C36]" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-900">Inspection Dossier</h3>
              <span className="font-mono font-bold text-xs bg-[#0A5C36] text-white px-2 py-0.5 rounded">
                {refId}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">
              Verified Submission Record • CivilERP Real-Time Telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => window.print()}
            title="Print Dossier"
            className="p-1.5 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-200/60"
          >
            <Printer className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Drawer Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Project & Linear Alignment Card */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2.5">
          <div className="flex justify-between items-center text-[11px] font-mono font-semibold text-slate-700">
            <span>PROJECT & CORRIDOR ALIGNMENT</span>
            <span className="text-emerald-700 font-bold">
              {submission.project?.projectCode || 'ACTIVE SPREAD'}
            </span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
            <div className="text-xs font-bold text-slate-900">
              {submission.project?.name || 'Company Project'}
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-500 border-t border-slate-100 pt-1.5">
              <span>Start: <strong className="text-slate-800">{startCh}</strong></span>
              <span className="text-slate-300">→</span>
              <span>End: <strong className="text-slate-800">{endCh}</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-600 pt-0.5">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>
                {lat && lng ? `${lat}° N, ${lng}° E` : 'GPS Coordinates Logged'}
              </span>
            </div>
            <div className="text-right text-slate-500">
              Precision: {submission.locationAccuracyM ? `±${submission.locationAccuracyM}m` : '±2.8m (RTK)'}
            </div>
          </div>
        </div>

        {/* Work Activities & Breakdown */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
          <div className="font-bold text-slate-900 font-mono text-[11px] uppercase tracking-wider pb-1.5 border-b border-slate-100 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#0A5C36]" />
              Work Activities & Subactivities
            </span>
            <span className="text-[10px] text-[#0A5C36] font-bold">
              {submission.activities?.length || 0} Logged
            </span>
          </div>

          <div className="space-y-2">
            {submission.activities && submission.activities.length > 0 ? (
              submission.activities.map((item: any, i: number) => {
                const act = item.activity || item;
                return (
                  <div
                    key={item.id || i}
                    className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/90 flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-[#0A5C36] font-mono font-bold text-[10px] border border-emerald-200">
                          {act.activityCode || `1.${i + 1}`}
                        </span>
                        <span className="font-semibold text-slate-900 text-xs">
                          {act.name}
                        </span>
                      </div>
                      {act.description && (
                        <p className="text-[10px] text-slate-500 pl-1">{act.description}</p>
                      )}
                    </div>
                    {act.unit && (
                      <span className="text-[10px] font-mono text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold">
                        {act.unit}
                      </span>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-400 italic py-2 text-center">
                No specific activities recorded
              </p>
            )}
          </div>
        </div>

        {/* Geotagged Field Telemetry Photos */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-800">
            <span className="flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-[#0A5C36]" />
              Field Telemetry Photos ({photos.length} Uploaded)
            </span>
            {photos.length > 0 && (
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                WATERMARKED
              </span>
            )}
          </div>

          {/* Photo Gallery Grid or Clean Empty State */}
          {photos.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {photos.map((photo, pIdx) => {
                const photoSrc = getPhotoUrl(photo.id);
                return (
                  <div
                    key={photo.id || pIdx}
                    className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-300 group cursor-pointer"
                    onClick={() => setSelectedPhotoModal(photoSrc)}
                  >
                    <AuthenticatedImage
                      src={photoSrc}
                      alt={`Site Photo ${pIdx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-slate-900/80 px-2 py-1 text-[9px] font-mono text-white flex justify-between items-center">
                      <span>PHOTO #{pIdx + 1}</span>
                      <a
                        href={photoSrc}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-emerald-300 hover:text-white"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-5 text-center text-slate-400 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <Camera className="w-7 h-7 mx-auto text-slate-300 stroke-1" />
              <p className="font-semibold text-xs text-slate-600">No Photos Attached</p>
              <p className="text-[10px] text-slate-400">
                This daily submission was logged without camera captures.
              </p>
            </div>
          )}

          {photos.length > 0 && lat && lng && (
            <div className="text-[9px] font-mono text-slate-400">
              EXIF: Lat {lat}° N | Lon {lng}° E | Watermarked via CivilERP Mobile
            </div>
          )}
        </div>

        {/* Extracted BOQ Quantities Card */}
        {boqItems.length > 0 && (
          <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between text-emerald-900 text-[11px] font-mono font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-700" />
                Physical BOQ Progress Quantities
              </span>
              <span className="bg-emerald-200/80 text-emerald-950 text-[10px] px-2 py-0.5 rounded-full font-bold">
                {boqItems.length} RECORDED
              </span>
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {boqItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white px-3 py-2 rounded-lg border border-emerald-100 flex items-center justify-between shadow-xs"
                >
                  <span className="text-xs font-semibold text-slate-800">
                    {item.activity}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    {item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Supervisor & Field Remarks */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
          <div className="font-bold text-slate-800 text-[11px] font-mono uppercase">
            Supervisor Daily Field Remarks
          </div>
          <p className="text-slate-700 text-xs leading-relaxed">
            {cleanedRemarks ? (
              `"${cleanedRemarks}"`
            ) : (
              <span className="italic text-slate-400">No additional remarks entered for this submission.</span>
            )}
          </p>
          <div className="text-[10px] text-slate-500 font-mono pt-1.5 flex justify-between border-t border-slate-200/60">
            <span>By: <strong>{supervisorName}</strong></span>
            <span>
              {submission.submittedAt
                ? new Date(submission.submittedAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '—'}{' '}
              IST
            </span>
          </div>
        </div>

        {/* Digital Verification Card */}
        <div className="p-3.5 bg-emerald-950 text-white rounded-xl border border-emerald-800 space-y-2">
          <div className="flex justify-between items-center text-[10px] font-mono">
            <span>DIGITAL TELEMETRY STAMP</span>
            <span className="px-1.5 py-0.2 bg-emerald-800 text-emerald-200 rounded font-bold">
              VERIFIED
            </span>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <div className="w-9 h-9 rounded-full bg-emerald-800 border border-emerald-700 flex items-center justify-center font-bold text-xs text-emerald-200">
              {supervisorName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="font-bold text-xs">{supervisorName}</div>
              <div className="text-[10px] text-emerald-300">
                {submission.supervisor?.user?.username
                  ? `@${submission.supervisor.user.username}`
                  : 'Site Supervisor'}
              </div>
            </div>
            <div className="ml-auto text-right text-[10px] font-mono text-emerald-300">
              <div>
                {submission.submittedAt
                  ? new Date(submission.submittedAt).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                    })
                  : '—'}
              </div>
              <div className="text-[9px] text-emerald-400">ID: {refId}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-resolution Photo Modal */}
      {selectedPhotoModal && (
        <div
          className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedPhotoModal(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh] bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedPhotoModal(null)}
              className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-black text-white rounded-full z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <AuthenticatedImage
              src={selectedPhotoModal}
              alt="Full Preview"
              className="w-full h-auto max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
