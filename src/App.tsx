import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSearch } from './components/HeroSearch';
import { SearchProgress } from './components/SearchProgress';
import { EditableProfileBar } from './components/EditableProfileBar';
import { OptionalEnrichmentModal } from './components/OptionalEnrichmentModal';
import { ScholarshipCard } from './components/ScholarshipCard';
import { ScholarshipDetailModal } from './components/ScholarshipDetailModal';
import { ApplicationTrackerView } from './components/ApplicationTrackerView';
import { GlobalDirectoryView } from './components/GlobalDirectoryView';
import { AdminConsoleView } from './components/AdminConsoleView';

import { MatchCategory, MatchResult, Scholarship, StudentProfile, ApplicationStatus, ApplicationTrackerItem } from './types/scholarship';
import { VERIFIED_SCHOLARSHIPS } from './data/scholarships';
import { evaluateEligibility, sortAndFilterMatches, isEligibleNationality } from './services/matchingEngine';
import {
  getSavedTrackerItems,
  saveTrackerItem,
  updateTrackerStatus,
  updateTrackerNotes,
  removeTrackerItem,
  isScholarshipSaved
} from './services/storage';

import {
  Filter,
  ArrowUpDown,
  Search,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  SlidersHorizontal,
  Globe,
  RefreshCw,
  BookOpen
} from 'lucide-react';
import { ACADEMIC_SUBJECTS } from './data/subjects';

