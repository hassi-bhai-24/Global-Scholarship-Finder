export type CGPAScale = '4.0' | '5.0' | '10.0' | '100%';

export interface PreUniResult {
  boardCurriculum?: string;
  specificBoard?: string;
  resultMode?: 'percentage' | 'marks' | 'grades' | 'ib_points' | 'gpa';
  percentage?: number;
  obtainedMarks?: number;
  totalMarks?: number;
  grades?: string;
  ibPoints?: number;
  highSchoolGpa?: number;
  matricScore?: string;
  entranceTest?: string;
  hasFailedPapers?: boolean;
}

export interface StudentProfile {
  country: string;
  university: string;
  studyLevel?: string;
  educationStatus?: string;
  field?: string;
  targetDestination?: string;
  cgpa: number;
  cgpaScale: CGPAScale;
  failedSubjects: number;

  // Pre-university adaptation
  isPreUniversity?: boolean;
  preUniResult?: PreUniResult;

  // Language, finance & more filters
  englishTestFilter?: 'all' | 'ielts' | 'toefl' | 'duolingo' | 'none_yet' | 'not_required';
  fundingTypeFilter?: 'all' | 'full' | 'partial' | 'tuition' | 'stipend';
  genderOrMinorityFilter?: string;
  financialNeedStatus?: 'all' | 'yes' | 'no' | 'prefer_not_say';

  // Optional enrichment attributes
  degreeLevel?: 'bachelors' | 'masters' | 'phd' | 'exchange' | 'postdoc' | 'any';
  targetCountries?: string[];
  englishTest?: 'None / In Progress' | 'IELTS' | 'TOEFL iBT' | 'PTE' | 'Duolingo';
  englishScore?: string;
  workExperienceYears?: number;
  graduationYear?: number;
  financialNeed?: 'none' | 'moderate' | 'high';
}

export type FailedSubjectPolicy = 
  | 'allowed_if_cgpa_met' 
  | 'no_active_backlogs' 
  | 'must_be_cleared' 
  | 'strict_zero_fails' 
  | 'not_stated';

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  destinationCountry: string;
  officialUrl: string;
  applicationUrl: string;
  eligibleNationalities: string[]; // ["All"] or ISO / names
  ineligibleNationalities?: string[];
  eligibleUniversities?: string[]; // ["All"] or specific names
  degreeLevels: Array<'bachelors' | 'masters' | 'phd' | 'postdoc' | 'exchange'>;
  levels?: string[];
  fields: string[]; // ["All fields"] or specific
  minimumCGPA: number; // normalized to 4.0 scale
  minimumCGPAOriginal: number;
  cgpaScaleOriginal: CGPAScale;
  failedSubjectRule: {
    policy: FailedSubjectPolicy;
    description: string;
    officialQuote?: string;
  };
  fundingType: 'fully_funded' | 'tuition_waiver' | 'partial_funding' | 'stipend_only' | 'research_grant';
  benefits: {
    tuitionCoverage: string;
    stipendMonthly?: string;
    travelAllowance?: string;
    accommodation?: string;
    insurance?: string;
    otherPerks?: string[];
  };
  deadline: string; // ISO date string (YYYY-MM-DD) or format
  openingDate?: string;
  deadlineStatus: 'open' | 'closing_soon' | 'upcoming' | 'closed';
  daysRemaining?: number;
  verificationStatus: 'verified_official' | 'verified_recently' | 'needs_confirmation' | 'expired_closed';
  lastVerified: string;
  sourceType: 'official_government' | 'official_university' | 'official_foundation' | 'verified_portal';
  admissionRequirement: string;
  languageRequirement: string;
  applicationSteps: string[];
  requiredDocuments: string[];
  officialSourceNote: string;
  liveDiscovered?: boolean;
}

export type MatchCategory = 
  | 'STRONG_MATCH' 
  | 'LIKELY_MATCH' 
  | 'POSSIBLE_MATCH' 
  | 'LOW_MATCH' 
  | 'CLOSED_EXPIRED';

export interface MatchResult {
  scholarship: Scholarship;
  category: MatchCategory;
  confidenceScore: number; // 0 - 100 percentage based on verified factors
  whyYouMatch: string[];
  whatCouldDisqualify: string[];
  whatToConfirm: string[];
  nextSteps: string[];
  cgpaStatus: 'exceeds' | 'meets' | 'borderline' | 'below' | 'not_required';
  failedSubjectsStatus: 'safe' | 'cleared_required' | 'disqualified' | 'not_restricted';
  subjectMatchStatus?: 'direct_major_match' | 'open_all_fields' | 'restricted_field';
}

export type ApplicationStatus = 'saved' | 'researching' | 'applying' | 'applied' | 'accepted' | 'closed';

export interface ApplicationTrackerItem {
  scholarshipId: string;
  scholarship: Scholarship;
  status: ApplicationStatus;
  savedAt: string;
  updatedAt: string;
  notes: string;
  reminderDate?: string;
}

export interface VerificationSourceInfo {
  id: string;
  name: string;
  portalUrl: string;
  authority: string;
  jurisdiction: string;
  lastChecked: string;
  status: 'active' | 'updating' | 'verified';
  recordsTracked: number;
}
