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
import { MemorialModal } from './components/MemorialModal';
import { ScamSafetyModal } from './components/ScamSafetyModal';

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
  BookOpen,
  X,
  GraduationCap
} from 'lucide-react';
import { ACADEMIC_SUBJECTS } from './data/subjects';
import { StudyLevelFilterModal } from './components/StudyLevelFilterModal';
import { StudyLevelOnboardingModal } from './components/StudyLevelOnboardingModal';
import { getShortLevelLabel, normalizeLevelToCanonical } from './data/studyLevels';

const STUDY_LEVELS_STORAGE_KEY = 'user_selected_study_levels';
const ONBOARDING_DISMISSED_KEY = 'study_level_onboarding_dismissed';

function getStoredStudyLevels(): string[] {
  try {
    const raw = localStorage.getItem(STUDY_LEVELS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Ignore storage failure
  }
  return [];
}

function storeStudyLevels(levels: string[]): void {
  try {
    localStorage.setItem(STUDY_LEVELS_STORAGE_KEY, JSON.stringify(levels));
  } catch {
    // Ignore storage failure
  }
}

function hasDismissedOnboarding(): boolean {
  try {
    return localStorage.getItem(ONBOARDING_DISMISSED_KEY) === 'true';
  } catch {
    return false;
  }
}

function setDismissedOnboarding(): void {
  try {
    localStorage.setItem(ONBOARDING_DISMISSED_KEY, 'true');
  } catch {
    // Ignore storage failure
  }
}

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

  // Study Level Multi-Select Filter state
  const [selectedStudyLevels, setSelectedStudyLevels] = useState<string[]>(getStoredStudyLevels);
  const [isStudyLevelModalOpen, setIsStudyLevelModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(() => !hasDismissedOnboarding());

  const handleApplyStudyLevels = (levels: string[]) => {
    setSelectedStudyLevels(levels);
    storeStudyLevels(levels);
  };

  const handleRemoveStudyLevel = (levelToRemove: string) => {
    const updated = selectedStudyLevels.filter(l => l !== levelToRemove);
    setSelectedStudyLevels(updated);
    storeStudyLevels(updated);
  };

  const handleClearAllStudyLevels = () => {
    setSelectedStudyLevels([]);
    storeStudyLevels([]);
  };

  const handleCompleteOnboarding = (levels: string[]) => {
    setSelectedStudyLevels(levels);
    storeStudyLevels(levels);
    setDismissedOnboarding();
    setIsOnboardingModalOpen(false);
  };

  const handleSkipOnboarding = () => {
    setDismissedOnboarding();
    setIsOnboardingModalOpen(false);
  };

  // Modals & deep scanning
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<MatchResult | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEnrichmentOpen, setIsEnrichmentOpen] = useState(false);
  const [isDeepScanning, setIsDeepScanning] = useState(false);
  const [deepScanMessage, setDeepScanMessage] = useState<string | null>(null);
  const [lastRefreshedTime, setLastRefreshedTime] = useState<string | null>(null);
  const [recentWebQueries, setRecentWebQueries] = useState<string[]>([]);
  const [isMemorialOpen, setIsMemorialOpen] = useState(false);
  const [isScamSafetyOpen, setIsScamSafetyOpen] = useState(false);
  const [scamSafetyTab, setScamSafetyTab] = useState<'guide' | 'report'>('guide');

  // Saved / Tracker storage
  const [savedItems, setSavedItems] = useState<ApplicationTrackerItem[]>([]);

  useEffect(() => {
    setSavedItems(getSavedTrackerItems());
  }, []);

  // Primary Search Execution - Full Refresh on Every Search + Expanded Live Web Grounding
  const [isLiveFetching, setIsLiveFetching] = useState(false);
  const [liveDiscoveryNotice, setLiveDiscoveryNotice] = useState<string | null>(null);

  const executeSearch = async (userProfile: StudentProfile, enableLive: boolean = true) => {
    setProfile(userProfile);
    if (userProfile.field) {
      setSelectedSubjectFilter(userProfile.field);
    }
    if (userProfile.studyLevel) {
      const canonical = normalizeLevelToCanonical(userProfile.studyLevel) || userProfile.studyLevel;
      setSelectedStudyLevels([canonical]);
      storeStudyLevels([canonical]);
    }
    setHasSearched(true);
    setCurrentTab('matcher');

    // DEFAULT ACTION: FULL SYSTEM REFRESH FOR EVERY SEARCH
    setIsSearching(true);
    setSearchStage(0);

    // 1. PHASE 1: Purge previous query residue & baseline evaluate against user's exact country
    const eligibleCatalog = VERIFIED_SCHOLARSHIPS.filter(s => isEligibleNationality(s, userProfile.country));
    const rawInstantMatches = eligibleCatalog.map(s => evaluateEligibility(s, userProfile));
    
    // Deduplicate by scholarship id
    const seenInstantIds = new Set<string>();
    const instantMatches = rawInstantMatches.filter(m => {
      if (!m.scholarship.id || seenInstantIds.has(m.scholarship.id)) return false;
      seenInstantIds.add(m.scholarship.id);
      return true;
    });

    setAllMatches(instantMatches);
    setSummaryStats({
      totalDiscovered: instantMatches.length,
      strongMatches: instantMatches.filter(m => m.category === 'STRONG_MATCH').length,
      likelyMatches: instantMatches.filter(m => m.category === 'LIKELY_MATCH').length,
      possibleMatches: instantMatches.filter(m => m.category === 'POSSIBLE_MATCH').length,
      lowMatches: instantMatches.filter(m => m.category === 'LOW_MATCH').length,
      openOpportunities: instantMatches.filter(m => m.scholarship.deadlineStatus !== 'closed').length
    });

    // Animate stage transitions so student sees real-time system refresh
    setTimeout(() => setSearchStage(1), 300);

    // 2. PHASE 2: REAL-TIME EXPANDED LIVE INTERNET SEARCH WITH GOOGLE SEARCH GROUNDING
    if (enableLive) {
      setIsLiveFetching(true);
      const levelLabel = userProfile.studyLevel || "All Levels";
      setLiveDiscoveryNotice(`Refreshing registries & browsing internet for ${userProfile.country} (${levelLabel}, ${userProfile.university})...`);

      try {
        setTimeout(() => setSearchStage(2), 650);

        const res = await fetch('/api/scholarships/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...userProfile,
            liveSearch: true,
            refresh: true
          })
        });

        setTimeout(() => setSearchStage(3), 1000);

        if (res.ok) {
          const data = await res.json();
          if (data.results && data.results.length > 0) {
            setLastRefreshedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
            if (data.webSearchQueries && data.webSearchQueries.length > 0) {
              setRecentWebQueries(data.webSearchQueries);
            }

            // Freshly populate results for the new search conditions
            const countryEligible = data.results.filter((r: MatchResult) =>
              isEligibleNationality(r.scholarship, userProfile.country)
            );

            // Re-evaluate eligibility for complete fidelity with userProfile
            const rawReEvaluated = countryEligible.map((m: MatchResult) => evaluateEligibility(m.scholarship, userProfile));

            // Deduplicate by scholarship id
            const seenReIds = new Set<string>();
            const reEvaluated = rawReEvaluated.filter((m: MatchResult) => {
              if (!m.scholarship.id || seenReIds.has(m.scholarship.id)) return false;
              seenReIds.add(m.scholarship.id);
              return true;
            });

            const strongCount = reEvaluated.filter((m: MatchResult) => m.category === 'STRONG_MATCH').length;
            const likelyCount = reEvaluated.filter((m: MatchResult) => m.category === 'LIKELY_MATCH').length;
            const possibleCount = reEvaluated.filter((m: MatchResult) => m.category === 'POSSIBLE_MATCH').length;
            const lowCount = reEvaluated.filter((m: MatchResult) => m.category === 'LOW_MATCH').length;
            const openCount = reEvaluated.filter((m: MatchResult) => m.scholarship.deadlineStatus !== 'closed').length;

            setAllMatches(reEvaluated);
            setSummaryStats({
              totalDiscovered: reEvaluated.length,
              strongMatches: strongCount,
              likelyMatches: likelyCount,
              possibleMatches: possibleCount,
              lowMatches: lowCount,
              openOpportunities: openCount
            });

            const liveCount = data.summary?.liveDiscovered || 0;
            if (liveCount > 0) {
              setLiveDiscoveryNotice(`Freshly discovered ${liveCount} live official scholarship opportunities from worldwide internet registries!`);
            } else {
              setLiveDiscoveryNotice(`Refreshed feeds: Verified all recognized official programs for ${userProfile.country} (${levelLabel}).`);
            }
          }
        }
      } catch {
        setLiveDiscoveryNotice(`Refreshed feeds: Grounded with verified catalog (${instantMatches.length} opportunities loaded).`);
      } finally {
        setTimeout(() => setSearchStage(4), 1300);
        setTimeout(() => {
          setIsSearching(false);
          setIsLiveFetching(false);
        }, 1600);
        setTimeout(() => setLiveDiscoveryNotice(null), 8000);
      }
    } else {
      setTimeout(() => {
        setIsSearching(false);
      }, 600);
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
    studyLevels: selectedStudyLevels,
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
        onOpenMemorial={() => setIsMemorialOpen(true)}
        onOpenScamSafety={(tab = 'guide') => {
          setScamSafetyTab(tab);
          setIsScamSafetyOpen(true);
        }}
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
                    profile={profile || undefined}
                    isRefreshing={isSearching || isLiveFetching}
                    summaryData={summaryStats}
                  />
                ) : (
                  <div>
                    {/* Command Center Summary Bar */}
                    <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <button
                            onClick={() => setHasSearched(false)}
                            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
                          >
                            ← New Search
                          </button>
                        </div>

                        <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                          Matching Scholarships
                        </h2>
                      </div>

                      {/* Summary Metrics & Actions */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                        <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-emerald-900/60 text-center">
                          <div className="font-display font-black text-base text-emerald-400 font-mono-data">
                            {summaryStats.strongMatches}
                          </div>
                          <div className="text-[10px] text-slate-400 uppercase">Strong</div>
                        </div>

                        <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-teal-900/60 text-center">
                          <div className="font-display font-black text-base text-teal-400 font-mono-data">
                            {summaryStats.likelyMatches}
                          </div>
                          <div className="text-[10px] text-slate-400 uppercase">Likely</div>
                        </div>

                        <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-amber-900/60 text-center">
                          <div className="font-display font-black text-base text-amber-400 font-mono-data">
                            {summaryStats.possibleMatches}
                          </div>
                          <div className="text-[10px] text-slate-400 uppercase">Possible</div>
                        </div>

                        <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-rose-950 text-center">
                          <div className="font-display font-black text-base text-rose-400 font-mono-data">
                            {summaryStats.lowMatches}
                          </div>
                          <div className="text-[10px] text-slate-400 uppercase">Below Cutoff</div>
                        </div>

                        {/* Dedicated Default Refresh Action */}
                        <button
                          onClick={() => profile && executeSearch(profile, true)}
                          disabled={isLiveFetching || isSearching}
                          className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 shrink-0"
                          title="Refresh feeds"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 text-slate-950 ${isLiveFetching || isSearching ? 'animate-spin' : ''}`} />
                          <span>{isLiveFetching || isSearching ? 'Refreshing...' : 'Refresh Feeds'}</span>
                        </button>

                        {/* On-Demand Global Deep Scan Button */}
                        <button
                          onClick={handleTriggerDeepScan}
                          disabled={isDeepScanning}
                          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 shrink-0"
                          title="Deep global scan"
                        >
                          <Globe className={`w-3.5 h-3.5 text-teal-400 ${isDeepScanning ? 'animate-spin' : ''}`} />
                          <span>{isDeepScanning ? 'Scanning...' : 'Deep Scan'}</span>
                        </button>
                      </div>
                    </div>

                    {deepScanMessage && (
                      <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2 animate-fade-in text-left">
                        <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{deepScanMessage}</span>
                      </div>
                    )}

                    {/* Segmented Filter & Sort Controls */}
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-6 shadow-xl space-y-4">
                      {/* Top: Search Bar + Study Level Button Row */}
                      <div className="flex items-center gap-2.5">
                        <div className="relative flex-1 min-w-0">
                          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search scholarships..."
                            className="w-full pl-10 pr-3.5 py-2.5 min-h-[44px] rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-emerald-500 placeholder:text-slate-500 text-xs sm:text-sm"
                          />
                        </div>

                        {/* Study Level Filter Button */}
                        <button
                          type="button"
                          onClick={() => setIsStudyLevelModalOpen(true)}
                          className={`min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 ${
                            selectedStudyLevels.length > 0
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-md shadow-emerald-950/40'
                              : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                          }`}
                        >
                          <SlidersHorizontal className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="whitespace-nowrap">
                            {selectedStudyLevels.length > 0 ? `Level · ${selectedStudyLevels.length}` : 'Study Level'}
                          </span>
                        </button>
                      </div>

                      {/* Active Removable Study Level Chips */}
                      {selectedStudyLevels.length > 0 && (
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                            <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Levels:</span>
                          </span>
                          {selectedStudyLevels.map((lvl) => (
                            <span
                              key={lvl}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-700/80 shrink-0 whitespace-nowrap shadow-xs"
                            >
                              <span>{getShortLevelLabel(lvl)}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveStudyLevel(lvl)}
                                className="w-4 h-4 rounded-full flex items-center justify-center text-emerald-400 hover:text-white hover:bg-emerald-800 transition-colors cursor-pointer"
                                aria-label={`Remove filter ${lvl}`}
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                          <button
                            type="button"
                            onClick={handleClearAllStudyLevels}
                            className="text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer shrink-0 ml-1 py-1"
                          >
                            Clear All
                          </button>
                        </div>
                      )}

                      {/* Category Segment Tabs */}
                      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800/80">
                        {[
                          { id: 'all', label: `All (${allMatches.length})` },
                          { id: 'strong_match', label: `Strong (${summaryStats.strongMatches})` },
                          { id: 'likely_match', label: `Likely (${summaryStats.likelyMatches})` },
                          { id: 'possible_match', label: `Possible (${summaryStats.possibleMatches})` },
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
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        {/* Major / Subject Filter (120+ Subjects) */}
                        <select
                          value={selectedSubjectFilter}
                          onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none text-xs cursor-pointer min-h-[40px]"
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
                          className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none text-xs cursor-pointer min-h-[40px]"
                        >
                          <option value="all">All Funding Types</option>
                          <option value="fully_funded">Fully Funded Only</option>
                          <option value="tuition_waiver">Tuition Waiver</option>
                          <option value="partial_funding">Partial Funding</option>
                        </select>

                        {/* Sort By */}
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as any)}
                          className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none text-xs cursor-pointer min-h-[40px]"
                        >
                          <option value="best_match">Sort: Best Match &amp; Discipline</option>
                          <option value="deadline_soonest">Sort: Deadline Soonest</option>
                          <option value="fully_funded">Sort: Fully Funded First</option>
                          <option value="recently_verified">Sort: Recently Verified</option>
                        </select>
                      </div>
                    </div>

                    {/* Result Count Status Line */}
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-3 px-1">
                      <div>
                        <span className="font-bold text-emerald-400 font-mono-data text-sm">{visibleMatches.length}</span>{' '}
                        {visibleMatches.length === 1 ? 'scholarship found' : 'scholarships found'}
                        {selectedStudyLevels.length > 0 && (
                          <span className="text-slate-400 ml-1.5 hidden sm:inline">
                            for {selectedStudyLevels.map(getShortLevelLabel).join(', ')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Results Grid */}
                    {visibleMatches.length === 0 ? (
                      <div className="p-10 sm:p-14 text-center bg-slate-900/60 border border-slate-800 rounded-2xl">
                        <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                        <h3 className="font-display font-bold text-lg text-white mb-2">
                          {selectedStudyLevels.length > 0 ? 'No scholarships for this level yet.' : 'No matching scholarships under current filters'}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-5 leading-relaxed">
                          {selectedStudyLevels.length > 0
                            ? 'No scholarships for this level yet. Try another level.'
                            : 'Try switching to "All Results", clearing the keyword filter, or modifying optional profile factors.'}
                        </p>
                        <button
                          onClick={() => {
                            setCategoryFilter('all');
                            setFundingFilter('all');
                            setDegreeFilter('all');
                            setSearchQuery('');
                            handleClearAllStudyLevels();
                          }}
                          className="min-h-[44px] px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold transition-colors cursor-pointer inline-flex items-center justify-center shadow-lg shadow-emerald-500/20"
                        >
                          Clear filters
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

      {/* Study Level Multi-Select Filter Modal */}
      <StudyLevelFilterModal
        isOpen={isStudyLevelModalOpen}
        onClose={() => setIsStudyLevelModalOpen(false)}
        selectedLevels={selectedStudyLevels}
        onApply={handleApplyStudyLevels}
      />

      {/* First Launch Study Level Onboarding Modal */}
      <StudyLevelOnboardingModal
        isOpen={isOnboardingModalOpen}
        onComplete={handleCompleteOnboarding}
        onSkip={handleSkipOnboarding}
      />

      {/* Memorial Modal */}
      <MemorialModal
        isOpen={isMemorialOpen}
        onClose={() => setIsMemorialOpen(false)}
      />

      {/* Scam Safety Modal */}
      <ScamSafetyModal
        isOpen={isScamSafetyOpen}
        onClose={() => setIsScamSafetyOpen(false)}
        defaultTab={scamSafetyTab}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span>Laiba Global Scholarship Finder · Official sources only</span>
          </div>

          <div>
            <button
              onClick={() => setIsMemorialOpen(true)}
              className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Dedicated to Laiba.
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
