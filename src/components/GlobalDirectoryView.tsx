import React, { useState } from 'react';
import { Search, Bookmark, BookmarkCheck, Clock, ChevronRight } from 'lucide-react';
import { Scholarship } from '../types/scholarship';
import { VERIFIED_SCHOLARSHIPS } from '../data/scholarships';
import { evaluateSubjectMatch } from '../services/matchingEngine';

interface GlobalDirectoryViewProps {
  onOpenDetails: (scholarship: Scholarship) => void;
  onToggleSave: (scholarship: Scholarship) => void;
  isSaved: (id: string) => boolean;
}

export const GlobalDirectoryView: React.FC<GlobalDirectoryViewProps> = ({
  onOpenDetails,
  onToggleSave,
  isSaved
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [degreeFilter, setDegreeFilter] = useState('all');
  const [fundingFilter, setFundingFilter] = useState('all');

  const filteredScholarships = VERIFIED_SCHOLARSHIPS.filter(s => {
    if (subjectFilter !== 'all') {
      const matchRes = evaluateSubjectMatch(s, subjectFilter);
      if (matchRes.status === 'restricted_field') return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesText = 
        s.name.toLowerCase().includes(q) ||
        s.provider.toLowerCase().includes(q) ||
        s.destinationCountry.toLowerCase().includes(q) ||
        s.fields.some(f => f.toLowerCase().includes(q));
      if (!matchesText) return false;
    }

    if (degreeFilter !== 'all') {
      if (!s.degreeLevels.includes(degreeFilter as any)) return false;
    }

    if (fundingFilter !== 'all') {
      if (s.fundingType !== fundingFilter) return false;
    }

    return true;
  });

  // Ensure unique IDs to prevent duplicate React keys
  const seenIds = new Set<string>();
  const uniqueScholarships = filteredScholarships.filter(s => {
    if (!s.id || seenIds.has(s.id)) return false;
    seenIds.add(s.id);
    return true;
  });

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-left">
      {/* Header with zero paragraph clutter */}
      <div className="mb-6">
        <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
          Global Directory
        </h2>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-6 shadow-xl space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scholarships..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-emerald-500 placeholder:text-slate-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-medium">Study Level</label>
            <select
              value={degreeFilter}
              onChange={(e) => setDegreeFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all">All Levels</option>
              <option value="bachelors">Bachelor's</option>
              <option value="masters">Master's</option>
              <option value="phd">PhD / Doctorate</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Funding</label>
            <select
              value={fundingFilter}
              onChange={(e) => setFundingFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all">All Funding</option>
              <option value="fully_funded">Fully Funded</option>
              <option value="tuition_waiver">Tuition Waiver</option>
              <option value="partial_funding">Partial Funding</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs text-slate-400 mb-4 px-1">
        <span className="text-white font-bold font-mono-data">{uniqueScholarships.length}</span> scholarships found
      </div>

      {/* Scholarships Grid: title, source badge, deadline, funding and one action button */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {uniqueScholarships.map(s => {
          const saved = isSaved(s.id);
          return (
            <div
              key={s.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">{s.provider}</span>
                    <span className="mx-1.5 text-slate-700">·</span>
                    <span>{s.destinationCountry}</span>
                  </div>
                  <button
                    onClick={() => onToggleSave(s)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      saved
                        ? 'bg-emerald-950 text-emerald-400'
                        : 'text-slate-500 hover:text-slate-200'
                    }`}
                  >
                    {saved ? <BookmarkCheck className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                <h3
                  onClick={() => onOpenDetails(s)}
                  className="font-display font-bold text-base text-white group-hover:text-emerald-300 transition-colors cursor-pointer mb-3"
                >
                  {s.name}
                </h3>

                <div className="flex items-center gap-2 text-xs mb-3">
                  <span className="text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-900/50">
                    {formatFundingType(s.fundingType)}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{s.deadline}</span>
                </div>

                <button
                  onClick={() => onOpenDetails(s)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
