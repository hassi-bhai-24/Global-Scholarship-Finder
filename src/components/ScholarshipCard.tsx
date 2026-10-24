import React, { useState } from 'react';
import { ExternalLink, Bookmark, CheckCircle2, AlertTriangle, Clock, ShieldCheck, ChevronRight, BookmarkCheck, Info } from 'lucide-react';
import { MatchCategory, MatchResult, Scholarship } from '../types/scholarship';

interface ScholarshipCardProps {
  match: MatchResult;
  onOpenDetails: (scholarship: Scholarship, match: MatchResult) => void;
  isSaved: boolean;
  onToggleSave: (scholarship: Scholarship) => void;
}

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({
  match,
  onOpenDetails,
  isSaved,
  onToggleSave
}) => {
  const { scholarship, category, confidenceScore, whyYouMatch, whatCouldDisqualify, whatToConfirm, nextSteps } = match;
  const [showExplanationSnippet, setShowExplanationSnippet] = useState(false);

  // Category visual mapping
  const getCategoryTheme = (cat: MatchCategory) => {
    switch (cat) {
      case 'STRONG_MATCH':
        return {
          label: 'Strong Match',
          color: 'text-emerald-400',
          bg: 'bg-emerald-950/40',
          border: 'border-emerald-800/80',
          indicator: 'bg-emerald-400'
        };
      case 'LIKELY_MATCH':
        return {
          label: 'Likely Match',
          color: 'text-teal-400',
          bg: 'bg-teal-950/40',
          border: 'border-teal-800/80',
          indicator: 'bg-teal-400'
        };
      case 'POSSIBLE_MATCH':
        return {
          label: 'Possible Match',
          color: 'text-amber-400',
          bg: 'bg-amber-950/40',
          border: 'border-amber-800/80',
          indicator: 'bg-amber-400'
        };
      case 'LOW_MATCH':
        return {
          label: 'Low Match',
          color: 'text-rose-400',
          bg: 'bg-rose-950/30',
          border: 'border-rose-900/60',
          indicator: 'bg-rose-400'
        };
      case 'CLOSED_EXPIRED':
        return {
          label: 'Window Closed',
          color: 'text-slate-400',
          bg: 'bg-slate-900/40',
          border: 'border-slate-800',
          indicator: 'bg-slate-500'
        };
    }
  };

  const theme = getCategoryTheme(category);

  // Funding Type Label
  const formatFundingType = (t: string) => {
    switch (t) {
      case 'fully_funded':
        return 'Fully Funded';
      case 'tuition_waiver':
        return '100% Tuition Waiver';
      case 'partial_funding':
        return 'Partial Funding';
      case 'stipend_only':
        return 'Monthly Living Stipend';
      default:
        return 'Student Funding';
    }
  };

  // Deadline styling
  const formatDeadline = (s: Scholarship) => {
    if (s.deadlineStatus === 'closed') return 'Application Closed';
    if (s.daysRemaining !== undefined && s.daysRemaining <= 14) {
      return `Closing Soon (${s.daysRemaining} days left)`;
    }
    return `Deadline: ${s.deadline}`;
  };

  return (
    <div className={`relative bg-slate-900/90 border ${theme.border} rounded-2xl p-5 sm:p-6 transition-all hover:border-slate-600 hover:shadow-xl backdrop-blur-sm flex flex-col justify-between group`}>
      {/* Top Bar: Provider + Category + Confidence */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Metadata line without static pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">{scholarship.provider}</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>{scholarship.destinationCountry}</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="capitalize">{scholarship.degreeLevels.join(" / ")}</span>
          </div>

          {/* Save bookmark button */}
          <button
            onClick={() => onToggleSave(scholarship)}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              isSaved
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title={isSaved ? "Saved in Tracker" : "Save to Tracker"}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Title */}
        <h3
          onClick={() => onOpenDetails(scholarship, match)}
          className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-emerald-300 transition-colors cursor-pointer mb-2 leading-snug"
        >
          {scholarship.name}
        </h3>

        {/* Status indicator row */}
        <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${theme.bg} ${theme.color} border ${theme.border} font-medium`}>
            <span className={`w-1.5 h-1.5 rounded-full ${theme.indicator}`} />
            <span>{theme.label}</span>
          </div>

          <div className="text-slate-400 font-mono-data">
            Match Confidence: <span className="font-bold text-slate-200">{confidenceScore}%</span>
          </div>

          <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>

          <div className="text-emerald-400 font-medium">
            {formatFundingType(scholarship.fundingType)}
          </div>
        </div>

        {/* Benefits snippet */}
        <p className="text-xs text-slate-300 mb-4 line-clamp-2 leading-relaxed">
          {scholarship.benefits.tuitionCoverage}
          {scholarship.benefits.stipendMonthly && ` • ${scholarship.benefits.stipendMonthly}`}
          {scholarship.benefits.travelAllowance && ` • ${scholarship.benefits.travelAllowance}`}
        </p>

        {/* The 3 Core Academic Match Answers - Highlights */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 space-y-2 mb-4 text-xs">
          {/* 1. Why you match */}
          {whyYouMatch.length > 0 && (
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-slate-300">
                <span className="text-emerald-400 font-semibold">Why you match: </span>
                <span>{whyYouMatch[0]}</span>
              </div>
            </div>
          )}

          {/* 2. What could disqualify or needs confirmation */}
          {whatCouldDisqualify.length > 0 ? (
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
              <div className="text-slate-300">
                <span className="text-rose-400 font-semibold">Watch out: </span>
                <span>{whatCouldDisqualify[0]}</span>
              </div>
            </div>
          ) : whatToConfirm.length > 0 ? (
            <div className="flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-slate-300">
                <span className="text-amber-400 font-semibold">To confirm: </span>
                <span>{whatToConfirm[0]}</span>
              </div>
            </div>
          ) : null}

          {/* Academic Criteria & Backlogs rule */}
          <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
            <div>
              Min CGPA: <span className="font-mono-data text-slate-200">{scholarship.minimumCGPA.toFixed(1)}/4.0</span>
            </div>
            <div>
              Backlog rule: <span className="text-slate-200 font-medium">
                {scholarship.failedSubjectRule.policy === 'strict_zero_fails'
                  ? 'Strict zero backlogs'
                  : scholarship.failedSubjectRule.policy === 'allowed_if_cgpa_met'
                  ? 'Allowed if CGPA met'
                  : 'Must be cleared by departure'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Deadline + Verification + CTA buttons */}
      <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className={scholarship.daysRemaining !== undefined && scholarship.daysRemaining <= 14 ? 'text-amber-400 font-semibold' : ''}>
              {formatDeadline(scholarship)}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>Last verified: {scholarship.lastVerified}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenDetails(scholarship, match)}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>View Analysis</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <a
            href={scholarship.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold transition-colors flex items-center justify-center gap-1.5 border border-emerald-500/20"
            title="Open official provider application portal"
          >
            <span className="hidden sm:inline">Official</span> Portal
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
