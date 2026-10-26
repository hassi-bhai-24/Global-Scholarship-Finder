import React, { useState, useEffect } from 'react';
import { X, Check, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { STUDY_LEVEL_OPTIONS, StudyLevelOption } from '../data/studyLevels';

interface StudyLevelFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLevels: string[];
  onApply: (levels: string[]) => void;
}

export const StudyLevelFilterModal: React.FC<StudyLevelFilterModalProps> = ({
  isOpen,
  onClose,
  selectedLevels,
  onApply
}) => {
  const [tempSelected, setTempSelected] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      setTempSelected(selectedLevels);
    }
  }, [isOpen, selectedLevels]);

  if (!isOpen) return null;

  const isAllSelected = tempSelected.length === 0;

  const handleSelectAll = () => {
    setTempSelected([]);
  };

  const handleToggleLevel = (level: StudyLevelOption) => {
    if (tempSelected.includes(level)) {
      const updated = tempSelected.filter(l => l !== level);
      setTempSelected(updated);
    } else {
      setTempSelected([...tempSelected, level]);
    }
  };

  const handleClear = () => {
    setTempSelected([]);
  };

  const handleApply = () => {
    onApply(tempSelected);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-slate-950/80 backdrop-blur-md animate-fade-in p-0 md:p-4">
      {/* Backdrop click to close */}
      <div 
        className="absolute inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      {/* Card: Bottom Sheet on Mobile, Dialog on Desktop */}
      <div 
        className="relative w-full md:max-w-xl bg-slate-900 border-t md:border border-slate-800 rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col max-h-[85vh] md:max-h-[80vh] overflow-hidden z-10"
        style={{ boxSizing: 'border-box' }}
      >
        {/* Mobile Grab Handle */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-slate-700/80" />
        </div>

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between shrink-0 bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white">
                Filter by Study Level
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400">
                Choose one or more target education degrees
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Chips Region */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Degree &amp; Program Options
            </span>
            <span className="text-xs text-emerald-400 font-mono-data">
              {tempSelected.length === 0 ? 'All Levels Active' : `${tempSelected.length} Selected`}
            </span>
          </div>

          {/* "All Levels" Chip */}
          <button
            type="button"
            onClick={handleSelectAll}
            className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between text-left ${
              isAllSelected
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 shadow-sm'
                : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <span>All Levels (Clear Filter)</span>
            {isAllSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
          </button>

          <div className="h-px bg-slate-800 my-2" />

          {/* Multi-Select Level Chips */}
          <div className="space-y-2">
            {STUDY_LEVEL_OPTIONS.map((level) => {
              const isSelected = tempSelected.includes(level);
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => handleToggleLevel(level)}
                  className={`w-full min-h-[46px] px-4 py-2.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between text-left ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 font-semibold shadow-sm'
                      : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 border-slate-800/90 hover:border-slate-700'
                  }`}
                >
                  <span className="leading-snug">{level}</span>
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
        </div>

        {/* Fixed Sticky Footer with Safe Area Padding */}
        <div 
          className="border-t border-slate-800 bg-slate-950/95 shrink-0 px-4 pt-3"
          style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}
        >
          <div className="grid grid-cols-2 gap-3 w-full">
            <button
              type="button"
              onClick={handleClear}
              className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700/60"
            >
              <RotateCcw className="w-4 h-4 shrink-0 text-slate-400" />
              <span>Clear All</span>
            </button>

            <button
              type="button"
              onClick={handleApply}
              className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Apply Filters</span>
              {tempSelected.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-slate-950 text-emerald-400 text-xs font-mono-data font-bold flex items-center justify-center shrink-0 ml-1">
                  {tempSelected.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
