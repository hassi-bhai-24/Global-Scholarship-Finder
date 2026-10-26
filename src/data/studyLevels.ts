export const STUDY_LEVEL_OPTIONS = [
  "Intermediate / Pre-University (FSc, A-Levels, High School)",
  "Undergraduate (Bachelor's)",
  "Postgraduate / Graduate",
  "Master's",
  "PhD / Doctorate",
  "Postdoctoral / Research Fellowship",
  "Diploma / Certificate / Short Course"
] as const;

export type StudyLevelOption = typeof STUDY_LEVEL_OPTIONS[number];

// Short display label helper for compact badges on cards and chips
export function getShortLevelLabel(level: string): string {
  if (level.includes("Intermediate") || level.includes("Pre-University")) return "Pre-Univ / High School";
  if (level.includes("Undergraduate")) return "Bachelor's";
  if (level.includes("Postgraduate")) return "Postgraduate";
  if (level.includes("Master's") || level.toLowerCase() === "masters") return "Master's";
  if (level.includes("PhD")) return "PhD / Doctorate";
  if (level.includes("Postdoctoral")) return "Postdoc / Fellowship";
  if (level.includes("Diploma") || level.includes("Short Course")) return "Diploma / Certificate";
  return level;
}

export function normalizeLevelToCanonical(level: string): string | null {
  const l = level.toLowerCase().trim();
  if (l.includes("intermediate") || l.includes("pre-university") || l.includes("fsc") || l.includes("a-level") || l.includes("high school")) {
    return "Intermediate / Pre-University (FSc, A-Levels, High School)";
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
  if (l === "postdoc" || l.includes("postdoctoral") || l.includes("fellowship")) {
    return "Postdoctoral / Research Fellowship";
  }
  if (l === "diploma" || l === "certificate" || l === "exchange" || l.includes("short course")) {
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
  return selectedLevels.some(selected => schLevels.includes(selected));
}
