import React, { useState } from 'react';
import { X, Sparkles, Check, HelpCircle } from 'lucide-react';
import { StudentProfile } from '../types/scholarship';

interface OptionalEnrichmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSave: (updatedProfile: StudentProfile) => void;
}

export const OptionalEnrichmentModal: React.FC<OptionalEnrichmentModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave
}) => {
  const [degreeLevel, setDegreeLevel] = useState<any>(profile.degreeLevel || 'any');
  const [field, setField] = useState(profile.field || '');
  const [targetCountries, setTargetCountries] = useState<string[]>(profile.targetCountries || []);
  const [englishTest, setEnglishTest] = useState<any>(profile.englishTest || 'None / In Progress');
  const [englishScore, setEnglishScore] = useState(profile.englishScore || '');
  const [workExperienceYears, setWorkExperienceYears] = useState<string>(
    profile.workExperienceYears !== undefined ? String(profile.workExperienceYears) : '0'
  );
  const [financialNeed, setFinancialNeed] = useState<any>(profile.financialNeed || 'moderate');

  if (!isOpen) return null;

  const handleCountryToggle = (c: string) => {
    if (targetCountries.includes(c)) {
      setTargetCountries(targetCountries.filter(item => item !== c));
    } else {
      setTargetCountries([...targetCountries, c]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedWork = parseInt(workExperienceYears, 10);

    onSave({
      ...profile,
      degreeLevel: degreeLevel === 'any' ? undefined : degreeLevel,
      field: field.trim() || undefined,
      targetCountries: targetCountries.length > 0 ? targetCountries : undefined,
      englishTest,
      englishScore: englishScore.trim() || undefined,
      workExperienceYears: isNaN(parsedWork) ? 0 : parsedWork,
      financialNeed
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Optional Profile Enrichment
              </h3>
              <p className="text-xs text-slate-400">
                Adding these details unlocks higher confidence matches. You can skip any field.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-left text-xs">
          {/* Target Degree Level */}
          <div>
            <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Intended Degree Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'any', label: 'All Levels' },
                { id: 'bachelors', label: "Bachelor's" },
                { id: 'masters', label: "Master's / Postgrad" },
                { id: 'phd', label: 'PhD / Doctorate' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setDegreeLevel(opt.id)}
                  className={`py-2 px-3 rounded-xl border text-center transition-all ${
                    degreeLevel === opt.id
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400 font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Academic Field / Major */}
          <div>
            <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Target Field of Study / Major
            </label>
            <input
              type="text"
              value={field}
              onChange={(e) => setField(e.target.value)}
              placeholder="e.g. Computer Science, Public Policy, Biomedical Engineering, Business"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Target Destinations */}
          <div>
            <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Preferred Study Destinations (Multiple choice)
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                'United States',
                'United Kingdom',
                'Germany',
                'Canada',
                'Australia',
                'Japan',
                'South Korea',
                'Switzerland',
                'France',
                'Sweden',
                'Singapore',
                'Italy'
              ].map(dst => {
                const isSelected = targetCountries.includes(dst);
                return (
                  <button
                    key={dst}
                    type="button"
                    onClick={() => handleCountryToggle(dst)}
                    className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
                      isSelected
                        ? 'bg-teal-950/70 border-teal-500 text-teal-300 font-medium'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {dst} {isSelected && '✓'}
                  </button>
                );
              })}
            </div>
          </div>

          {/* English Proficiency & Work Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-2">
                English Test Status
              </label>
              <select
                value={englishTest}
                onChange={(e) => setEnglishTest(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none"
              >
                <option value="None / In Progress">None / In Progress</option>
                <option value="IELTS">IELTS</option>
                <option value="TOEFL iBT">TOEFL iBT</option>
                <option value="PTE">PTE Academic</option>
                <option value="Duolingo">Duolingo English Test</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Full-Time Work Experience (Years)
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={workExperienceYears}
                onChange={(e) => setWorkExperienceYears(e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Footer Controls */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white px-3 py-2"
            >
              Skip for now
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply & Refine Matches</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
