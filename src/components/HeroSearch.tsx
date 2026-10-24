import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, HelpCircle, Check, Sparkles, Building, Globe, Award, AlertCircle } from 'lucide-react';
import { COUNTRIES, CountryItem } from '../data/countries';
import { searchUniversities, UniversityItem } from '../data/universities';
import { CGPAScale, StudentProfile } from '../types/scholarship';

interface HeroSearchProps {
  onSearch: (profile: StudentProfile, liveSearch: boolean) => void;
  initialProfile?: StudentProfile;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ onSearch, initialProfile }) => {
  // Input 1: Country
  const [selectedCountry, setSelectedCountry] = useState<string>(initialProfile?.country || 'Pakistan');
  const [countryQuery, setCountryQuery] = useState('');
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // Input 2: University
  const [selectedUniversity, setSelectedUniversity] = useState<string>(
    initialProfile?.university || 'The Islamia University of Bahawalpur (IUB BWP)'
  );
  const [uniQuery, setUniQuery] = useState(
    initialProfile?.university || 'The Islamia University of Bahawalpur (IUB BWP)'
  );
  const [isUniOpen, setIsUniOpen] = useState(false);
  const uniDropdownRef = useRef<HTMLDivElement>(null);

  // Input 3: CGPA & Failed Subjects
  const [cgpa, setCgpa] = useState<string>(initialProfile?.cgpa ? String(initialProfile.cgpa) : '3.6');
  const [cgpaScale, setCgpaScale] = useState<CGPAScale>(initialProfile?.cgpaScale || '4.0');
  const [failedSubjects, setFailedSubjects] = useState<string>(
    initialProfile?.failedSubjects !== undefined ? String(initialProfile.failedSubjects) : '0'
  );

  // Live Search Grounding Toggle
  const [enableLiveSearch, setEnableLiveSearch] = useState(true);
  const [showFailedTooltip, setShowFailedTooltip] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
      if (uniDropdownRef.current && !uniDropdownRef.current.contains(event.target as Node)) {
        setIsUniOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered countries
  const filteredCountries = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(countryQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(countryQuery.toLowerCase())
  );

  // Smart searched universities with country bias and alias matching
  const matchingUniversities = searchUniversities(uniQuery, selectedCountry);

  // Current selected country item
  const currentCountryItem = COUNTRIES.find(c => c.name === selectedCountry) || COUNTRIES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const parsedCgpa = parseFloat(cgpa);
    if (isNaN(parsedCgpa) || parsedCgpa < 0) {
      setValidationError('Please enter a valid numeric CGPA.');
      return;
    }

    if (cgpaScale === '4.0' && parsedCgpa > 4.0) {
      setValidationError('On a 4.0 scale, CGPA cannot exceed 4.0.');
      return;
    }
    if (cgpaScale === '5.0' && parsedCgpa > 5.0) {
      setValidationError('On a 5.0 scale, CGPA cannot exceed 5.0.');
      return;
    }
    if (cgpaScale === '10.0' && parsedCgpa > 10.0) {
      setValidationError('On a 10.0 scale, CGPA cannot exceed 10.0.');
      return;
    }
    if (cgpaScale === '100%' && parsedCgpa > 100) {
      setValidationError('Percentage score cannot exceed 100%.');
      return;
    }

    const uniName = selectedUniversity.trim() || uniQuery.trim();
    if (!uniName) {
      setValidationError('Please specify your current or graduated university.');
      return;
    }

    const parsedFails = parseInt(failedSubjects, 10);
    const safeFails = isNaN(parsedFails) || parsedFails < 0 ? 0 : parsedFails;

    const profile: StudentProfile = {
      country: selectedCountry,
      university: uniName,
      cgpa: parsedCgpa,
      cgpaScale,
      failedSubjects: safeFails
    };

    onSearch(profile, enableLiveSearch);
  };

  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20 w-full">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[380px] bg-gradient-to-tr from-emerald-600/10 via-teal-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Editorial Subtitle */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-emerald-400 font-medium mb-5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Three Inputs · Global Official Portals · Smart Backlog Matching</span>
        </div>

        {/* Main Title restricted to max 2 lines */}
        <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight max-w-4xl mx-auto mb-4">
          Find Scholarships You{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
            Actually Qualify For.
          </span>
        </h1>

        {/* Description paragraph centered, readable */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 mb-8 sm:mb-10 leading-relaxed font-normal">
          Tell us who you are academically. We search worldwide government and university portals, evaluate CGPA conversion, and analyze real failed-course rules to find where you can get funded.
        </p>

        {/* The 3-Input Form Card */}
        <div className="w-full max-w-5xl mx-auto bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl p-5 sm:p-7 lg:p-8 text-left backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 3 Columns Desktop / 1 Column Mobile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              
              {/* INPUT 1: Country / Nationality */}
              <div className="relative" ref={countryDropdownRef}>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>1. Nationality / Country</span>
                  <span className="text-[11px] text-emerald-400 lowercase font-normal">mandatory</span>
                </label>
                
                <button
                  type="button"
                  onClick={() => setIsCountryOpen(!isCountryOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-700/80 hover:border-slate-600 text-slate-100 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-xl leading-none">{currentCountryItem.flag}</span>
                    <span className="text-sm font-medium truncate">{selectedCountry}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                </button>

                {/* Country Dropdown */}
                {isCountryOpen && (
                  <div className="absolute z-50 left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-72 flex flex-col">
                    <div className="p-2 border-b border-slate-800 bg-slate-950/80">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Search country..."
                          value={countryQuery}
                          onChange={(e) => setCountryQuery(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                          autoFocus
                        />
                      </div>
                    </div>
                    <div className="overflow-y-auto divide-y divide-slate-800/40">
                      {filteredCountries.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(c.name);
                            setIsCountryOpen(false);
                            setCountryQuery('');
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors hover:bg-slate-800 ${
                            selectedCountry === c.name ? 'bg-emerald-950/40 text-emerald-400 font-semibold' : 'text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <span className="text-base">{c.flag}</span>
                            <span className="truncate">{c.name}</span>
                          </div>
                          {selectedCountry === c.name && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* INPUT 2: University */}
              <div className="relative" ref={uniDropdownRef}>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>2. Current / Graduated University</span>
                  <span className="text-[11px] text-emerald-400 lowercase font-normal">mandatory</span>
                </label>

                <div className="relative">
                  <input
                    type="text"
                    value={uniQuery}
                    onChange={(e) => {
                      setUniQuery(e.target.value);
                      setSelectedUniversity(e.target.value);
                      setIsUniOpen(true);
                    }}
                    onFocus={() => setIsUniOpen(true)}
                    placeholder="Search university or type acronym (e.g. IUB BWP, MIT, NUST)"
                    className="w-full pl-3.5 pr-10 py-3 rounded-xl bg-slate-950 border border-slate-700/80 hover:border-slate-600 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder:text-slate-500"
                  />
                  <Building className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>

                {/* University Dropdown */}
                {isUniOpen && (
                  <div className="absolute z-50 left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-72 flex flex-col">
                    {/* Explicit Option to use whatever was typed */}
                    {uniQuery.trim().length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedUniversity(uniQuery.trim());
                          setIsUniOpen(false);
                        }}
                        className="w-full px-3.5 py-2.5 text-xs text-left bg-emerald-950/60 hover:bg-emerald-900/70 text-emerald-300 flex items-center justify-between border-b border-slate-800 transition-colors"
                      >
                        <span className="font-semibold truncate">🎓 Select "{uniQuery.trim()}"</span>
                        <span className="text-[10px] text-emerald-400 font-mono-data shrink-0 ml-2">Any Institution Worldwide ✓</span>
                      </button>
                    )}

                    <div className="p-2 text-[11px] text-slate-400 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                      <span>Recognized institution suggestions:</span>
                      <span className="text-slate-500 font-mono-data">Acronym & Name Match</span>
                    </div>

                    <div className="overflow-y-auto divide-y divide-slate-800/40">
                      {matchingUniversities.slice(0, 15).map((u, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedUniversity(u.name);
                            setUniQuery(u.name);
                            setIsUniOpen(false);
                          }}
                          className="w-full px-3.5 py-2.5 text-xs text-left transition-colors hover:bg-slate-800 text-slate-200 flex flex-col"
                        >
                          <span className="font-semibold text-slate-100">{u.name}</span>
                          <span className="text-[11px] text-slate-400">{u.city ? `${u.city}, ` : ''}{u.country}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* INPUT 3: CGPA & Failed Subjects */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    3. CGPA &amp; Failed Subjects
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowFailedTooltip(!showFailedTooltip)}
                      className="text-slate-400 hover:text-emerald-400 transition-colors p-0.5"
                      title="Learn how failed subjects affect eligibility"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                    {showFailedTooltip && (
                      <div className="absolute right-0 top-6 z-50 w-72 p-3 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl text-xs text-slate-300 leading-relaxed">
                        <p className="font-semibold text-white mb-1">Failed subjects do not automatically disqualify you!</p>
                        <p>
                          Our eligibility engine checks each scholarship's real stated rules: many global programs only require minimum overall CGPA or cleared backlogs by degree award date. We never invent arbitrary barriers.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {/* CGPA + Scale */}
                  <div className="flex rounded-xl bg-slate-950 border border-slate-700/80 focus-within:ring-2 focus-within:ring-emerald-500/50 overflow-hidden">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={cgpa}
                      onChange={(e) => setCgpa(e.target.value)}
                      placeholder="3.6"
                      className="w-full px-3 py-3 bg-transparent text-slate-100 text-sm font-mono-data focus:outline-none"
                    />
                    <select
                      value={cgpaScale}
                      onChange={(e) => setCgpaScale(e.target.value as CGPAScale)}
                      className="bg-slate-900 text-slate-300 text-xs px-2 border-l border-slate-800 focus:outline-none cursor-pointer"
                    >
                      <option value="4.0">/ 4.0</option>
                      <option value="5.0">/ 5.0</option>
                      <option value="10.0">/ 10.0</option>
                      <option value="100%">%</option>
                    </select>
                  </div>

                  {/* Failed subjects */}
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={failedSubjects}
                      onChange={(e) => setFailedSubjects(e.target.value)}
                      placeholder="0"
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-700/80 hover:border-slate-600 text-slate-100 text-sm font-mono-data focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                    <span className="absolute right-3 top-3.5 text-slate-500 text-xs pointer-events-none">
                      fails
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Validation Error Message */}
            {validationError && (
              <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Controls & Centered CTA Button */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col items-center justify-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400 hover:text-slate-200 transition-colors select-none">
                <input
                  type="checkbox"
                  checked={enableLiveSearch}
                  onChange={(e) => setEnableLiveSearch(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500 h-4 w-4"
                />
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Real-Time Live Web Discovery (Government &amp; University Portals)</span>
                </span>
              </label>

              {/* Fully visible, centered button with zero clipping */}
              <button
                type="submit"
                className="w-full sm:w-auto min-w-[280px] px-10 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm tracking-wider shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Search className="w-4 h-4 text-slate-950 stroke-[3]" />
                <span>FIND MY SCHOLARSHIPS</span>
              </button>
            </div>
          </form>
        </div>

        {/* Quiet Trust Indicators aligned in single clean horizontal row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>100% Traceable Official Sources</span>
          </div>
          <span className="text-slate-700 hidden sm:inline">·</span>
          <div>No Invented Deadlines</div>
          <span className="text-slate-700 hidden sm:inline">·</span>
          <div>Intelligent Failed-Course Parsing</div>
          <span className="text-slate-700 hidden sm:inline">·</span>
          <div>Zero Blocking 20-Question Forms</div>
        </div>
      </div>
    </div>
  );
};
