import React, { useState, useEffect } from 'react';
import { Edit2, Sparkles, Filter, RefreshCw, SlidersHorizontal, Check, Building, BookOpen, GraduationCap } from 'lucide-react';
import { StudentProfile } from '../types/scholarship';
import { COUNTRIES } from '../data/countries';
import { searchUniversities } from '../data/universities';
import { ACADEMIC_SUBJECTS } from '../data/subjects';
import { STUDY_LEVEL_OPTIONS } from '../data/studyLevels';

interface EditableProfileBarProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  onOpenEnrichment: () => void;
  isEnriched: boolean;
}

export const EditableProfileBar: React.FC<EditableProfileBarProps> = ({
  profile,
  onUpdateProfile,
  onOpenEnrichment,
  isEnriched
}) => {
  const [isEditingInline, setIsEditingInline] = useState(false);
  const [country, setCountry] = useState(profile.country);
  const [university, setUniversity] = useState(profile.university);
  const [studyLevel, setStudyLevel] = useState(profile.studyLevel || "Master's");
  const [field, setField] = useState(profile.field || 'Computer Science');
  const [cgpa, setCgpa] = useState(String(profile.cgpa));
  const [scale, setScale] = useState(profile.cgpaScale);
  const [failed, setFailed] = useState(String(profile.failedSubjects));

  // Sync internal state whenever profile changes
  useEffect(() => {
    setCountry(profile.country);
    setUniversity(profile.university);
    setStudyLevel(profile.studyLevel || "Master's");
    setField(profile.field || 'Computer Science');
    setCgpa(String(profile.cgpa));
    setScale(profile.cgpaScale);
    setFailed(String(profile.failedSubjects));
  }, [profile]);

  const currentCountryObj = COUNTRIES.find(c => c.name === profile.country);

  const handleSaveInline = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedCgpa = parseFloat(cgpa);
    const parsedFailed = parseInt(failed, 10);

    onUpdateProfile({
      ...profile,
      country,
      university: university.trim() || profile.university,
      studyLevel: studyLevel.trim() || profile.studyLevel,
      field: field.trim() || undefined,
      cgpa: isNaN(parsedCgpa) ? profile.cgpa : parsedCgpa,
      cgpaScale: scale,
      failedSubjects: isNaN(parsedFailed) ? profile.failedSubjects : parsedFailed
    });
    setIsEditingInline(false);
  };

  return (
    <div className="w-full bg-slate-900/95 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl backdrop-blur-md">
      {!isEditingInline ? (
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Profile Overview */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <span className="text-slate-400 font-semibold uppercase text-xs tracking-wider">Active Profile:</span>
            
            {/* Country Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
              <span className="text-base">{currentCountryObj?.flag || '🌐'}</span>
              <span className="font-semibold">{profile.country}</span>
            </div>

            {/* University Badge (Only if provided / not pre-uni without uni) */}
            {profile.university && profile.university !== 'No university experience' && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 max-w-[280px] truncate" title={profile.university}>
                <span className="text-slate-400 text-xs">Uni:</span>
                <span className="font-semibold truncate">{profile.university}</span>
              </div>
            )}

            {/* Study Level Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-emerald-850 text-emerald-300">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-slate-400 text-xs">Level:</span>
              <span className="font-semibold text-white">{profile.studyLevel || "Undergraduate"}</span>
            </div>

            {/* Education Status Badge (if available) */}
            {profile.educationStatus && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 max-w-[260px] truncate" title={profile.educationStatus}>
                <span className="text-slate-400 text-xs">Status:</span>
                <span className="font-medium truncate">{profile.educationStatus}</span>
              </div>
            )}

            {/* Major / Field of Study Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-emerald-900/50 text-slate-200">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400 text-xs">Major:</span>
              <span className="font-semibold text-emerald-300">
                {profile.field || 'All Disciplines'}
              </span>
            </div>

            {/* Academic Result Badge: Board Score or CGPA */}
            {profile.isPreUniversity && profile.preUniResult ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
                <span className="text-slate-400 text-xs">Board:</span>
                <span className="font-semibold font-mono-data text-emerald-400">
                  {profile.preUniResult.percentage 
                    ? `${profile.preUniResult.percentage}%` 
                    : profile.preUniResult.grades 
                    ? profile.preUniResult.grades 
                    : profile.preUniResult.ibPoints 
                    ? `${profile.preUniResult.ibPoints}/45` 
                    : `${profile.cgpa} (GPA)`}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
                <span className="text-slate-400 text-xs">CGPA:</span>
                <span className="font-semibold font-mono-data text-emerald-400">
                  {profile.cgpa} ({profile.cgpaScale})
                </span>
              </div>
            )}

            {/* Failed Subjects / Compartment Badge */}
            {profile.isPreUniversity ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
                <span className="text-slate-400 text-xs">Record:</span>
                <span className={`font-semibold ${profile.preUniResult?.hasFailedPapers ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {profile.preUniResult?.hasFailedPapers ? '1 compartment' : 'Clean record'}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
                <span className="text-slate-400 text-xs">Backlogs:</span>
                <span className={`font-semibold font-mono-data ${profile.failedSubjects > 0 ? 'text-amber-400' : 'text-slate-300'}`}>
                  {profile.failedSubjects} failed
                </span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 w-full lg:w-auto justify-end">
            <button
              onClick={() => setIsEditingInline(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={onOpenEnrichment}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isEnriched
                  ? 'bg-emerald-950/80 border border-emerald-700 text-emerald-300'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{isEnriched ? 'Enriched' : 'Add Factors'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Inline Quick Edit Form */
        <form onSubmit={handleSaveInline} className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Modify Student Academic Details
            </span>
            <button
              type="button"
              onClick={() => setIsEditingInline(false)}
              className="text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {COUNTRIES.map(c => (
                  <option key={c.code} value={c.name}>{c.flag} {c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">University / Institute</label>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="e.g. The Islamia University of Bahawalpur"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>Study Level</span>
                <span className="text-[10px] text-emerald-400 lowercase">mandatory</span>
              </label>
              <select
                value={studyLevel}
                onChange={(e) => setStudyLevel(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                required
              >
                {STUDY_LEVEL_OPTIONS.map(lvl => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Field / Major (120+)</label>
              <select
                value={field}
                onChange={(e) => setField(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="">All Disciplines (General)</option>
                {ACADEMIC_SUBJECTS.map(s => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">CGPA &amp; Scale</label>
              <div className="flex rounded-xl bg-slate-950 border border-slate-700 overflow-hidden">
                <input
                  type="number"
                  step="0.01"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  className="w-full px-2.5 py-2.5 bg-transparent text-xs text-slate-200 focus:outline-none font-mono-data"
                />
                <select
                  value={scale}
                  onChange={(e) => setScale(e.target.value as any)}
                  className="px-2 py-2.5 bg-slate-900 border-l border-slate-700 text-[11px] text-slate-300 focus:outline-none cursor-pointer"
                >
                  <option value="4.0">/ 4.0</option>
                  <option value="5.0">/ 5.0</option>
                  <option value="10.0">/ 10.0</option>
                  <option value="100%">%</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Failed Backlogs</label>
              <input
                type="number"
                min="0"
                value={failed}
                onChange={(e) => setFailed(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono-data"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditingInline(false)}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Update &amp; Re-evaluate Now</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
