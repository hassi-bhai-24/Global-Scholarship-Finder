export const STUDY_LEVEL_OPTIONS = [
  "Intermediate / Pre-University (FSc, A-Levels, High School)",
  "Undergraduate (Bachelor's)",
  "Postgraduate / Graduate",
  "Master's",
  "PhD / Doctorate",
  "Postdoctoral / Research Fellowship",
  "Diploma / Certificate / Short Course"
] as const;

export const ADAPTIVE_STUDY_LEVELS = [
  "Undergraduate / Bachelor's (after Intermediate / A-Levels / 12th grade)",
  "Master's / Postgraduate",
  "PhD / Doctorate",
  "Postdoctoral / Research",
  "Diploma / Certificate / Vocational",
  "Short course / Exchange / Summer program"
] as const;

export type AdaptiveStudyLevel = typeof ADAPTIVE_STUDY_LEVELS[number];

export interface EducationStatusOption {
  id: string;
  label: string;
  isPreUniversity?: boolean;
  requiresUniversity?: boolean;
}

export const EDUCATION_STATUS_BY_LEVEL: Record<string, EducationStatusOption[]> = {
  undergraduate: [
    { id: 'intermediate_current', label: 'Currently in Intermediate / FSc / FA / ICS / Pre-Engineering / Pre-Medical', isPreUniversity: true },
    { id: 'intermediate_completed', label: 'Completed Intermediate / A-Levels / 12th grade', isPreUniversity: true },
    { id: 'alevels_current', label: 'Currently in A-Levels / IB / AP', isPreUniversity: true },
    { id: 'alevels_completed', label: 'Completed A-Levels / IB', isPreUniversity: true },
    { id: 'matric_completed', label: 'Matric / O-Levels completed (planning ahead)', isPreUniversity: true },
    { id: 'uni_transfer', label: 'Transferring from a university (ask for university)', requiresUniversity: true }
  ],
  masters: [
    { id: 'final_year_bachelors', label: "Final-year Bachelor's student", requiresUniversity: true },
    { id: 'graduated_bachelors', label: "Bachelor's graduated", requiresUniversity: true },
    { id: 'working_professional_masters', label: 'Working professional', requiresUniversity: true }
  ],
  phd: [
    { id: 'final_year_masters', label: "Final-year Master's student", requiresUniversity: true },
    { id: 'graduated_masters', label: "Master's graduated", requiresUniversity: true },
    { id: 'working_researcher_phd', label: 'Working researcher', requiresUniversity: true }
  ],
  postdoc: [
    { id: 'phd_candidate', label: 'PhD candidate (final year)', requiresUniversity: true },
    { id: 'phd_graduated', label: 'Recent PhD graduate', requiresUniversity: true },
    { id: 'working_researcher_postdoc', label: 'Working researcher / Postdoc fellow', requiresUniversity: true }
  ],
  diploma_short: [
    { id: 'student', label: 'Student', isPreUniversity: true },
    { id: 'graduate', label: 'Graduate' },
    { id: 'working_professional_short', label: 'Working professional' }
  ]
};

export const PAKISTANI_BOARDS = [
  "BISE Lahore",
  "Federal Board (FBISE)",
  "BISE Karachi",
  "BISE Rawalpindi",
  "BISE Multan",
  "BISE Faisalabad",
  "BISE Gujranwala",
  "BISE Peshawar",
  "BISE Quetta",
  "Other Pakistani Board"
];

export const BOARD_CURRICULA = [
  { id: 'pakistani_board', label: 'Pakistani Board (BISE / Federal)' },
  { id: 'cambridge', label: 'Cambridge (A-Levels / O-Levels)' },
  { id: 'ib', label: 'International Baccalaureate (IB)' },
  { id: 'american_hs', label: 'American High School (GPA)' },
  { id: 'other_intl', label: 'Other International Board' }
];

export const TARGET_DESTINATIONS = [
  "Worldwide",
  "United States",
  "United Kingdom",
  "Germany",
  "Canada",
  "Australia",
  "Europe",
  "Asia"
];

