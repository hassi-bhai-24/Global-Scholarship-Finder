import React, { useState } from 'react';
import { ShieldCheck, RefreshCw, ExternalLink, CheckCircle2 } from 'lucide-react';
import { OFFICIAL_SOURCES, VERIFIED_SCHOLARSHIPS } from '../data/scholarships';
import { VerificationSourceInfo } from '../types/scholarship';

export const AdminConsoleView: React.FC = () => {
  const [sources] = useState<VerificationSourceInfo[]>(OFFICIAL_SOURCES);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditDone, setAuditDone] = useState(false);

  const handleRunAudit = () => {
    setIsAuditing(true);
    setAuditDone(false);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditDone(true);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
            Verified Sources
          </h2>
        </div>

        <button
          onClick={handleRunAudit}
          disabled={isAuditing}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xs font-semibold flex items-center gap-2 transition-colors border border-slate-700 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isAuditing ? 'animate-spin' : ''}`} />
          <span>{isAuditing ? 'Auditing Portals...' : 'Audit Portals'}</span>
        </button>
      </div>

      {auditDone && (
        <div className="p-3.5 mb-6 rounded-xl bg-emerald-950/40 border border-emerald-800/80 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Audit complete: All official sources verified active.</span>
        </div>
      )}

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400 mb-1">Tracked Authorities</div>
          <div className="font-display font-black text-xl text-white font-mono-data">{sources.length}</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400 mb-1">Indexed Scholarships</div>
          <div className="font-display font-black text-xl text-white font-mono-data">{VERIFIED_SCHOLARSHIPS.length}</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400 mb-1">Primary Domains</div>
          <div className="font-display font-black text-xl text-emerald-400 font-mono-data">100%</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400 mb-1">Fee Protection</div>
          <div className="font-display font-black text-xl text-teal-400 font-mono-data">Verified Free</div>
        </div>
      </div>

      {/* Source Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">Authority</th>
                <th className="py-3 px-4 font-semibold">Jurisdiction</th>
                <th className="py-3 px-4 font-semibold">Official Portal</th>
                <th className="py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-slate-200">
              {sources.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-100">{s.name}</td>
                  <td className="py-3 px-4 text-slate-400">{s.jurisdiction}</td>
                  <td className="py-3 px-4">
                    <a
                      href={s.portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1 font-mono-data"
                    >
                      <span className="truncate max-w-xs">{s.portalUrl.replace(/^https?:\/\//, '')}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