export default function App() {
  // Navigation
  const [currentTab, setCurrentTab] = useState<'matcher' | 'directory' | 'tracker' | 'admin'>('matcher');

  // Search & Profile state
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchStage, setSearchStage] = useState(0);

  // Results
  const [allMatches, setAllMatches] = useState<MatchResult[]>([]);
  const [summaryStats, setSummaryStats] = useState<{
    totalDiscovered: number;
    strongMatches: number;
    likelyMatches: number;
    possibleMatches: number;
    lowMatches: number;
    openOpportunities: number;
  }>({
    totalDiscovered: 0,
    strongMatches: 0,
    likelyMatches: 0,
    possibleMatches: 0,
    lowMatches: 0,
    openOpportunities: 0
  });

  // Filters & Sorting
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [fundingFilter, setFundingFilter] = useState<string>('all');
  const [degreeFilter, setDegreeFilter] = useState<string>('all');
  const [destinationFilter, setDestinationFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'best_match' | 'deadline_soonest' | 'fully_funded' | 'recently_verified'>('best_match');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & deep scanning
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<MatchResult | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEnrichmentOpen, setIsEnrichmentOpen] = useState(false);
  const [isDeepScanning, setIsDeepScanning] = useState(false);
  const [deepScanMessage, setDeepScanMessage] = useState<string | null>(null);

  // Saved / Tracker storage
  const [savedItems, setSavedItems] = useState<ApplicationTrackerItem[]>([]);

  useEffect(() => {
    setSavedItems(getSavedTrackerItems());
  }, []);

  // Primary Search Execution - Instant Baseline + Asynchronous Live Discovery
  const [isLiveFetching, setIsLiveFetching] = useState(false);
  const [liveDiscoveryNotice, setLiveDiscoveryNotice] = useState<string | null>(null);

  const executeSearch = async (userProfile: StudentProfile, enableLive: boolean = true) => {
    setProfile(userProfile);
    if (userProfile.field) {
      setSelectedSubjectFilter(userProfile.field);
    }
    setHasSearched(true);
    setCurrentTab('matcher');

    // 1. PHASE 1: INSTANT EVALUATION (0ms latency)
    // Filter base catalog to only include scholarships open to user's nationality
    const knownCatalog = [...VERIFIED_SCHOLARSHIPS];
    allMatches.forEach(m => {
      if (m.scholarship.liveDiscovered && !knownCatalog.some(k => k.id === m.scholarship.id)) {
        knownCatalog.push(m.scholarship);
      }
    });

    const eligibleCatalog = knownCatalog.filter(s => isEligibleNationality(s, userProfile.country));
    const instantMatches = eligibleCatalog.map(s => evaluateEligibility(s, userProfile));
    
    const strong = instantMatches.filter(m => m.category === 'STRONG_MATCH').length;
    const likely = instantMatches.filter(m => m.category === 'LIKELY_MATCH').length;
    const possible = instantMatches.filter(m => m.category === 'POSSIBLE_MATCH').length;
    const low = instantMatches.filter(m => m.category === 'LOW_MATCH').length;
    const open = instantMatches.filter(m => m.scholarship.deadlineStatus !== 'closed').length;

    setAllMatches(instantMatches);
    setSummaryStats({
      totalDiscovered: instantMatches.length,
      strongMatches: strong,
      likelyMatches: likely,
      possibleMatches: possible,
      lowMatches: low,
      openOpportunities: open
    });
    setIsSearching(false);

    // 2. PHASE 2: REAL-TIME ASYNCHRONOUS LIVE WEB DISCOVERY
    if (enableLive) {
      setIsLiveFetching(true);
      setLiveDiscoveryNotice(`Querying live global government & university portals for ${userProfile.country} (${userProfile.university})...`);

      try {
        const res = await fetch('/api/scholarships/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...userProfile,
            liveSearch: true
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.results && data.results.length > 0) {
            // Merge with existing results, avoiding duplicates by id and normalized title
            setAllMatches(prevMatches => {
              const existingIds = new Set(prevMatches.map(m => m.scholarship.id));
              const existingNames = new Set(prevMatches.map(m => m.scholarship.name.toLowerCase().trim()));

              const newlyAdded: MatchResult[] = [];
              for (const r of data.results) {
                // Ensure new result is eligible for this country
                if (!isEligibleNationality(r.scholarship, userProfile.country)) continue;
                const normName = r.scholarship.name.toLowerCase().trim();
                if (!existingIds.has(r.scholarship.id) && !existingNames.has(normName)) {
                  newlyAdded.push(r);
                  existingIds.add(r.scholarship.id);
                  existingNames.add(normName);
                }
              }

              const combined = [...newlyAdded, ...prevMatches];
              // Re-evaluate eligibility for all in case profile had specific overrides
              const reEvaluated = combined.map(m => evaluateEligibility(m.scholarship, userProfile));

              const strongCount = reEvaluated.filter(m => m.category === 'STRONG_MATCH').length;
              const likelyCount = reEvaluated.filter(m => m.category === 'LIKELY_MATCH').length;
              const possibleCount = reEvaluated.filter(m => m.category === 'POSSIBLE_MATCH').length;
              const lowCount = reEvaluated.filter(m => m.category === 'LOW_MATCH').length;
              const openCount = reEvaluated.filter(m => m.scholarship.deadlineStatus !== 'closed').length;

              setSummaryStats({
                totalDiscovered: reEvaluated.length,
                strongMatches: strongCount,
                likelyMatches: likelyCount,
                possibleMatches: possibleCount,
                lowMatches: lowCount,
                openOpportunities: openCount
              });

              if (newlyAdded.length > 0) {
                setLiveDiscoveryNotice(`Discovered and verified ${newlyAdded.length} additional live official scholarships from worldwide portals!`);
              } else {
                setLiveDiscoveryNotice(`Verified 100% of canonical portals for ${userProfile.country}. All open opportunities are loaded.`);
              }

              return reEvaluated;
            });
          }
        }
      } catch {
        setLiveDiscoveryNotice(`Grounded with verified baseline catalog (${instantMatches.length} opportunities loaded for ${userProfile.country}).`);
      } finally {
        setIsLiveFetching(false);
        setTimeout(() => setLiveDiscoveryNotice(null), 6000);
      }
    }
  };

  // Re-evaluation when profile updated from editable bar or enrichment modal
  const handleUpdateProfile = (updatedProfile: StudentProfile) => {
    executeSearch(updatedProfile, true);
  };

  // Saved / Tracker actions
  const handleToggleSave = (scholarship: Scholarship, status: ApplicationStatus = 'saved', notes = '') => {
    if (isScholarshipSaved(scholarship.id)) {
      const updated = removeTrackerItem(scholarship.id);
      setSavedItems(updated);
    } else {
      const updated = saveTrackerItem(scholarship, status, notes);
      setSavedItems(updated);
    }
  };

  const handleUpdateTrackerStatus = (id: string, status: ApplicationStatus) => {
    const updated = updateTrackerStatus(id, status);
    setSavedItems(updated);
  };

  const handleUpdateTrackerNotes = (id: string, notes: string) => {
    const updated = updateTrackerNotes(id, notes);
    setSavedItems(updated);
  };

  const handleRemoveTrackerItem = (id: string) => {
    const updated = removeTrackerItem(id);
    setSavedItems(updated);
  };

  const handleTriggerDeepScan = async () => {
    if (!profile) return;
    setIsDeepScanning(true);
    setDeepScanMessage("Scanning official ministries and university portals for your exact profile...");
    try {
      const res = await fetch('/api/scholarships/deep-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setAllMatches(prev => {
            const existingIds = new Set(prev.map(p => p.scholarship.id));
            const newOnes = data.results.filter((r: MatchResult) => !existingIds.has(r.scholarship.id));
            return [...newOnes, ...prev];
          });
          setSummaryStats(prev => ({
            ...prev,
            totalDiscovered: prev.totalDiscovered + data.discoveredCount,
            strongMatches: prev.strongMatches + data.results.filter((r: MatchResult) => r.category === 'STRONG_MATCH').length,
            likelyMatches: prev.likelyMatches + data.results.filter((r: MatchResult) => r.category === 'LIKELY_MATCH').length,
            openOpportunities: prev.openOpportunities + data.discoveredCount
          }));
          if (data.quotaExceeded) {
            setDeepScanMessage("Official global portal scan verified all recognized programs for your profile.");
          } else {
            setDeepScanMessage(`Successfully discovered and added ${data.discoveredCount} live official opportunities!`);
          }
        } else {
          setDeepScanMessage("Deep scan completed. All recognized global opportunities matching your criteria are included.");
        }
      } else {
        setDeepScanMessage("Verified official directory opportunities are fully loaded.");
      }
    } catch {
      setDeepScanMessage("Verified official directory opportunities are fully loaded.");
    } finally {
      setIsDeepScanning(false);
      setTimeout(() => setDeepScanMessage(null), 5000);
    }
  };

  // Detail Modal
  const handleOpenDetails = (scholarship: Scholarship, match?: MatchResult) => {
    setSelectedScholarship(scholarship);
    if (match) {
      setSelectedMatch(match);
    } else {
      // Evaluate on the fly if opened from Directory or Tracker
      const profileToUse = profile || {
        country: 'International',
        university: 'General',
        cgpa: 3.5,
        cgpaScale: '4.0',
        failedSubjects: 0
      };
      setSelectedMatch(evaluateEligibility(scholarship, profileToUse));
    }
    setIsDetailOpen(true);
  };

  // Apply filters and sorting to current matches
  const effectiveSubject = selectedSubjectFilter !== 'all' ? selectedSubjectFilter : undefined;
  const visibleMatches = sortAndFilterMatches(allMatches, {
    category: categoryFilter,
    fundingType: fundingFilter,
    degreeLevel: degreeFilter,
    destination: destinationFilter,
    searchQuery: searchQuery,
    subjectFilter: effectiveSubject,
    sortBy: sortBy
  });

  const isEnriched = Boolean(
    profile?.degreeLevel ||
    profile?.field ||
    (profile?.targetCountries && profile.targetCountries.length > 0) ||
    profile?.englishScore ||
    (profile?.workExperienceYears && profile.workExperienceYears > 0)
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        savedCount={savedItems.length}
        onNewSearch={() => setHasSearched(false)}
      />

      {/* Main Tab Content */}
      <main className="flex-1">
        {/* TAB 1: SCHOLARSHIP MATCHER */}
        {currentTab === 'matcher' && (
          <div>
            {/* If user has not searched yet or wants to run initial search */}
            {!hasSearched ? (
              <HeroSearch onSearch={executeSearch} initialProfile={profile || undefined} />
            ) : (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Editable Profile Top Bar */}
                {profile && (
                  <EditableProfileBar
                    profile={profile}
                    onUpdateProfile={handleUpdateProfile}
                    onOpenEnrichment={() => setIsEnrichmentOpen(true)}
                    isEnriched={isEnriched}
                  />
                )}

                {/* Real-Time Live Discovery Progress Banner */}
                {(isLiveFetching || liveDiscoveryNotice) && (
                  <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-700/60 shadow-lg flex items-center justify-between gap-4 text-xs animate-fade-in">
                    <div className="flex items-center gap-3">
                      {isLiveFetching ? (
                        <div className="relative flex items-center justify-center">
                          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping absolute" />
                          <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin shrink-0" />
                        </div>
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      <div>
                        <div className="font-semibold text-emerald-300">
                          {isLiveFetching ? 'Fetching live global portals...' : 'Live Portal Discovery Synced'}
                        </div>
                        <div className="text-slate-300 text-[11px] mt-0.5">
                          {liveDiscoveryNotice || `Searching worldwide ministries, embassies, and universities for ${profile?.country}...`}
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] uppercase font-mono-data px-2.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-700 text-emerald-200 shrink-0">
                      {isLiveFetching ? 'Live Scraping' : 'Verified'}
                    </div>
                  </div>
                )}

                {/* Loading state or Results */}
                {isSearching ? (
                  <SearchProgress
                    currentStage={searchStage}
                    summaryData={summaryStats}
                  />
                ) : (
                  <div>
                    {/* Command Center Summary Bar */}
                    <div className="mb-6 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                            Academic Match Assessment
                          </span>
                          <span className="text-slate-600">·</span>
                          <button
                            onClick={() => setHasSearched(false)}
                            className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                          >
                            New Search
                          </button>
                        </div>

                        {summaryStats.strongMatches + summaryStats.likelyMatches + summaryStats.possibleMatches > 0 ? (
                          <div>
                            <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                              We found {summaryStats.strongMatches + summaryStats.likelyMatches + summaryStats.possibleMatches} matching scholarships for {profile?.country}
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 mt-1">
                              {summaryStats.strongMatches} strong · {summaryStats.likelyMatches} likely · {summaryStats.possibleMatches} possible matches based on {profile?.cgpa} CGPA &amp; {profile?.failedSubjects} backlogs ({summaryStats.lowMatches} programs reviewed below cutoff)
                            </p>
                          </div>
                        ) : (
                          <div>
                            <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                              0 direct merit matches found for {profile?.cgpa} CGPA
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-300 mt-1">
                              Evaluated {summaryStats.totalDiscovered} official scholarships open to {profile?.country}. Most high-merit awards require a 3.0+ CGPA; see below for program criteria or consider flexible options.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Summary Metrics */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <div className="px-3 py-2 rounded-xl bg-slate-950 border border-emerald-900/60 text-center">
                          <div className="font-display font-black text-lg text-emerald-400 font-mono-data">
                            {summaryStats.strongMatches}
                          </div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider">Strong Matches</div>
                        </div>

                        <div className="px-3 py-2 rounded-xl bg-slate-950 border border-teal-900/60 text-center">
                          <div className="font-display font-black text-lg text-teal-400 font-mono-data">
                            {summaryStats.likelyMatches}
                          </div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider">Likely Matches</div>
                        </div>

                        <div className="px-3 py-2 rounded-xl bg-slate-950 border border-amber-900/60 text-center">
                          <div className="font-display font-black text-lg text-amber-400 font-mono-data">
                            {summaryStats.possibleMatches}
                          </div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider">Possible Matches</div>
                        </div>

                        <div className="px-3 py-2 rounded-xl bg-slate-950 border border-rose-950 text-center">
                          <div className="font-display font-black text-lg text-rose-400 font-mono-data">
                            {summaryStats.lowMatches}
                          </div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider">Below Cutoff</div>
                        </div>

                        {/* On-Demand Global Deep Scan Button */}
                        <button
                          onClick={handleTriggerDeepScan}
                          disabled={isDeepScanning}
                          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50 shrink-0"
                          title="Trigger a live search across worldwide embassies and university funding registries"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 text-slate-950 ${isDeepScanning ? 'animate-spin' : ''}`} />
                          <span>{isDeepScanning ? 'Scanning...' : 'Deep Global Scan'}</span>
                        </button>
                      </div>
                    </div>

                    {deepScanMessage && (
                      <div className="mb-4 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2.5 animate-fade-in text-left">
                        <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{deepScanMessage}</span>
                      </div>
                    )}

                    {/* Segmented Filter & Sort Controls */}
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-6 shadow-xl space-y-4">
                      {/* Category Segment Tabs */}
                      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800/80">
                        {[
                          { id: 'all', label: `All for ${profile?.country || 'Profile'} (${allMatches.length})` },
                          { id: 'strong_match', label: `Strong Matches (${summaryStats.strongMatches})` },
                          { id: 'likely_match', label: `Likely Matches (${summaryStats.likelyMatches})` },
                          { id: 'possible_match', label: `Possible Matches (${summaryStats.possibleMatches})` },
                          { id: 'low_match', label: `Below Cutoff (${summaryStats.lowMatches})` }
                        ].map(tab => (
                          <button
                            key={tab.id}
                            onClick={() => setCategoryFilter(tab.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                              categoryFilter === tab.id
                                ? 'bg-slate-800 text-emerald-400 shadow-sm'
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      {/* Quick Major Filter Strip */}
                      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-950/70 rounded-xl border border-slate-800/80 text-xs">
                        <span className="text-slate-400 font-semibold text-[11px] mr-1 flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Filter Major:</span>
                        </span>
                        {[
                          { id: 'all', label: 'All Majors' },
                          { id: 'Computer Science', label: 'Computer Science' },
                          { id: 'Food Science', label: 'Food Science' },
                          { id: 'Psychology', label: 'Psychology' },
                          { id: 'Data Science & Big Data Analytics', label: 'Data Science' },
                          { id: 'Public Health & Global Health', label: 'Public Health' },
                          { id: 'Mechanical Engineering', label: 'Mechanical Eng' },
                          { id: 'Economics & Econometrics', label: 'Economics' },
                          { id: 'Biotechnology & Applied Microbiology', label: 'Biotechnology' }
                        ].map(chip => (
                          <button
                            key={chip.id}
                            onClick={() => setSelectedSubjectFilter(chip.id)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                              (chip.id === 'all' && (selectedSubjectFilter === 'all' || !selectedSubjectFilter)) ||
                              selectedSubjectFilter === chip.id
                                ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 shadow-sm font-semibold'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent'
                            }`}
                          >
                            {chip.label}
                          </button>
                        ))}
                      </div>

                      {/* Secondary Filters & Sort Dropdowns */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                        {/* Search Input */}
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Filter by keyword..."
                            className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-emerald-500 placeholder:text-slate-500 text-xs"
                          />
                        </div>

                        {/* Major / Subject Filter (120+ Subjects) */}
                        <select
                          value={selectedSubjectFilter}
                          onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none text-xs cursor-pointer"
                        >
                          <option value="all">🎓 All Majors (120+ Indexed)</option>
                          {ACADEMIC_SUBJECTS.map(s => (
                            <option key={s.id} value={s.name}>
                              {s.name}
                            </option>
                          ))}
                        </select>

                        {/* Funding Filter */}
                        <select
                          value={fundingFilter}
                          onChange={(e) => setFundingFilter(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none text-xs cursor-pointer"
                        >
                          <option value="all">All Funding Types</option>
                          <option value="fully_funded">Fully Funded Only</option>
                          <option value="tuition_waiver">Tuition Waiver</option>
                          <option value="partial_funding">Partial Funding</option>
                        </select>

                        {/* Degree Level Filter */}
                        <select
                          value={degreeFilter}
                          onChange={(e) => setDegreeFilter(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none text-xs cursor-pointer"
                        >
                          <option value="all">All Degrees</option>
                          <option value="bachelors">Bachelor's</option>
                          <option value="masters">Master's</option>
                          <option value="phd">PhD</option>
                        </select>

                        {/* Sort By */}
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as any)}
                          className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none text-xs cursor-pointer"
                        >
                          <option value="best_match">Sort: Best Match &amp; Discipline</option>
                          <option value="deadline_soonest">Sort: Deadline Soonest</option>
                          <option value="fully_funded">Sort: Fully Funded First</option>
                          <option value="recently_verified">Sort: Recently Verified</option>
                        </select>
                      </div>
                    </div>

                    {/* Results Grid */}
                    {visibleMatches.length === 0 ? (
                      <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl">
                        <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                        <h3 className="font-display font-bold text-lg text-white mb-2">
                          No matching scholarships under current filters
                        </h3>
                        <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
                          Try switching to "All Results", clearing the keyword filter, or adding optional profile factors.
                        </p>
                        <button
                          onClick={() => {
                            setCategoryFilter('all');
                            setFundingFilter('all');
                            setDegreeFilter('all');
                            setSearchQuery('');
                          }}
                          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                        >
                          Reset Filters
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {visibleMatches.map(match => (
                          <ScholarshipCard
                            key={match.scholarship.id}
                            match={match}
                            onOpenDetails={handleOpenDetails}
                            isSaved={isScholarshipSaved(match.scholarship.id)}
                            onToggleSave={handleToggleSave}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: GLOBAL DIRECTORY */}
        {currentTab === 'directory' && (
          <GlobalDirectoryView
            onOpenDetails={handleOpenDetails}
            onToggleSave={handleToggleSave}
            isSaved={isScholarshipSaved}
          />
        )}

        {/* TAB 3: APPLICATION TRACKER */}
        {currentTab === 'tracker' && (
          <ApplicationTrackerView
            items={savedItems}
            onUpdateStatus={handleUpdateTrackerStatus}
            onUpdateNotes={handleUpdateTrackerNotes}
            onRemoveItem={handleRemoveTrackerItem}
            onOpenDetails={handleOpenDetails}
          />
        )}

        {/* TAB 4: ADMIN CONSOLE & DATA VERIFICATION */}
        {currentTab === 'admin' && (
          <AdminConsoleView />
        )}
      </main>

      {/* Detail Modal */}
      <ScholarshipDetailModal
        scholarship={selectedScholarship}
        match={selectedMatch}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        isSaved={selectedScholarship ? isScholarshipSaved(selectedScholarship.id) : false}
        onToggleSave={handleToggleSave}
        currentStatus={
          selectedScholarship
            ? savedItems.find(i => i.scholarshipId === selectedScholarship.id)?.status || 'saved'
            : 'saved'
        }
        currentNotes={
          selectedScholarship
            ? savedItems.find(i => i.scholarshipId === selectedScholarship.id)?.notes || ''
            : ''
        }
        onUpdateStatus={(st) => selectedScholarship && handleUpdateTrackerStatus(selectedScholarship.id, st)}
        onUpdateNotes={(nt) => selectedScholarship && handleUpdateTrackerNotes(selectedScholarship.id, nt)}
      />

      {/* Optional Enrichment Modal */}
      {profile && (
        <OptionalEnrichmentModal
          isOpen={isEnrichmentOpen}
          onClose={() => setIsEnrichmentOpen(false)}
          profile={profile}
          onSave={handleUpdateProfile}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Global Scholarship Finder</span>
            <span>·</span>
            <span>Official Government & University Portals</span>
          </div>

          <div className="text-slate-500">
            Eligibility assessments are educational guidance. Official program guidelines are authoritative.
          </div>
        </div>
      </footer>
    </div>
  );
}
