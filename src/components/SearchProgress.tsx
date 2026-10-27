import React from 'react';
import { CheckCircle2, Loader2, RefreshCw } from 'lucide-react';
import { StudentProfile } from '../types/scholarship';

interface SearchProgressProps {
  currentStage: number; // 0 to 4
  onComplete?: () => void;
  profile?: StudentProfile;
  isRefreshing?: boolean;
  summaryData?: {
    totalDiscovered: number;
    strongMatches: number;
    likelyMatches: number;
    openOpportunities: number;
  };
}

const STAGES = [
  "Refreshing Global Feed",
  "Searching Official Portals",
  "Checking Study Levels",
  "Evaluating Academic Criteria",
  "Ranking Verified Matches"
];

export const SearchProgress: React.FC<SearchProgressProps> = ({
  currentStage,
  profile
}) => {
  return (
    <div className="max-w-xl mx-auto my-10 p-6 sm:p-7 bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-md text-left">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
          <h3 className="font-display font-bold text-lg text-white">
            Searching Scholarships
          </h3>
        </div>
        <div className="text-xs font-mono-data text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full shrink-0">
          {Math.min(currentStage + 1, STAGES.length)} / {STAGES.length}
        </div>
      </div>

      {profile && (
        <div className="mb-4 text-xs text-slate-400 truncate">
          <span>{profile.country}</span>
          <span className="mx-1.5">·</span>
          <span className="text-emerald-400">{profile.studyLevel || "All Levels"}</span>
          {profile.field && (
            <>
              <span className="mx-1.5">·</span>
              <span>{profile.field}</span>
            </>
          )}
        </div>
      )}

      {/* Stage List */}
      <div className="space-y-2.5">
        {STAGES.map((title, idx) => {
          const isDone = idx < currentStage;
          const isCurrent = idx === currentStage;
          const isPending = idx > currentStage;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                isCurrent
                  ? 'bg-slate-800/80 border border-slate-700'
                  : isDone
                  ? 'bg-slate-950/40 text-slate-400'
                  : 'opacity-35 text-slate-500'
              }`}
            >
              <div className="shrink-0">
                {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {isCurrent && <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />}
                {isPending && <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-600 font-mono-data">{idx + 1}</div>}
              </div>

              <span className="text-xs font-semibold text-slate-200">
                {title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
