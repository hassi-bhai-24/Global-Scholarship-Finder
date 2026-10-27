import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, ChevronDown, Check, Building, Globe, BookOpen, 
  GraduationCap, SlidersHorizontal, Award, ChevronUp
} from 'lucide-react';
import { COUNTRIES } from '../data/countries';
import { searchUniversities } from '../data/universities';
import { searchSubjects } from '../data/subjects';
import { 
  ADAPTIVE_STUDY_LEVELS, 
  EDUCATION_STATUS_BY_LEVEL, 
  PAKISTANI_BOARDS, 
  BOARD_CURRICULA, 
  TARGET_DESTINATIONS,
  normalizeLevelToCanonical 
} from '../data/studyLevels';
import { CGPAScale, StudentProfile, PreUniResult } from '../types/scholarship';

interface HeroSearchProps {
  onSearch: (profile: StudentProfile, liveSearch: boolean) => void;
  initialProfile?: StudentProfile;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ onSearch, initialProfile }) => {
  // 1. FIELD 1: Nationality / Country
  const [selectedCountry, setSelectedCountry] = useState<string>(initialProfile?.country || 'Pakistan');
  const [countryQuery, setCountryQuery] = useState('');
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  // 2. FIELD 2: Study Level (controls the rest of the form)
  const defaultStudyLevel = initialProfile?.studyLevel || "Undergraduate / Bachelor's (after Intermediate / A-Levels / 12th grade)";
  const [selectedStudyLevel, setSelectedStudyLevel] = useState<string>(defaultStudyLevel);
  const [isStudyLevelOpen, setIsStudyLevelOpen] = useState(false);
  const studyLevelDropdownRef = useRef<HTMLDivElement>(null);

  // Check if study level is undergraduate / pre-university
  const isUndergrad = selectedStudyLevel.includes("Undergraduate") || 
                      selectedStudyLevel.includes("Intermediate") || 
                      selectedStudyLevel.includes("12th");

  const isPostgraduate = selectedStudyLevel.includes("Master") || 
                         selectedStudyLevel.includes("PhD") || 
                         selectedStudyLevel.includes("Postdoctoral");

  // 3. FIELD 3: Current Education Status
  const getStatusCategory = (level: string) => {
    if (level.includes("Undergraduate") || level.includes("Intermediate") || level.includes("12th")) return "undergraduate";
    if (level.includes("Master")) return "masters";
    if (level.includes("PhD")) return "phd";
    if (level.includes("Postdoctoral")) return "postdoc";
    return "diploma_short";
  };

  const statusOptions = EDUCATION_STATUS_BY_LEVEL[getStatusCategory(selectedStudyLevel)] || EDUCATION_STATUS_BY_LEVEL.undergraduate;
  const [selectedStatus, setSelectedStatus] = useState<string>(
    initialProfile?.educationStatus || statusOptions[0].label
  );
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement>(null);

  // Automatically update status default when Study Level changes
  useEffect(() => {
    const category = getStatusCategory(selectedStudyLevel);
    const newOptions = EDUCATION_STATUS_BY_LEVEL[category] || EDUCATION_STATUS_BY_LEVEL.undergraduate;
    const exists = newOptions.some(o => o.label === selectedStatus);
    if (!exists) {
      setSelectedStatus(newOptions[0].label);
    }
  }, [selectedStudyLevel]);

  // University Field (Smart Default based on Study Level & Status)
  const isTransferring = selectedStatus.toLowerCase().includes("transferring");
  const requiresUni = !isUndergrad || isTransferring;
  const [showCustomUniInput, setShowCustomUniInput] = useState(isTransferring || (!isUndergrad && initialProfile?.university !== 'No university experience'));

  const [selectedUniversity, setSelectedUniversity] = useState<string>(() => {
    if (initialProfile?.university) return initialProfile.university;
    if (isUndergrad && !isTransferring) return "No university experience";
    return 'The Islamia University of Bahawalpur (IUB BWP)';
  });

  const [uniQuery, setUniQuery] = useState<string>(() => {
    if (initialProfile?.university) return initialProfile.university;
    if (isUndergrad && !isTransferring) return "No university experience";
    return 'The Islamia University of Bahawalpur (IUB BWP)';
  });
  const [isUniOpen, setIsUniOpen] = useState(false);
  const uniDropdownRef = useRef<HTMLDivElement>(null);

  // When study level changes, update university smart defaults
  useEffect(() => {
    if (isUndergrad && !isTransferring) {
      setSelectedUniversity("No university experience");
      setUniQuery("No university experience");
      setShowCustomUniInput(false);
    } else {
      if (selectedUniversity === "No university experience") {
        const defaultUni = selectedCountry === 'Pakistan' 
          ? 'The Islamia University of Bahawalpur (IUB BWP)' 
          : 'National University';
        setSelectedUniversity(defaultUni);
        setUniQuery(defaultUni);
      }
      setShowCustomUniInput(true);
    }
  }, [selectedStudyLevel, isTransferring]);

  // 4. FIELD 4: Field of Study / Major
  const [selectedField, setSelectedField] = useState<string>(
    initialProfile?.field || 'Computer Science'
  );
  const [fieldQuery, setFieldQuery] = useState('');
  const [isFieldOpen, setIsFieldOpen] = useState(false);
  const fieldDropdownRef = useRef<HTMLDivElement>(null);

  // 5. FIELD 5: Academic Result (Pre-University vs University)
  // Pre-University specific states
  const [boardCurriculum, setBoardCurriculum] = useState<string>(
    initialProfile?.preUniResult?.boardCurriculum || 'Pakistani Board (BISE / Federal)'
  );
  const [specificBoard, setSpecificBoard] = useState<string>(
    initialProfile?.preUniResult?.specificBoard || 'BISE Lahore'
  );
  const [preUniPercentage, setPreUniPercentage] = useState<string>(
    initialProfile?.preUniResult?.percentage ? String(initialProfile.preUniResult.percentage) : '85'
  );
  const [obtainedMarks, setObtainedMarks] = useState<string>(
    initialProfile?.preUniResult?.obtainedMarks ? String(initialProfile.preUniResult.obtainedMarks) : '935'
  );
  const [totalMarks, setTotalMarks] = useState<string>(
    initialProfile?.preUniResult?.totalMarks ? String(initialProfile.preUniResult.totalMarks) : '1100'
  );
  const [resultMode, setResultMode] = useState<'percentage' | 'marks'>('percentage');
  const [aLevelGrades, setALevelGrades] = useState<string>(
    initialProfile?.preUniResult?.grades || '3 A*s'
  );
  const [ibPoints, setIbPoints] = useState<string>(
    initialProfile?.preUniResult?.ibPoints ? String(initialProfile.preUniResult.ibPoints) : '38'
  );
  const [highSchoolGpa, setHighSchoolGpa] = useState<string>(
    initialProfile?.preUniResult?.highSchoolGpa ? String(initialProfile.preUniResult.highSchoolGpa) : '3.8'
  );
  const [hasFailedPapersPreUni, setHasFailedPapersPreUni] = useState<boolean>(
    initialProfile?.preUniResult?.hasFailedPapers || false
  );
  const [entranceTest, setEntranceTest] = useState<string>(
    initialProfile?.preUniResult?.entranceTest || 'None / Not taken'
  );

  // Auto-calculate percentage from marks
  useEffect(() => {
    if (resultMode === 'marks') {
      const obt = parseFloat(obtainedMarks);
      const tot = parseFloat(totalMarks);
      if (!isNaN(obt) && !isNaN(tot) && tot > 0) {
        const pct = ((obt / tot) * 100).toFixed(1);
        setPreUniPercentage(pct);
      }
    }
  }, [obtainedMarks, totalMarks, resultMode]);

  // University CGPA states (with ample width to avoid clipping full value e.g. 3.65)
  const [cgpa, setCgpa] = useState<string>(initialProfile?.cgpa ? String(initialProfile.cgpa) : '3.65');
  const [cgpaScale, setCgpaScale] = useState<CGPAScale>(initialProfile?.cgpaScale || '4.0');
  const [failedSubjects, setFailedSubjects] = useState<string>(
    initialProfile?.failedSubjects !== undefined ? String(initialProfile.failedSubjects) : '0'
  );

  // 6. FIELD 6: Target Destination (default: Worldwide)
  const [targetDestination, setTargetDestination] = useState<string>(
    initialProfile?.targetDestination || 'Worldwide'
  );
  const [isDestinationOpen, setIsDestinationOpen] = useState(false);
  const destinationDropdownRef = useRef<HTMLDivElement>(null);

  // Optional: Collapsible "More filters" (Language, Finance, etc.)
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [englishFilter, setEnglishFilter] = useState<'all' | 'ielts' | 'toefl' | 'duolingo' | 'none_yet' | 'not_required'>(
    initialProfile?.englishTestFilter || 'all'
  );
  const [fundingFilter, setFundingFilter] = useState<'all' | 'full' | 'partial' | 'tuition' | 'stipend'>(
    initialProfile?.fundingTypeFilter || 'all'
  );
  const [financialNeed, setFinancialNeed] = useState<'all' | 'yes' | 'no' | 'prefer_not_say'>(
    initialProfile?.financialNeedStatus || 'all'
  );
  const [genderMinority, setGenderMinority] = useState<string>(
    initialProfile?.genderOrMinorityFilter || 'any'
  );

  // Live Grounding toggle (default true)
  const [enableLiveSearch, setEnableLiveSearch] = useState(true);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
      if (studyLevelDropdownRef.current && !studyLevelDropdownRef.current.contains(event.target as Node)) {
        setIsStudyLevelOpen(false);
      }
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
      if (uniDropdownRef.current && !uniDropdownRef.current.contains(event.target as Node)) {
        setIsUniOpen(false);
      }
      if (fieldDropdownRef.current && !fieldDropdownRef.current.contains(event.target as Node)) {
        setIsFieldOpen(false);
      }
      if (destinationDropdownRef.current && !destinationDropdownRef.current.contains(event.target as Node)) {
        setIsDestinationOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCountries = COUNTRIES.filter(c => 
    c.name.toLowerCase().includes(countryQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(countryQuery.toLowerCase())
  );

  const matchingUniversities = searchUniversities(uniQuery, selectedCountry);
  const filteredSubjects = searchSubjects(fieldQuery);
  const currentCountryItem = COUNTRIES.find(c => c.name === selectedCountry) || COUNTRIES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // 1. Validate Country
    if (!selectedCountry) {
      setValidationError('Please select your country.');
      return;
    }

    // 2. Validate Study Level
    if (!selectedStudyLevel) {
      setValidationError('Please select a study level.');
      return;
    }

    // 3. Validate University
    const isPreUni = isUndergrad && !isTransferring;
    const finalUni = isPreUni ? "No university experience" : (selectedUniversity.trim() || uniQuery.trim());

    if (!isPreUni && (!finalUni || finalUni === "No university experience")) {
      setValidationError('Please specify your current / graduated university.');
      return;
    }

    // 4. Validate Academic Results
    let finalCgpa = 3.65;
    let finalCgpaScale: CGPAScale = '4.0';
    let finalFails = 0;
    let preUniObj: PreUniResult | undefined = undefined;

    if (isPreUni) {
      let pct = parseFloat(preUniPercentage);
      if (isNaN(pct) || pct < 0 || pct > 100) {
        pct = 85;
      }
      
      // Normalize board percentage or grades to equivalent 4.0 scale
      if (boardCurriculum.includes('Cambridge')) {
        finalCgpa = aLevelGrades.includes('A*') ? 3.95 : aLevelGrades.includes('A') ? 3.75 : 3.4;
      } else if (boardCurriculum.includes('IB')) {
        const pts = parseFloat(ibPoints) || 38;
        finalCgpa = Math.min(4.0, (pts / 45) * 4.2);
      } else if (boardCurriculum.includes('American')) {
        finalCgpa = parseFloat(highSchoolGpa) || 3.8;
      } else {
        finalCgpa = Math.min(4.0, Math.max(1.0, (pct / 100) * 4.0));
      }

      finalFails = hasFailedPapersPreUni ? 1 : 0;
      preUniObj = {
        boardCurriculum,
        specificBoard: boardCurriculum.includes('Pakistani') ? specificBoard : undefined,
        resultMode,
        percentage: pct,
        obtainedMarks: parseFloat(obtainedMarks) || undefined,
        totalMarks: parseFloat(totalMarks) || undefined,
        grades: boardCurriculum.includes('Cambridge') ? aLevelGrades : undefined,
        ibPoints: boardCurriculum.includes('IB') ? parseFloat(ibPoints) : undefined,
        highSchoolGpa: boardCurriculum.includes('American') ? parseFloat(highSchoolGpa) : undefined,
        hasFailedPapers: hasFailedPapersPreUni,
        entranceTest: entranceTest !== 'None / Not taken' ? entranceTest : undefined
      };
    } else {
      const parsedCgpa = parseFloat(cgpa);
      if (isNaN(parsedCgpa) || parsedCgpa < 0) {
        setValidationError('Please enter a valid CGPA.');
        return;
      }

      if (cgpaScale === '4.0' && parsedCgpa > 4.0) {
        setValidationError('CGPA cannot exceed 4.0.');
        return;
      }
      if (cgpaScale === '5.0' && parsedCgpa > 5.0) {
        setValidationError('CGPA cannot exceed 5.0.');
        return;
      }
      if (cgpaScale === '10.0' && parsedCgpa > 10.0) {
        setValidationError('CGPA cannot exceed 10.0.');
        return;
      }
      if (cgpaScale === '100%' && parsedCgpa > 100) {
        setValidationError('Score cannot exceed 100%.');
        return;
      }

      finalCgpa = parsedCgpa;
      finalCgpaScale = cgpaScale;
      const parsedFails = parseInt(failedSubjects, 10);
      finalFails = isNaN(parsedFails) || parsedFails < 0 ? 0 : parsedFails;
    }

    const mapStudyLevelToDegreeLevel = (lvl: string): 'bachelors' | 'masters' | 'phd' | 'exchange' | 'postdoc' | 'any' => {
      const l = lvl.toLowerCase();
      if (l.includes('undergraduate') || l.includes('bachelor') || l.includes('intermediate') || l.includes('12th')) return 'bachelors';
      if (l.includes('master')) return 'masters';
      if (l.includes('phd') || l.includes('doctor')) return 'phd';
      if (l.includes('postdoc') || l.includes('research')) return 'postdoc';
      return 'any';
    };

    const profile: StudentProfile = {
      country: selectedCountry,
      university: finalUni,
      studyLevel: selectedStudyLevel,
      educationStatus: selectedStatus,
      isPreUniversity: isPreUni,
      preUniResult: preUniObj,
      degreeLevel: mapStudyLevelToDegreeLevel(selectedStudyLevel),
      cgpa: finalCgpa,
      cgpaScale: finalCgpaScale,
      failedSubjects: finalFails,
      field: selectedField.trim() || undefined,
      targetDestination,
      englishTestFilter: englishFilter,
      fundingTypeFilter: fundingFilter,
      financialNeedStatus: financialNeed,
      genderOrMinorityFilter: genderMinority !== 'any' ? genderMinority : undefined
    };

    onSearch(profile, enableLiveSearch);
  };

  return (
    <div className="relative overflow-hidden pt-6 pb-10 lg:pt-10 lg:pb-14 w-full">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[380px] bg-gradient-to-tr from-emerald-600/10 via-teal-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Title restricted to max 2 lines with generous white space */}
        <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight max-w-3xl mx-auto mb-6 sm:mb-8">
          Find Scholarships You{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
            Actually Qualify For.
          </span>
        </h1>

        {/* Adaptive Form Card */}
        <div className="w-full max-w-5xl mx-auto bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-7 text-left backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* ROW 1: Field 1 (Country) & Field 2 (Study Level) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* 1) Nationality / Country */}
              <div className="relative" ref={countryDropdownRef}>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>1. Nationality / Country</span>
                  <span className="text-[10px] text-emerald-400 font-bold">*</span>
                </label>
                
                <button
                  type="button"
                  onClick={() => setIsCountryOpen(!isCountryOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 hover:border-emerald-500/60 text-slate-100 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px] cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-lg leading-none">{currentCountryItem.flag}</span>
                    <span className="text-sm font-medium truncate">{selectedCountry}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                </button>

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
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors hover:bg-slate-800 cursor-pointer min-h-[42px] ${
                            selectedCountry === c.name ? 'bg-emerald-950/60 text-emerald-400 font-semibold' : 'text-slate-200'
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

              {/* 2) Study Level (controls the rest of the form) */}
              <div className="relative" ref={studyLevelDropdownRef}>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>2. Target Study Level</span>
                  <span className="text-[10px] text-emerald-400 font-bold">*</span>
                </label>

                <button
                  type="button"
                  onClick={() => setIsStudyLevelOpen(!isStudyLevelOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/70 hover:border-emerald-400 text-slate-100 text-left transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px] cursor-pointer shadow-sm shadow-emerald-500/10"
                >
                  <div className="flex items-center gap-2 truncate">
                    <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold truncate text-white">
                      {selectedStudyLevel}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1.5" />
                </button>

                {isStudyLevelOpen && (
                  <div className="absolute z-50 left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-80 flex flex-col">
                    <div className="overflow-y-auto divide-y divide-slate-800/40">
                      {ADAPTIVE_STUDY_LEVELS.map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => {
                            setSelectedStudyLevel(lvl);
                            setIsStudyLevelOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors hover:bg-slate-800 cursor-pointer min-h-[44px] ${
                            selectedStudyLevel === lvl
                              ? 'bg-emerald-950/70 text-emerald-300 font-semibold'
                              : 'text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <GraduationCap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate">{lvl}</span>
                          </div>
                          {selectedStudyLevel === lvl && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ROW 2: Field 3 (Current Education Status) & University Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* 3) Current Education Status */}
              <div className="relative" ref={statusDropdownRef}>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>3. Current Education Status</span>
                  <span className="text-[10px] text-emerald-400 font-bold">*</span>
                </label>

                <button
                  type="button"
                  onClick={() => setIsStatusOpen(!isStatusOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 hover:border-slate-600 text-slate-100 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px] cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-medium truncate text-slate-200">
                    {selectedStatus}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1.5" />
                </button>

                {isStatusOpen && (
                  <div className="absolute z-50 left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-72 flex flex-col">
                    <div className="overflow-y-auto divide-y divide-slate-800/40">
                      {statusOptions.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setSelectedStatus(opt.label);
                            setIsStatusOpen(false);
                            if (opt.id === 'uni_transfer') {
                              setShowCustomUniInput(true);
                            }
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors hover:bg-slate-800 cursor-pointer min-h-[42px] ${
                            selectedStatus === opt.label
                              ? 'bg-emerald-950/60 text-emerald-300 font-semibold'
                              : 'text-slate-200'
                          }`}
                        >
                          <span className="truncate">{opt.label}</span>
                          {selectedStatus === opt.label && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 4) University Field (Smart Default for Pre-Univ / Required for Grad) */}
              <div className="relative" ref={uniDropdownRef}>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    {requiresUni ? 'Current / Graduated University' : 'University (Optional)'}
                  </label>
                  {requiresUni ? (
                    <span className="text-[10px] text-emerald-400 font-bold">*</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowCustomUniInput(!showCustomUniInput)}
                      className="text-[11px] text-emerald-400 hover:text-emerald-300 underline cursor-pointer"
                    >
                      {showCustomUniInput ? 'Clear' : 'Transferring? Pick Uni'}
                    </button>
                  )}
                </div>

                {requiresUni || showCustomUniInput ? (
                  <div className="relative">
                    <input
                      type="text"
                      value={uniQuery === 'No university experience' ? '' : uniQuery}
                      onChange={(e) => {
                        setUniQuery(e.target.value);
                        setSelectedUniversity(e.target.value);
                        setIsUniOpen(true);
                      }}
                      onFocus={() => setIsUniOpen(true)}
                      placeholder="University name or acronym"
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 hover:border-slate-600 text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder:text-slate-500 min-h-[44px]"
                    />
                    <Building className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />

                    {isUniOpen && (
                      <div className="absolute z-50 left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-72 flex flex-col">
                        {uniQuery.trim().length > 0 && uniQuery !== 'No university experience' && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedUniversity(uniQuery.trim());
                              setIsUniOpen(false);
                            }}
                            className="w-full px-3.5 py-2.5 text-xs text-left bg-emerald-950/60 hover:bg-emerald-900/70 text-emerald-300 flex items-center justify-between border-b border-slate-800 transition-colors cursor-pointer min-h-[40px]"
                          >
                            <span className="font-semibold truncate">Select "{uniQuery.trim()}"</span>
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          </button>
                        )}

                        <div className="overflow-y-auto divide-y divide-slate-800/40">
                          {matchingUniversities.slice(0, 20).map((u, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setSelectedUniversity(u.name);
                                setUniQuery(u.name);
                                setIsUniOpen(false);
                              }}
                              className="w-full px-3.5 py-2.5 text-xs text-left transition-colors hover:bg-slate-800 text-slate-200 flex flex-col cursor-pointer min-h-[42px]"
                            >
                              <span className="font-semibold text-slate-100">{u.name}</span>
                              <span className="text-[11px] text-slate-400">{u.city ? `${u.city}, ` : ''}{u.country}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-400 text-xs sm:text-sm min-h-[44px]">
                    <span className="font-medium text-slate-300">No university experience (Default)</span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-900 text-emerald-400 border border-emerald-900/40 font-semibold">
                      Direct Entry
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* ROW 3: Field 4 (Field of Study) & Field 6 (Target Destination) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* 4) Field of Study / Major */}
              <div className="relative" ref={fieldDropdownRef}>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>4. Field / Major</span>
                  <span className="text-[10px] text-slate-500">All fields open</span>
                </label>

                <button
                  type="button"
                  onClick={() => setIsFieldOpen(!isFieldOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 hover:border-slate-600 text-slate-100 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px] cursor-pointer"
                >
                  <div className="flex items-center gap-2 truncate">
                    <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium truncate text-white">
                      {selectedField || "All Disciplines"}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1.5" />
                </button>

                {isFieldOpen && (
                  <div className="absolute z-50 left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-72 flex flex-col">
                    <div className="p-2 border-b border-slate-800 bg-slate-950/90">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Search subjects..."
                          value={fieldQuery}
                          onChange={(e) => setFieldQuery(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="overflow-y-auto divide-y divide-slate-800/40">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedField('');
                          setIsFieldOpen(false);
                          setFieldQuery('');
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors hover:bg-slate-800 cursor-pointer min-h-[40px] ${
                          !selectedField ? 'bg-emerald-950/60 text-emerald-400 font-semibold' : 'text-slate-300'
                        }`}
                      >
                        <span>All Disciplines</span>
                        {!selectedField && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                      </button>

                      {filteredSubjects.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            setSelectedField(s.name);
                            setIsFieldOpen(false);
                            setFieldQuery('');
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors hover:bg-slate-800 cursor-pointer min-h-[40px] ${
                            selectedField === s.name ? 'bg-emerald-950/40 text-emerald-400 font-semibold' : 'text-slate-200'
                          }`}
                        >
                          <span className="font-medium text-slate-100 truncate">{s.name}</span>
                          {selectedField === s.name && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 6) Target Destination (default: Worldwide) */}
              <div className="relative" ref={destinationDropdownRef}>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>6. Target Destination</span>
                  <span className="text-[10px] text-slate-500">Global</span>
                </label>

                <button
                  type="button"
                  onClick={() => setIsDestinationOpen(!isDestinationOpen)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 hover:border-slate-600 text-slate-100 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px] cursor-pointer"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium truncate text-white">
                      {targetDestination}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1.5" />
                </button>

                {isDestinationOpen && (
                  <div className="absolute z-50 left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden max-h-72 flex flex-col">
                    <div className="overflow-y-auto divide-y divide-slate-800/40">
                      {TARGET_DESTINATIONS.map((dest) => (
                        <button
                          key={dest}
                          type="button"
                          onClick={() => {
                            setTargetDestination(dest);
                            setIsDestinationOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors hover:bg-slate-800 cursor-pointer min-h-[40px] ${
                            targetDestination === dest
                              ? 'bg-emerald-950/60 text-emerald-300 font-semibold'
                              : 'text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate">{dest}</span>
                          </div>
                          {targetDestination === dest && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick-Select Popular Majors */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {[
                "Computer Science",
                "Food Science",
                "Psychology",
                "Data Science",
                "Engineering",
                "Economics",
                "Business / MBA",
                "Biotechnology"
              ].map(subj => {
                const matchVal = subj === "Data Science" ? "Data Science & Big Data Analytics" :
                                 subj === "Business / MBA" ? "Business Administration (MBA / BBA)" :
                                 subj === "Biotechnology" ? "Biotechnology & Applied Microbiology" : subj;
                const isSelected = selectedField === matchVal;
                return (
                  <button
                    key={subj}
                    type="button"
                    onClick={() => setSelectedField(isSelected ? "" : matchVal)}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer text-[11px] font-medium ${
                      isSelected
                        ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 shadow-sm font-semibold"
                        : "bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800/80"
                    }`}
                  >
                    {subj}
                  </button>
                );
              })}
            </div>

            {/* ROW 4: Field 5 (Academic Result) - Adapts completely based on level */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-3.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  5. Academic Result {isUndergrad && !isTransferring ? '(School / Board)' : '(CGPA & Backlogs)'}
                </label>
                <span className="text-[10px] text-slate-400 font-mono-data">
                  {isUndergrad && !isTransferring ? 'No CGPA Required' : 'University Grading'}
                </span>
              </div>

              {/* PRE-UNIVERSITY RESULT ADAPTATION */}
              {isUndergrad && !isTransferring ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    
                    {/* Curriculum / Board Dropdown */}
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Board / Curriculum</label>
                      <select
                        value={boardCurriculum}
                        onChange={(e) => setBoardCurriculum(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-emerald-500 min-h-[42px] cursor-pointer"
                      >
                        {BOARD_CURRICULA.map(b => (
                          <option key={b.id} value={b.label}>{b.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Specific Board (if Pakistani) or Result Input */}
                    {boardCurriculum.includes('Pakistani') ? (
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Specific Board</label>
                        <select
                          value={specificBoard}
                          onChange={(e) => setSpecificBoard(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-emerald-500 min-h-[42px] cursor-pointer"
                        >
                          {PAKISTANI_BOARDS.map(b => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                    ) : null}

                    {/* Dynamic Score Input based on Curriculum */}
                    <div>
                      {boardCurriculum.includes('Pakistani') || boardCurriculum.includes('Other') ? (
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-[11px] text-slate-400">Board Percentage</label>
                            <div className="flex items-center gap-1.5 text-[10px]">
                              <button
                                type="button"
                                onClick={() => setResultMode('percentage')}
                                className={`px-1.5 py-0.5 rounded ${resultMode === 'percentage' ? 'bg-emerald-500/30 text-emerald-300 font-bold' : 'text-slate-500'}`}
                              >
                                %
                              </button>
                              <button
                                type="button"
                                onClick={() => setResultMode('marks')}
                                className={`px-1.5 py-0.5 rounded ${resultMode === 'marks' ? 'bg-emerald-500/30 text-emerald-300 font-bold' : 'text-slate-500'}`}
                              >
                                Marks
                              </button>
                            </div>
                          </div>

                          {resultMode === 'percentage' ? (
                            <div className="relative min-h-[42px]">
                              <input
                                type="number"
                                step="0.1"
                                min="30"
                                max="100"
                                value={preUniPercentage}
                                onChange={(e) => setPreUniPercentage(e.target.value)}
                                placeholder="85.0"
                                className="w-full pl-3 pr-8 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs sm:text-sm font-mono-data focus:outline-none focus:border-emerald-500 min-h-[42px]"
                              />
                              <span className="absolute right-3 top-3 text-slate-400 text-xs font-bold">%</span>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-1.5 min-h-[42px]">
                              <input
                                type="number"
                                value={obtainedMarks}
                                onChange={(e) => setObtainedMarks(e.target.value)}
                                placeholder="Obt"
                                className="w-full px-2.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono-data focus:outline-none"
                              />
                              <input
                                type="number"
                                value={totalMarks}
                                onChange={(e) => setTotalMarks(e.target.value)}
                                placeholder="Tot"
                                className="w-full px-2.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs font-mono-data focus:outline-none"
                              />
                            </div>
                          )}
                        </div>
                      ) : boardCurriculum.includes('Cambridge') ? (
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">A-Level Grades</label>
                          <select
                            value={aLevelGrades}
                            onChange={(e) => setALevelGrades(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-emerald-500 min-h-[42px] cursor-pointer"
                          >
                            <option value="3 A*s">3 A*s</option>
                            <option value="2 A*s 1 A">2 A*s 1 A</option>
                            <option value="3 As">3 As</option>
                            <option value="2 As 1 B">2 As 1 B</option>
                            <option value="1 A 2 Bs">1 A 2 Bs</option>
                            <option value="3 Bs">3 Bs</option>
                            <option value="B B C">B B C</option>
                          </select>
                        </div>
                      ) : boardCurriculum.includes('IB') ? (
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">IB Points (out of 45)</label>
                          <input
                            type="number"
                            min="24"
                            max="45"
                            value={ibPoints}
                            onChange={(e) => setIbPoints(e.target.value)}
                            placeholder="38"
                            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs sm:text-sm font-mono-data focus:outline-none focus:border-emerald-500 min-h-[42px]"
                          />
                        </div>
                      ) : (
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">High School GPA (/ 4.0)</label>
                          <input
                            type="number"
                            step="0.01"
                            min="2.0"
                            max="4.0"
                            value={highSchoolGpa}
                            onChange={(e) => setHighSchoolGpa(e.target.value)}
                            placeholder="3.8"
                            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs sm:text-sm font-mono-data focus:outline-none focus:border-emerald-500 min-h-[42px]"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Pre-University: Failed Papers Switch & Entrance Test */}
                  <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-300 font-medium">Any failed papers / compartments?</span>
                      <div className="inline-flex rounded-lg bg-slate-900 p-0.5 border border-slate-800">
                        <button
                          type="button"
                          onClick={() => setHasFailedPapersPreUni(false)}
                          className={`px-3 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                            !hasFailedPapersPreUni
                              ? 'bg-emerald-500 text-slate-950 shadow-sm'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          No
                        </button>
                        <button
                          type="button"
                          onClick={() => setHasFailedPapersPreUni(true)}
                          className={`px-3 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                            hasFailedPapersPreUni
                              ? 'bg-rose-500 text-white shadow-sm'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Yes
                        </button>
                      </div>
                    </div>

                    {/* Entrance Test Optional */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <span className="text-slate-400 text-[11px]">Test (Optional):</span>
                      <select
                        value={entranceTest}
                        onChange={(e) => setEntranceTest(e.target.value)}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs focus:outline-none cursor-pointer"
                      >
                        <option value="None / Not taken">None / Not taken</option>
                        <option value="SAT 1350+">SAT (1350+)</option>
                        <option value="ACT 29+">ACT (29+)</option>
                        <option value="MDCAT 170+">MDCAT</option>
                        <option value="ECAT Passed">ECAT</option>
                        <option value="IELTS 6.5+">IELTS 6.5+</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                /* UNIVERSITY-LEVEL RESULT (CGPA & Backlogs) */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* CGPA with generous width to prevent clipping full value (e.g. 3.65) */}
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Cumulative CGPA <span className="text-emerald-400">*</span>
                    </label>
                    <div className="flex rounded-xl bg-slate-900 border border-slate-700 focus-within:ring-2 focus-within:ring-emerald-500/50 overflow-hidden min-h-[44px]">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={cgpa}
                        onChange={(e) => setCgpa(e.target.value)}
                        placeholder="3.65"
                        className="w-full px-3.5 py-2.5 bg-transparent text-slate-100 text-sm font-mono-data focus:outline-none min-w-[90px]"
                      />
                      <select
                        value={cgpaScale}
                        onChange={(e) => setCgpaScale(e.target.value as CGPAScale)}
                        className="bg-slate-950 text-slate-300 text-xs px-3 border-l border-slate-800 focus:outline-none cursor-pointer"
                      >
                        <option value="4.0">/ 4.0</option>
                        <option value="5.0">/ 5.0</option>
                        <option value="10.0">/ 10.0</option>
                        <option value="100%">%</option>
                      </select>
                    </div>
                  </div>

                  {/* Failed subjects count */}
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Failed Subjects / Backlogs
                    </label>
                    <div className="relative min-h-[44px]">
                      <input
                        type="number"
                        min="0"
                        max="30"
                        value={failedSubjects}
                        onChange={(e) => setFailedSubjects(e.target.value)}
                        placeholder="0"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-sm font-mono-data focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                      />
                      <span className="absolute right-3.5 top-3 text-slate-500 text-xs pointer-events-none">
                        fails
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* COLLAPSIBLE MORE FILTERS (Language & Finance) */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowMoreFilters(!showMoreFilters)}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-semibold">{showMoreFilters ? 'Hide filters' : 'More filters (Language & Finance)'}</span>
                {showMoreFilters ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showMoreFilters && (
                <div className="mt-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
                  {/* English Test */}
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">English Test</label>
                    <select
                      value={englishFilter}
                      onChange={(e) => setEnglishFilter(e.target.value as any)}
                      className="w-full px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 focus:outline-none cursor-pointer"
                    >
                      <option value="all">Any / In Progress</option>
                      <option value="ielts">IELTS</option>
                      <option value="toefl">TOEFL</option>
                      <option value="duolingo">Duolingo</option>
                      <option value="not_required">Not required / Waived</option>
                    </select>
                  </div>

                  {/* Funding Type */}
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Funding Type</label>
                    <select
                      value={fundingFilter}
                      onChange={(e) => setFundingFilter(e.target.value as any)}
                      className="w-full px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 focus:outline-none cursor-pointer"
                    >
                      <option value="all">All Funding Types</option>
                      <option value="full">Fully Funded</option>
                      <option value="partial">Partial Funding</option>
                      <option value="tuition">Tuition Waiver</option>
                      <option value="stipend">Monthly Stipend</option>
                    </select>
                  </div>

                  {/* Financial Need */}
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Financial Need</label>
                    <select
                      value={financialNeed}
                      onChange={(e) => setFinancialNeed(e.target.value as any)}
                      className="w-full px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 focus:outline-none cursor-pointer"
                    >
                      <option value="all">Any Need Status</option>
                      <option value="yes">Yes (High Need)</option>
                      <option value="no">No (Merit Only)</option>
                      <option value="prefer_not_say">Prefer not to say</option>
                    </select>
                  </div>

                  {/* Gender / Diversity */}
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Diversity Grants</label>
                    <select
                      value={genderMinority}
                      onChange={(e) => setGenderMinority(e.target.value)}
                      className="w-full px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 focus:outline-none cursor-pointer"
                    >
                      <option value="any">General / Open</option>
                      <option value="women_stem">Women in STEM</option>
                      <option value="developing_regions">Developing Nations</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Validation Error Message */}
            {validationError && (
              <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-xl text-rose-300 text-xs">
                {validationError}
              </div>
            )}

            {/* Search Button & Source Note */}
            <div className="pt-3 border-t border-slate-800/80 flex flex-col items-center justify-center gap-2.5">
              <button
                type="submit"
                className="w-full sm:w-auto min-w-[280px] px-10 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm tracking-wider shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4 text-slate-950 stroke-[3]" />
                <span>FIND MY SCHOLARSHIPS</span>
              </button>

              <p className="text-xs text-slate-400">
                Official university &amp; government sources only.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
