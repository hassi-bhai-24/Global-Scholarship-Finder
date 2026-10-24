import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Sparkles, Database, Search, ShieldCheck } from 'lucide-react';

interface SearchProgressProps {
  currentStage: number; // 0 to 4
  onComplete?: () => void;
  summaryData?: {
    totalDiscovered: number;
    strongMatches: number;
    likelyMatches: number;
    openOpportunities: number;
  };
}

const STAGES = [
  {
    title: "Normalizing Profile & GPA Scale",
    desc: "Converting cumulative GPA to standard equivalent and indexing failed subject count."
  },
  {
    title: "Querying Worldwide Official Scholarship Portals",
    desc: "Connecting to official government commissions, ministerial funds, and university schemes."
  },
  {
    title: "Executing Academic Eligibility Matching Engine",
    desc: "Evaluating bilateral nationality accords, CGPA thresholds, and backlogs policy."
  },
  {
    title: "Deduplicating Records & Verifying Source Authority",
    desc: "Discarding secondary aggregator copies; prioritizing primary host institutions."
  },
  {
    title: "Ranking Opportunities by Match Confidence",
    desc: "Synthesizing 'Why You Match', possible disqualifiers, and application next steps."
  }
];

export const SearchProgress: React.FC<SearchProgressProps> = ({
  currentStage,
  summaryData
}) => {
  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-md text-left">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <h3 className="font-display font-bold text-xl text-white">
              Discovering Global Opportunities
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Grounded against verified international education portals
          </p>
        </div>
        <div className="text-xs font-mono-data text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-full">
          Stage {Math.min(currentStage + 1, STAGES.length)} / {STAGES.length}
        </div>
      </div>

      {/* Progressive Stage List */}
      <div className="space-y-4">
        {STAGES.map((stage, idx) => {
          const isDone = idx < currentStage;
          const isCurrent = idx === currentStage;
          const isPending = idx > currentStage;

          return (
            <div
              key={idx}
              className={`flex items-start gap-3.5 p-3 rounded-xl transition-all ${
                isCurrent
                  ? 'bg-slate-800/80 border border-slate-700'
                  : isDone
                  ? 'bg-slate-950/40 text-slate-400'
                  : 'opacity-40 text-slate-500'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                {isCurrent && <Loader2 className="w-5 h-5 text-emerald-400 animate-spin" />}
                {isPending && <div className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-600 font-mono-data">{idx + 1}</div>}
              </div>

              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                  <span>{stage.title}</span>
                  {isCurrent && (
                    <span className="text-[10px] font-mono-data uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                      Processing
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Summary when reaching final stage */}
      {summaryData && (
        <div className="mt-6 pt-5 border-t border-slate-800 text-center animate-fade-in">
          <div className="text-xs text-slate-400 mb-2">Live Search Discovery Stats:</div>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="font-display font-black text-2xl text-white font-mono-data">
                {summaryData.totalDiscovered}
              </div>
              <div className="text-[11px] text-slate-400">Total Analyzed</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-emerald-900/50">
              <div className="font-display font-black text-2xl text-emerald-400 font-mono-data">
                {summaryData.strongMatches + summaryData.likelyMatches}
              </div>
              <div className="text-[11px] text-emerald-400/90 font-medium">Eligible Matches</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="font-display font-black text-2xl text-teal-400 font-mono-data">
                {summaryData.openOpportunities}
              </div>
              <div className="text-[11px] text-slate-400">Currently Open</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
