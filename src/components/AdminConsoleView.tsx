import React, { useState } from 'react';
import { ShieldCheck, RefreshCw, ExternalLink, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { OFFICIAL_SOURCES, VERIFIED_SCHOLARSHIPS } from '../data/scholarships';
import { VerificationSourceInfo } from '../types/scholarship';

interface AuditResult {
  id: string;
  reachable: boolean;
  httpStatus: number | null;
  error: string | null;
  checkedAt: string;
}

export const AdminConsoleView: React.FC = () => {
  const [sources] = useState<VerificationSourceInfo[]>(OFFICIAL_SOURCES);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResults, setAuditResults] = useState<AuditResult[] | null>(null);
  const [auditError, setAuditError] = useState<string | null>(null);
  const [auditCheckedAt, setAuditCheckedAt] = useState<string | null>(null);
  // Re-checks are manual and visible: the date of the last completed audit is
  // kept in localStorage so it survives reloads. Run Audit Portals again
  // regularly (at least monthly) to refresh it; nothing re-checks itself.
  const [lastAuditAt, setLastAuditAt] = useState<string | null>(() => {
    try {
      return localStorage.getItem('scholarship-portal-last-audit');
    } catch {
      return null;
    }
  });

  const handleRunAudit = async () => {
    setIsAuditing(true);
    setAuditError(null);
    try {
      const res = await fetch('/api/scholarships/audit-sources');
      if (!res.ok) throw new Error(`Audit request failed (${res.status})`);
      const data = await res.json();
      setAuditResults(data.results as AuditResult[]);
      setAuditCheckedAt(data.checkedAt as string);
      setLastAuditAt(data.checkedAt as string);
      try {
        localStorage.setItem('scholarship-portal-last-audit', data.checkedAt as string);
      } catch {
        // Storage unavailable; the in-memory result above is still shown.
      }
    } catch (err) {
      setAuditError(err instanceof Error ? err.message : 'Audit request failed.');
      setAuditResults(null);
    } finally {
      setIsAuditing(false);
    }
  };

  const resultFor = (id: string) => auditResults?.find((r) => r.id === id);
  const reachableCount = auditResults ? auditResults.filter((r) => r.reachable).length : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
            Sources
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {lastAuditAt
              ? `Last portal audit: ${lastAuditAt}. Re-checks are manual — run Audit Portals again at least monthly; a portal that does not respond is not marked verified.`
              : 'No portal audit has been run yet in this browser. Run Audit Portals to check every portal now; re-check at least monthly.'}
          </p>
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

      {auditError && (
        <div className="p-3.5 mb-6 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2">
          <XCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>Audit failed: {auditError} No source was marked verified by this run.</span>
        </div>
      )}

      {auditResults && !auditError && (
        <div className="p-3.5 mb-6 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center gap-2 text-slate-300">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>
            Audit checked {auditResults.length} portals on {auditCheckedAt}: {reachableCount} reachable,{' '}
            {auditResults.length - (reachableCount ?? 0)} not reachable. A portal that did not respond was
            not marked verified — check it on the official page before relying on it.
          </span>
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
          <div className="text-[11px] text-slate-400 mb-1">Portals Reachable (last audit)</div>
          <div className="font-display font-black text-xl text-white font-mono-data">
            {reachableCount === null ? 'Not yet audited' : `${reachableCount} / ${auditResults?.length ?? 0}`}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400 mb-1">Application Fees</div>
          <div className="font-display font-black text-xl text-teal-400 font-mono-data">Check official page</div>
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
                    {(() => {
                      const result = resultFor(s.id);
                      if (!result) {
                        return (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                            <HelpCircle className="w-3.5 h-3.5" />
                            <span>Not yet checked</span>
                          </span>
                        );
                      }
                      if (result.reachable) {
                        return (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Reachable (HTTP {result.httpStatus})</span>
                          </span>
                        );
                      }
                      return (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Not reachable{result.httpStatus ? ` (HTTP ${result.httpStatus})` : ''}{result.error ? ` — ${result.error}` : ''}</span>
                        </span>
                      );
                    })()}
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
