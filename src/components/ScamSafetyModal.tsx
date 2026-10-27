import React, { useState } from 'react';
import { X, ShieldCheck, AlertTriangle, CheckCircle2, Flag } from 'lucide-react';

interface ScamSafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'guide' | 'report';
}

export const ScamSafetyModal: React.FC<ScamSafetyModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'guide'
}) => {
  const [tab, setTab] = useState<'guide' | 'report'>(defaultTab);
  const [reportUrl, setReportUrl] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setReportUrl('');
      setReportDetails('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-7 relative text-left"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab switch */}
        <div className="flex items-center gap-2 mb-5">
          <button
            onClick={() => setTab('guide')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              tab === 'guide'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Safety Guide</span>
          </button>
          <button
            onClick={() => setTab('report')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              tab === 'report'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <Flag className="w-4 h-4 text-rose-400" />
            <span>Report Scam</span>
          </button>
        </div>

        {tab === 'guide' ? (
          <div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Student Protection Rules
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Protect yourself from fraudulent agencies and fake scholarship portals.
            </p>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Legitimate scholarships never charge application or registration fees.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Always apply directly on official government (.gov) or university (.edu, .ac) domains.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>No private agent or consultant can guarantee selection or visa grant.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Never share passwords, bank OTPs, or passport credentials with unverified contacts.</span>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="font-display font-bold text-lg text-white mb-2">
              Report Fraudulent Portal or Agent
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Help us protect the student community by reporting fraudulent activity.
            </p>

            {submitted ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Report received. Our verification team will investigate immediately.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Suspicious URL or Agency Name</label>
                  <input
                    type="text"
                    required
                    value={reportUrl}
                    onChange={(e) => setReportUrl(e.target.value)}
                    placeholder="e.g. fake-scholarships.org or agency name"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-medium">Details (e.g. demanded fee)</label>
                  <textarea
                    rows={3}
                    required
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Describe what occurred..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Submit Report
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
