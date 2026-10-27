import React from 'react';
import { Bookmark, BookmarkCheck, Clock, GraduationCap, ChevronRight } from 'lucide-react';
import { MatchCategory, MatchResult, Scholarship } from '../types/scholarship';
import { getScholarshipStudyLevels } from '../data/studyLevels';

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
  const { scholarship, category, confidenceScore } = match;

  const cardLevels = scholarship.levels && scholarship.levels.length > 0
    ? scholarship.levels
    : getScholarshipStudyLevels(scholarship);

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
          label: 'Closed',
          color: 'text-slate-400',
          bg: 'bg-slate-900/40',
          border: 'border-slate-800',
          indicator: 'bg-slate-500'
        };
    }
  };

  const theme = getCategoryTheme(category);

  const formatFundingType = (t: string) => {
    switch (t) {
      case 'fully_funded':
        return 'Fully Funded';
      case 'tuition_waiver':
        return 'Tuition Waiver';
      case 'partial_funding':
        return 'Partial Funding';
      case 'stipend_only':
        return 'Living Stipend';
      default:
        return 'Funded';
    }
  };

  const formatDeadline = (s: Scholarship) => {
    if (s.deadlineStatus === 'closed') return 'Closed';
    if (s.daysRemaining !== undefined && s.daysRemaining <= 14) {
      return `${s.daysRemaining} days left`;
    }
    return s.deadline;
  };

  return (
    <div className={`relative bg-slate-900/90 border ${theme.border} rounded-2xl p-5 sm:p-6 transition-all hover:border-slate-600 hover:shadow-xl backdrop-blur-sm flex flex-col justify-between group text-left`}>
      <div>
        {/* Top: Source Badge & Bookmark */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Source Badge */}
            <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 font-semibold text-slate-300">
              {scholarship.provider}
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400 font-medium">{scholarship.destinationCountry}</span>
          </div>

          <button
            onClick={() => onToggleSave(scholarship)}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              isSaved
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title={isSaved ? "Saved" : "Save"}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Study Level Chips */}
        {cardLevels.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
            {cardLevels.map((lvl) => (
              <span
                key={lvl}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800/60"
              >
                <GraduationCap className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{lvl}</span>
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3
          onClick={() => onOpenDetails(scholarship, match)}
          className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-emerald-300 transition-colors cursor-pointer mb-3 leading-snug"
        >
          {scholarship.name}
        </h3>

        {/* Status + Funding Row */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs mb-5">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${theme.bg} ${theme.color} border ${theme.border} font-medium`}>
            <span className={`w-1.5 h-1.5 rounded-full ${theme.indicator}`} />
            <span>{theme.label}</span>
          </div>

          <span className="text-emerald-400 font-semibold px-2.5 py-1 rounded-md bg-emerald-950/50 border border-emerald-900/60">
            {formatFundingType(scholarship.fundingType)}
          </span>
        </div>
      </div>

      {/* Footer: Deadline & ONE Action Button */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span className={scholarship.daysRemaining !== undefined && scholarship.daysRemaining <= 14 ? 'text-amber-400 font-medium' : ''}>
            {formatDeadline(scholarship)}
          </span>
        </div>

        {/* ONE Action Button */}
        <button
          onClick={() => onOpenDetails(scholarship, match)}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>View Details</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>
    </div>
  );
};
