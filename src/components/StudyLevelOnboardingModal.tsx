import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { STUDY_LEVEL_OPTIONS, StudyLevelOption } from '../data/studyLevels';

interface StudyLevelOnboardingModalProps {
  isOpen: boolean;
  onComplete: (selectedLevels: string[]) => void;
  onSkip: () => void;
}

export const StudyLevelOnboardingModal: React.FC<StudyLevelOnboardingModalProps> = ({
  isOpen,
  onComplete,
  onSkip
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleToggle = (level: StudyLevelOption) => {
    if (selected.includes(level)) {
      setSelected(selected.filter(l => l !== level));
    } else {
      setSelected([...selected, level]);
    }
  };

  const handleContinue = () => {
    onComplete(selected);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full sm:max-w-xl bg-slate-900 border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        style={{ boxSizing: 'border-box' }}
      >
        {/* Mobile handle */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-slate-700/80" />
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 pb-2 shrink-0 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-400 font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Personalized Match</span>
          </div>

          <h2 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight mb-2">
            What are you looking for?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Select your target study level so we can instantly highlight scholarships you're eligible for. You can choose more than one.
          </p>
        </div>

        {/* Level Chips Grid */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-6 py-3 space-y-2">
          {STUDY_LEVEL_OPTIONS.map((lvl) => {
            const isSelected = selected.includes(lvl);
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => handleToggle(lvl)}
                className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between text-left ${
                  isSelected
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 font-semibold shadow-sm'
                    : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                <span className="leading-snug">{lvl}</span>
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ml-3 transition-colors ${
                    isSelected
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                      : 'border-slate-700 bg-slate-900'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div 
          className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/95 shrink-0 flex items-center justify-between gap-3"
          style={{ paddingBottom: 'calc(14px + env(safe-area-inset-bottom, 0px))' }}
        >
          <button
            type="button"
            onClick={onSkip}
            className="min-h-[48px] px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            Skip for now
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="min-h-[48px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs sm:text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
          >
            <span>{selected.length > 0 ? `Show ${selected.length} Selected` : 'Show All Scholarships'}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
