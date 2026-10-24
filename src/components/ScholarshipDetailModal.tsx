import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Calendar,
  DollarSign,
  Plane,
  Home,
  HeartPulse,
  GraduationCap,
  FileText,
  BookmarkCheck,
  Bookmark,
  Share2,
  ListOrdered
} from 'lucide-react';
import { ApplicationStatus, MatchResult, Scholarship } from '../types/scholarship';

interface ScholarshipDetailModalProps {
  scholarship: Scholarship | null;
  match: MatchResult | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (scholarship: Scholarship, status?: ApplicationStatus, notes?: string) => void;
  currentStatus?: ApplicationStatus;
  currentNotes?: string;
  onUpdateStatus?: (status: ApplicationStatus) => void;
  onUpdateNotes?: (notes: string) => void;
}

export const ScholarshipDetailModal: React.FC<ScholarshipDetailModalProps> = ({
  scholarship,
  match,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
  currentStatus = 'saved',
  currentNotes = '',
  onUpdateStatus,
  onUpdateNotes
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'application' | 'tracker'>('overview');
  const [localStatus, setLocalStatus] = useState<ApplicationStatus>(currentStatus);
  const [localNotes, setLocalNotes] = useState<string>(currentNotes);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen || !scholarship) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${scholarship.name} (${scholarship.provider}) - Official URL: ${scholarship.officialUrl}`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleStatusChange = (status: ApplicationStatus) => {
    setLocalStatus(status);
    if (onUpdateStatus) {
      onUpdateStatus(status);
    } else {
      onToggleSave(scholarship, status, localNotes);
    }
  };

  const handleSaveNotes = () => {
    if (onUpdateNotes) {
      onUpdateNotes(localNotes);
    } else {
      onToggleSave(scholarship, localStatus, localNotes);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-start justify-between gap-4">
            <div>
              {/* Unboxed Metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-2">
                <span className="font-semibold text-emerald-400">{scholarship.provider}</span>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <span>{scholarship.destinationCountry}</span>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <span className="capitalize">{scholarship.degreeLevels.join(" / ")}</span>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <span className="text-slate-300 font-mono-data">Deadline: {scholarship.deadline}</span>
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight">
                {scholarship.name}
              </h2>
            </div>

            {/* Actions: Bookmark, Share, Close */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleShare}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Copy share link"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => onToggleSave(scholarship, localStatus, localNotes)}
                className={`p-2 rounded-xl transition-colors ${
                  isSaved
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={isSaved ? "Saved" : "Save scholarship"}
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 mt-5 border-t border-slate-800/80 pt-3">
            {[
              { id: 'overview', label: 'Benefits & Overview' },
              { id: 'eligibility', label: 'Academic Match & Rules' },
              { id: 'application', label: 'Requirements & Steps' },
              { id: 'tracker', label: 'Application Tracker & Notes' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-left text-xs sm:text-sm">
          {/* TAB 1: OVERVIEW & BENEFITS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Funding Breakdown Grid */}
              <div>
                <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-xs mb-3">
                  Comprehensive Funding Coverage
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* Tuition */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1 text-xs">
                      <GraduationCap className="w-4 h-4" />
                      <span>Tuition Coverage</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {scholarship.benefits.tuitionCoverage}
                    </p>
                  </div>

                  {/* Stipend */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-2 text-teal-400 font-semibold mb-1 text-xs">
                      <DollarSign className="w-4 h-4" />
                      <span>Monthly Living Stipend</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {scholarship.benefits.stipendMonthly || "Covered in full living grant package"}
                    </p>
                  </div>

                  {/* Flights & Travel */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-2 text-sky-400 font-semibold mb-1 text-xs">
                      <Plane className="w-4 h-4" />
                      <span>Airfare & Travel</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {scholarship.benefits.travelAllowance || "Standard departure allowance"}
                    </p>
                  </div>

                  {/* Accommodation */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1 text-xs">
                      <Home className="w-4 h-4" />
                      <span>Housing / Residence</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {scholarship.benefits.accommodation || "Assisted housing placement & subsidy"}
                    </p>
                  </div>

                  {/* Health Insurance */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-2 text-rose-400 font-semibold mb-1 text-xs">
                      <HeartPulse className="w-4 h-4" />
                      <span>Health & Accident Insurance</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {scholarship.benefits.insurance || "Comprehensive student insurance plan"}
                    </p>
                  </div>

                  {/* Additional Perks */}
                  {scholarship.benefits.otherPerks && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="flex items-center gap-2 text-purple-400 font-semibold mb-1 text-xs">
                        <DollarSign className="w-4 h-4" />
                        <span>Additional Allowances</span>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        {scholarship.benefits.otherPerks.join(" • ")}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Source Verification Badge & Timestamp */}
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-200">
                      Primary Verification Authority: {scholarship.provider}
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      Source reference checked: {scholarship.lastVerified} · Type: {scholarship.sourceType.replace(/_/g, ' ')}
                    </div>
                  </div>
                </div>

                <a
                  href={scholarship.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  <span>Open Official Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: ACADEMIC MATCH & FAILED SUBJECTS EVALUATION */}
          {activeTab === 'eligibility' && (
            <div className="space-y-6">
              {/* THE 3 CORE QUESTIONS: WHY MATCH / WHAT DISQUALIFIES / WHAT TO CONFIRM */}
              {match && (
                <div className="space-y-4">
                  {/* 1. WHY THIS MATCHES YOU */}
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/60 space-y-2">
                    <h4 className="font-semibold text-emerald-400 text-xs uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Why This Matches You</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-200 list-disc list-inside">
                      {match.whyYouMatch.map((reason, idx) => (
                        <li key={idx} className="leading-relaxed">{reason}</li>
                      ))}
                    </ul>
                  </div>

                  {/* 2. WHAT COULD DISQUALIFY YOU */}
                  {match.whatCouldDisqualify.length > 0 && (
                    <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/60 space-y-2">
                      <h4 className="font-semibold text-rose-400 text-xs uppercase tracking-wider flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>What Could Disqualify You</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-200 list-disc list-inside">
                        {match.whatCouldDisqualify.map((disq, idx) => (
                          <li key={idx} className="leading-relaxed">{disq}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 3. WHAT WE STILL NEED TO CONFIRM */}
                  {match.whatToConfirm.length > 0 && (
                    <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-900/60 space-y-2">
                      <h4 className="font-semibold text-amber-400 text-xs uppercase tracking-wider flex items-center gap-2">
                        <Info className="w-4 h-4 text-amber-400" />
                        <span>What We Still Need To Confirm</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-200 list-disc list-inside">
                        {match.whatToConfirm.map((conf, idx) => (
                          <li key={idx} className="leading-relaxed">{conf}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* FAILED SUBJECT POLICY DEEP-DIVE */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
                  Official Failed-Subject & Backlogs Policy
                </h4>
                <div className="text-xs text-slate-300 leading-relaxed">
                  <p className="mb-2">
                    <strong className="text-white">Policy Stated: </strong>
                    {scholarship.failedSubjectRule.description}
                  </p>
                  {scholarship.failedSubjectRule.officialQuote && (
                    <blockquote className="p-3 bg-slate-900/80 border-l-2 border-emerald-500 rounded-r-lg text-slate-300 italic text-[11px]">
                      "{scholarship.failedSubjectRule.officialQuote}"
                    </blockquote>
                  )}
                </div>
              </div>

              {/* CGPA & Academic Threshold */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="font-semibold text-slate-200 uppercase tracking-wider">
                  Stated Academic Standing Cutoffs
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                  <div>
                    <span className="text-slate-400">Minimum CGPA required: </span>
                    <span className="font-bold text-white font-mono-data">
                      {scholarship.minimumCGPAOriginal} ({scholarship.cgpaScaleOriginal})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Normalized threshold: </span>
                    <span className="font-bold text-emerald-400 font-mono-data">
                      {scholarship.minimumCGPA.toFixed(2)} / 4.0
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: APPLICATION REQUIREMENTS & STEPS */}
          {activeTab === 'application' && (
            <div className="space-y-6">
              {/* Application Steps */}
              <div>
                <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-xs mb-3 flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-emerald-400" />
                  <span>Official Application Steps</span>
                </h4>
                <div className="space-y-2.5">
                  {scholarship.applicationSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 font-mono-data font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-slate-200 leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Documents */}
              <div>
                <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-xs mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-teal-400" />
                  <span>Required Documents Checklist</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {scholarship.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages & Admission Prerequisites */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="font-semibold text-slate-200 uppercase tracking-wider">
                  Language & Admission Prerequisites
                </div>
                <p className="text-slate-300">
                  <strong className="text-white">Language Requirement: </strong>
                  {scholarship.languageRequirement}
                </p>
                <p className="text-slate-300">
                  <strong className="text-white">Admission Rule: </strong>
                  {scholarship.admissionRequirement}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: APPLICATION TRACKER & PERSONAL NOTES */}
          {activeTab === 'tracker' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-xs mb-3">
                  Application Stage Tracking
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'saved', label: 'Saved' },
                    { id: 'researching', label: 'Researching' },
                    { id: 'applying', label: 'Applying' },
                    { id: 'applied', label: 'Applied' },
                    { id: 'accepted', label: 'Accepted' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleStatusChange(s.id as ApplicationStatus)}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        localStatus === s.id
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Notes */}
              <div>
                <label className="block font-semibold text-slate-300 uppercase tracking-wider text-xs mb-2">
                  Personal Application Notes & Checklist
                </label>
                <textarea
                  rows={4}
                  value={localNotes}
                  onChange={(e) => setLocalNotes(e.target.value)}
                  placeholder="e.g. Need to request recommendation from Dr. Watson by Friday; drafting Statement of Purpose focusing on sustainable robotics..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={handleSaveNotes}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Save Notes & Status
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Official Portal:</span>
            <a
              href={scholarship.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline max-w-[280px] sm:max-w-md truncate"
            >
              {scholarship.officialUrl}
            </a>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onToggleSave(scholarship, localStatus, localNotes)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-initial"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isSaved ? 'In Tracker ✓' : 'Add to Tracker'}</span>
            </button>

            <a
              href={scholarship.applicationUrl || scholarship.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-initial"
            >
              <span>Visit Official Application</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
