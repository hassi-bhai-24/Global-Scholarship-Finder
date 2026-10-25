import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
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

  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    setLocalStatus(currentStatus);
    setLocalNotes(currentNotes);
  }, [currentStatus, currentNotes, scholarship?.id]);

  useEffect(() => {
    if (isOpen) {
      const el = tabRefs.current[activeTab];
      if (el) {
        el.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [activeTab, isOpen]);

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

  const handleTabClick = (tabId: 'overview' | 'eligibility' | 'application' | 'tracker') => {
    setActiveTab(tabId);
    const el = tabRefs.current[tabId];
    if (el) {
      el.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border-0 sm:border sm:border-slate-700/80 rounded-none sm:rounded-2xl shadow-2xl flex flex-col h-[100dvh] sm:h-auto sm:max-h-[92vh] overflow-hidden">
        
        {/* TOP HEADER: Compact 12-16px padding, full-width title container, chips row */}
        <div className="p-3 sm:p-4 border-b border-slate-800 bg-slate-950/95 flex-shrink-0">
          {/* Top Bar: Provider and Action Buttons */}
          <div className="flex items-center justify-between gap-2 mb-1.5 w-full">
            <span className="font-semibold text-emerald-400 text-xs sm:text-sm truncate min-w-0 pr-2">
              {scholarship.provider}
            </span>

            {/* Actions: Share, Bookmark, Close with >=44px touch targets */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handleShare}
                className="w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title={isCopied ? "Link copied!" : "Copy share link"}
                aria-label="Share scholarship"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => onToggleSave(scholarship, localStatus, localNotes)}
                className={`w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title={isSaved ? "Saved in Tracker" : "Save scholarship"}
                aria-label={isSaved ? "Saved" : "Save"}
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4" />}
              </button>

              <button
                onClick={onClose}
                className="w-11 h-11 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close modal"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Full-width Title Container (uses 100% width, clamp font size, at most 3 lines) */}
          <div className="w-full">
            <h2
              className="font-display font-black text-white tracking-tight break-words text-left"
              style={{
                fontSize: 'clamp(1.15rem, 5vw, 1.5rem)',
                lineHeight: 1.25,
                width: '100%'
              }}
            >
              {scholarship.name}
            </h2>
          </div>

          {/* Country / Degree / Deadline Chips wrapping row with smaller text */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2 text-[11px] sm:text-xs text-slate-300">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-800/80 text-slate-200 border border-slate-700/60 font-medium">
              {scholarship.destinationCountry}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-800/80 text-slate-200 border border-slate-700/60 capitalize font-medium">
              {scholarship.degreeLevels.join(" / ")}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-800/80 text-emerald-300 border border-slate-700/60 font-mono-data font-medium">
              Deadline: {scholarship.deadline}
            </span>
          </div>
        </div>

        {/* TABS BAR: Single horizontal scroll row with snap, no wrap, right edge fade */}
        <div className="relative border-b border-slate-800/90 bg-slate-950/70 flex-shrink-0">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth"
            style={{
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'eligibility', label: 'Academic Match' },
              { id: 'application', label: 'Requirements' },
              { id: 'tracker', label: 'Tracker Notes' }
            ].map((tab) => (
              <button
                key={tab.id}
                ref={(el) => { tabRefs.current[tab.id] = el; }}
                onClick={() => handleTabClick(tab.id as any)}
                style={{ scrollSnapAlign: 'center' }}
                className={`px-3 py-2 min-h-[44px] rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center justify-center ${
                  activeTab === tab.id
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right edge fade gradient indicating more tabs are scrollable */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-950 to-transparent"
          />
        </div>

        {/* CONTENT AREA: flex-1; min-height: 0; overflow-y: auto (ONLY scrolling region) */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3.5 sm:p-5 pb-12 sm:pb-8 space-y-5 text-left text-xs sm:text-sm">
          
          {/* TAB 1: OVERVIEW & BENEFITS */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Funding Breakdown Grid */}
              <div>
                <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-xs mb-3">
                  Comprehensive Funding Coverage
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {/* Tuition */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1 text-xs">
                      <GraduationCap className="w-4 h-4 shrink-0" />
                      <span>Tuition Coverage</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {scholarship.benefits.tuitionCoverage}
                    </p>
                  </div>

                  {/* Stipend */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-2 text-teal-400 font-semibold mb-1 text-xs">
                      <DollarSign className="w-4 h-4 shrink-0" />
                      <span>Monthly Living Stipend</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {scholarship.benefits.stipendMonthly || "Covered in full living grant package"}
                    </p>
                  </div>

                  {/* Flights & Travel */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-2 text-sky-400 font-semibold mb-1 text-xs">
                      <Plane className="w-4 h-4 shrink-0" />
                      <span>Airfare & Travel</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {scholarship.benefits.travelAllowance || "Standard departure allowance"}
                    </p>
                  </div>

                  {/* Accommodation */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1 text-xs">
                      <Home className="w-4 h-4 shrink-0" />
                      <span>Housing / Residence</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {scholarship.benefits.accommodation || "Assisted housing placement & subsidy"}
                    </p>
                  </div>

                  {/* Health Insurance */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-2 text-rose-400 font-semibold mb-1 text-xs">
                      <HeartPulse className="w-4 h-4 shrink-0" />
                      <span>Health & Accident Insurance</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {scholarship.benefits.insurance || "Comprehensive student insurance plan"}
                    </p>
                  </div>

                  {/* Additional Perks */}
                  {scholarship.benefits.otherPerks && scholarship.benefits.otherPerks.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="flex items-center gap-2 text-purple-400 font-semibold mb-1 text-xs">
                        <DollarSign className="w-4 h-4 shrink-0" />
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
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-200 truncate">
                      Primary Verification Authority: {scholarship.provider}
                    </div>
                    <div className="text-slate-400 text-[11px] truncate">
                      Checked: {scholarship.lastVerified} · Type: {scholarship.sourceType.replace(/_/g, ' ')}
                    </div>
                  </div>
                </div>

                <a
                  href={scholarship.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto min-h-[44px] px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                >
                  <span>Open Official Source</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: ACADEMIC MATCH & FAILED SUBJECTS EVALUATION */}
          {activeTab === 'eligibility' && (
            <div className="space-y-4">
              {match && (
                <div className="space-y-3">
                  {/* 1. WHY THIS MATCHES YOU */}
                  <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-900/60 space-y-2">
                    <h4 className="font-semibold text-emerald-400 text-xs uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
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
                    <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-900/60 space-y-2">
                      <h4 className="font-semibold text-rose-400 text-xs uppercase tracking-wider flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
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
                    <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-900/60 space-y-2">
                      <h4 className="font-semibold text-amber-400 text-xs uppercase tracking-wider flex items-center gap-2">
                        <Info className="w-4 h-4 text-amber-400 shrink-0" />
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
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
                  Official Failed-Subject & Backlogs Policy
                </h4>
                <div className="text-xs text-slate-300 leading-relaxed">
                  <p className="mb-2">
                    <strong className="text-white">Policy Stated: </strong>
                    {scholarship.failedSubjectRule.description}
                  </p>
                  {scholarship.failedSubjectRule.officialQuote && (
                    <blockquote className="p-2.5 bg-slate-900/80 border-l-2 border-emerald-500 rounded-r-lg text-slate-300 italic text-[11px]">
                      "{scholarship.failedSubjectRule.officialQuote}"
                    </blockquote>
                  )}
                </div>
              </div>

              {/* CGPA & Academic Threshold */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="font-semibold text-slate-200 uppercase tracking-wider">
                  Stated Academic Standing Cutoffs
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
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
            <div className="space-y-4">
              {/* Application Steps */}
              <div>
                <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-xs mb-2.5 flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Official Application Steps</span>
                </h4>
                <div className="space-y-2">
                  {scholarship.applicationSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 font-mono-data font-bold flex items-center justify-center shrink-0 text-[11px]">
                        {idx + 1}
                      </span>
                      <span className="text-slate-200 leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Documents Checklist */}
              <div>
                <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-xs mb-2.5 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Required Documents Checklist</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {scholarship.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages & Admission Prerequisites */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
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
            <div className="space-y-5">
              <div>
                <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-xs mb-2.5">
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
                      className={`min-h-[44px] py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center text-center ${
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

              {/* Personal Notes with in-flow full width save button */}
              <div className="space-y-2">
                <label className="block font-semibold text-slate-300 uppercase tracking-wider text-xs">
                  Personal Application Notes & Checklist
                </label>
                <textarea
                  rows={4}
                  value={localNotes}
                  onChange={(e) => setLocalNotes(e.target.value)}
                  placeholder="e.g. Need to request recommendation from Dr. Watson by Friday; drafting Statement of Purpose focusing on research goals..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-emerald-500 leading-relaxed resize-y"
                />
                
                {/* Save Notes & Status Button: Full width, position: static, margin-top: 12px, >=44px high */}
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={handleSaveNotes}
                    className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center shadow-md shadow-emerald-500/10"
                    style={{ position: 'static' }}
                  >
                    Save Notes & Status
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER: Sticky bottom bar, safe area padding, single-line portal link, 1fr 1.4fr buttons grid */}
        <div
          className="border-t border-slate-800 bg-slate-950/95 flex-shrink-0 px-3.5 pt-3"
          style={{
            paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))'
          }}
        >
          {/* Official Portal Row with single line and ellipsis */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2.5 min-w-0">
            <span className="shrink-0 text-slate-400">Official Portal:</span>
            <a
              href={scholarship.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline truncate min-w-0 flex-1 block py-1"
              title={scholarship.officialUrl}
            >
              {scholarship.officialUrl}
            </a>
          </div>

          {/* Two buttons side-by-side in grid: grid-template-columns: 1fr 1.4fr; gap: 10px */}
          <div
            className="grid w-full items-center"
            style={{
              gridTemplateColumns: '1fr 1.4fr',
              gap: '10px'
            }}
          >
            <button
              type="button"
              onClick={() => onToggleSave(scholarship, localStatus, localNotes)}
              className="w-full min-h-[48px] px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 border border-slate-700/60"
            >
              {isSaved ? (
                <BookmarkCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Bookmark className="w-4 h-4 shrink-0" />
              )}
              <span className="truncate">{isSaved ? 'In Tracker ✓' : 'Add to Tracker'}</span>
            </button>

            <a
              href={scholarship.applicationUrl || scholarship.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[48px] px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="truncate">Apply Now</span>
              <ExternalLink className="w-4 h-4 shrink-0" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