export type StudyLevelOption = typeof STUDY_LEVEL_OPTIONS[number];

// Short display label helper for compact badges on cards and chips
export function getShortLevelLabel(level: string): string {
  if (level.includes("Intermediate") || level.includes("Pre-University") || level.includes("12th grade")) return "Undergraduate";
  if (level.includes("Undergraduate") || level.includes("Bachelor")) return "Bachelor's";
  if (level.includes("Postgraduate")) return "Postgraduate";
  if (level.includes("Master's") || level.toLowerCase() === "masters") return "Master's";
  if (level.includes("PhD")) return "PhD / Doctorate";
  if (level.includes("Postdoctoral")) return "Postdoc / Fellowship";
  if (level.includes("Diploma") || level.includes("Short Course") || level.includes("Vocational")) return "Diploma / Certificate";
  return level;
}

export function normalizeLevelToCanonical(level: string): string | null {
  const l = level.toLowerCase().trim();
  if (l.includes("intermediate") || l.includes("pre-university") || l.includes("fsc") || l.includes("a-level") || l.includes("high school") || l.includes("12th grade")) {
    return "Undergraduate (Bachelor's)";
  }
  if (l === "bachelors" || l === "bachelor" || l.includes("undergraduate") || l.includes("bachelor's")) {
    return "Undergraduate (Bachelor's)";
  }
  if (l === "postgraduate" || l === "graduate" || l.includes("postgraduate")) {
    return "Postgraduate / Graduate";
  }
  if (l === "masters" || l === "master" || l.includes("master's")) {
    return "Master's";
  }
  if (l === "phd" || l === "doctorate" || l.includes("doctor")) {
    return "PhD / Doctorate";
  }
  if (l === "postdoc" || l.includes("postdoctoral") || l.includes("fellowship") || l.includes("research")) {
    return "Postdoctoral / Research Fellowship";
  }
  if (l === "diploma" || l === "certificate" || l === "exchange" || l.includes("short course") || l.includes("vocational") || l.includes("summer")) {
    return "Diploma / Certificate / Short Course";
  }
  return null;
}

export function getScholarshipStudyLevels(scholarship: { degreeLevels?: string[]; levels?: string[] }): string[] {
  const result = new Set<string>();

  // If explicit levels array provided
  if (scholarship.levels && scholarship.levels.length > 0) {
    for (const lvl of scholarship.levels) {
      const canonical = normalizeLevelToCanonical(lvl);
      if (canonical) {
        result.add(canonical);
        // Automatically imply Postgraduate / Graduate if Master's or PhD
        if (canonical === "Master's" || canonical === "PhD / Doctorate") {
          result.add("Postgraduate / Graduate");
        }
      } else {
        result.add(lvl);
      }
    }
  }

  // Also include mapping from degreeLevels
  if (scholarship.degreeLevels && scholarship.degreeLevels.length > 0) {
    for (const dl of scholarship.degreeLevels) {
      const canonical = normalizeLevelToCanonical(dl);
      if (canonical) {
        result.add(canonical);
        if (canonical === "Master's" || canonical === "PhD / Doctorate") {
          result.add("Postgraduate / Graduate");
        }
      }
    }
  }

  if (result.size === 0) {
    result.add("Undergraduate (Bachelor's)");
    result.add("Master's");
  }

  return Array.from(result);
}

export function matchesStudyLevels(
  scholarship: { degreeLevels?: string[]; levels?: string[] },
  selectedLevels: string[]
): boolean {
  if (!selectedLevels || selectedLevels.length === 0 || selectedLevels.includes("All Levels")) {
    return true;
  }
  const schLevels = getScholarshipStudyLevels(scholarship);
  return selectedLevels.some(selected => {
    if (schLevels.includes(selected)) return true;
    const canonical = normalizeLevelToCanonical(selected);
    return canonical ? schLevels.includes(canonical) : false;
  });
}
