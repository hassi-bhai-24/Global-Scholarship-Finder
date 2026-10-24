import React, { useState } from 'react';
import { Search, Globe, Filter, ExternalLink, ShieldCheck, ChevronRight, Bookmark } from 'lucide-react';
import { Scholarship } from '../types/scholarship';
import { VERIFIED_SCHOLARSHIPS } from '../data/scholarships';

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
  const [degreeFilter, setDegreeFilter] = useState('all');
  const [destinationFilter, setDestinationFilter] = useState('all');
  const [fundingFilter, setFundingFilter] = useState('all');

  const filteredScholarships = VERIFIED_SCHOLARSHIPS.filter(s => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesText = 
        s.name.toLowerCase().includes(q) ||
        s.provider.toLowerCase().includes(q) ||
        s.destinationCountry.toLowerCase().includes(q) ||
        s.fields.some(f => f.toLowerCase().includes(q));
      if (!matchesText) return false;
    }

    // Degree level
    if (degreeFilter !== 'all') {
      if (!s.degreeLevels.includes(degreeFilter as any)) return false;
    }

    // Destination
    if (destinationFilter !== 'all') {
      if (s.destinationCountry.toLowerCase() !== destinationFilter.toLowerCase()) return false;
    }

    // Funding type
    if (fundingFilter !== 'all') {
      if (s.fundingType !== fundingFilter) return false;
    }

    return true;
  });

  // Extract unique destinations
  const destinations = Array.from(new Set(VERIFIED_SCHOLARSHIPS.map(s => s.destinationCountry))).sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-left">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
          Worldwide Verified Scholarship Directory
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Explore all indexed international government and university scholarship programmes. All records traceable to primary portals.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl space-y-4">
        {/* Main Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by scholarship title, provider (e.g. DAAD, Chevening), country, or study field..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-sm focus:outline-none focus:border-emerald-500 placeholder:text-slate-500"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Destination Country</label>
            <select
              value={destinationFilter}
              onChange={(e) => setDestinationFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none"
            >
              <option value="all">All Destinations</option>
              {destinations.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Degree Level</label>
            <select
              value={degreeFilter}
              onChange={(e) => setDegreeFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none"
            >
              <option value="all">All Degree Levels</option>
              <option value="bachelors">Bachelor's</option>
              <option value="masters">Master's</option>
              <option value="phd">PhD / Doctorate</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Funding Coverage</label>
            <select
              value={fundingFilter}
              onChange={(e) => setFundingFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none"
            >
              <option value="all">All Funding Types</option>
              <option value="fully_funded">Fully Funded</option>
              <option value="tuition_waiver">Tuition Waiver</option>
              <option value="partial_funding">Partial Funding</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
        <div>
          Showing <span className="text-white font-bold font-mono-data">{filteredScholarships.length}</span> verified opportunities
        </div>
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredScholarships.map(s => {
          const saved = isSaved(s.id);
          return (
            <div
              key={s.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">{s.provider}</span>
                    <span className="mx-1.5 text-slate-700">·</span>
                    <span>{s.destinationCountry}</span>
                  </div>
                  <button
                    onClick={() => onToggleSave(s)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      saved
                        ? 'bg-emerald-950 text-emerald-400'
                        : 'text-slate-500 hover:text-slate-200'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>

                <h3
                  onClick={() => onOpenDetails(s)}
                  className="font-display font-bold text-base text-white group-hover:text-emerald-300 transition-colors cursor-pointer mb-2"
                >
                  {s.name}
                </h3>

                <p className="text-xs text-slate-300 mb-3 line-clamp-2">
                  {s.benefits.tuitionCoverage} • {s.benefits.stipendMonthly || "Living stipend included"}
                </p>

                <div className="text-[11px] text-slate-400 space-y-1 mb-4">
                  <div>Min CGPA: <span className="text-slate-200 font-mono-data">{s.minimumCGPA.toFixed(1)}/4.0</span></div>
                  <div>Deadline: <span className="text-slate-200">{s.deadline}</span></div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => onOpenDetails(s)}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
                >
                  View Details
                </button>

                <a
                  href={s.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
