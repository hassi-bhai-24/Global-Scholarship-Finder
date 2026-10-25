import { CGPAScale, MatchCategory, MatchResult, Scholarship, StudentProfile } from '../types/scholarship';
import { findSubjectByName } from '../data/subjects';

// Commonwealth country list
const COMMONWEALTH_COUNTRIES = [
  "antigua and barbuda", "australia", "bahamas", "bangladesh", "barbados", "belize",
  "botswana", "brunei", "cameroon", "canada", "cyprus", "dominica", "eswatini", "fiji",
  "gabon", "gambia", "ghana", "grenada", "guyana", "india", "jamaica", "kenya", "kiribati",
  "lesotho", "malawi", "malaysia", "maldives", "malta", "mauritius", "mozambique", "namibia",
  "nauru", "new zealand", "nigeria", "pakistan", "papua new guinea", "rwanda", "samoa",
  "seychelles", "sierra leone", "singapore", "solomon islands", "south africa", "sri lanka",
  "st kitts and nevis", "st lucia", "st vincent and the grenadines", "tanzania", "togo",
  "tonga", "trinidad and tobago", "tuvalu", "uganda", "united kingdom", "vanuatu", "zambia"
];

// DAC Developing list
export const DEVELOPING_COUNTRIES = [
  "afghanistan", "bangladesh", "cambodia", "ethiopia", "myanmar", "nepal", "rwanda", "senegal",
  "tanzania", "uganda", "yemen", "zambia", "ghana", "india", "kenya", "nigeria", "pakistan",
  "philippines", "sri lanka", "uzbekistan", "vietnam", "bolivia", "egypt", "indonesia", "morocco",
  "brazil", "china", "colombia", "mexico", "peru", "south africa", "thailand", "turkey"
];

// European Union country list
export const EU_COUNTRIES = [
  "austria", "belgium", "bulgaria", "croatia", "cyprus", "czech republic", "denmark",
  "estonia", "finland", "france", "germany", "greece", "hungary", "ireland", "italy",
  "latvia", "lithuania", "luxembourg", "malta", "netherlands", "poland", "portugal",
  "romania", "slovakia", "slovenia", "spain", "sweden"
];

export function isEligibleNationality(scholarship: Scholarship, userCountry?: string): boolean {
  if (!userCountry || !userCountry.trim()) return true;
  const userCountryLower = userCountry.trim().toLowerCase();

  // Check explicit exclusions first
  const isExplicitlyExcluded = (scholarship.ineligibleNationalities || []).some(
    c => userCountryLower === c.toLowerCase() || userCountryLower.includes(c.toLowerCase())
  );
  if (isExplicitlyExcluded) return false;

  const nationalityStr = scholarship.eligibleNationalities.join(" ").toLowerCase();

  // Direct country match
  const isDirectlyListed = scholarship.eligibleNationalities.some(
    c => c.toLowerCase().includes(userCountryLower) || userCountryLower.includes(c.toLowerCase())
  );
  if (isDirectlyListed) return true;

  // Worldwide / international open
  const isWorldwide = nationalityStr.includes("all") || nationalityStr.includes("international") || nationalityStr.includes("worldwide");
  if (isWorldwide) return true;

  // Commonwealth
  if (nationalityStr.includes("commonwealth")) {
    return COMMONWEALTH_COUNTRIES.includes(userCountryLower);
  }

  // Developing / DAC list
  if (nationalityStr.includes("developing") || nationalityStr.includes("dac")) {
    return DEVELOPING_COUNTRIES.includes(userCountryLower);
  }

  // European Union
  if (nationalityStr.includes("european union") || nationalityStr.includes("eu") || nationalityStr.includes("europe")) {
    return EU_COUNTRIES.includes(userCountryLower);
  }

  return false;
}

export function normalizeCGPATo4(cgpa: number, scale: CGPAScale): number {
  if (isNaN(cgpa) || cgpa <= 0) return 0;
  switch (scale) {
    case '4.0':
      return Math.min(4.0, Math.max(0, cgpa));
    case '5.0':
      return Math.min(4.0, Math.max(0, (cgpa / 5.0) * 4.0));
    case '10.0':
      return Math.min(4.0, Math.max(0, (cgpa / 10.0) * 4.0));
    case '100%':
      return Math.min(4.0, Math.max(0, (cgpa / 100.0) * 4.0));
    default:
      return cgpa;
  }
}

export function evaluateEligibility(scholarship: Scholarship, profile: StudentProfile): MatchResult {
  const normStudentCGPA = normalizeCGPATo4(profile.cgpa, profile.cgpaScale);
  const minCGPA = scholarship.minimumCGPA;
  
  const whyYouMatch: string[] = [];
  const whatCouldDisqualify: string[] = [];
  const whatToConfirm: string[] = [];
  const nextSteps: string[] = [];

  let confidenceScore = 45; // baseline score
  let cgpaStatus: 'exceeds' | 'meets' | 'borderline' | 'below' | 'not_required' = 'meets';
  let failedSubjectsStatus: 'safe' | 'cleared_required' | 'disqualified' | 'not_restricted' = 'safe';

  const userCountryLower = (profile.country || '').trim().toLowerCase();
  const nationalityStr = scholarship.eligibleNationalities.join(" ").toLowerCase();
  const ineligibleStr = (scholarship.ineligibleNationalities || []).join(" ").toLowerCase();

  // 1. EVALUATE NATIONALITY & BILATERAL ACCORDS
  const isExplicitlyExcluded = (scholarship.ineligibleNationalities || []).some(
    c => userCountryLower === c.toLowerCase() || userCountryLower.includes(c.toLowerCase())
  );

  const isCommonwealthEligible = nationalityStr.includes("commonwealth") && COMMONWEALTH_COUNTRIES.includes(userCountryLower);
  const isDevelopingEligible = (nationalityStr.includes("developing") || nationalityStr.includes("dac")) && DEVELOPING_COUNTRIES.includes(userCountryLower);
  const isDirectlyListed = scholarship.eligibleNationalities.some(
    c => c.toLowerCase().includes(userCountryLower) || userCountryLower.includes(c.toLowerCase())
  );
  const isEUEligible = (nationalityStr.includes("european union") || nationalityStr.includes("eu") || nationalityStr.includes("netherlands")) && EU_COUNTRIES.includes(userCountryLower);
  const isWorldwide = nationalityStr.includes("all") || nationalityStr.includes("international") || nationalityStr.includes("worldwide");

  if (isExplicitlyExcluded) {
    whatCouldDisqualify.push(`Citizens of ${profile.country} are explicitly excluded from this bilateral program.`);
    confidenceScore -= 45;
  } else if (isDirectlyListed) {
    whyYouMatch.push(`Citizens of ${profile.country} are directly targeted in the official bilateral scholarship agreement.`);
    confidenceScore += 25;
  } else if (isCommonwealthEligible) {
    whyYouMatch.push(`${profile.country} is a recognized Commonwealth member state eligible for CSC UK funding.`);
    confidenceScore += 22;
  } else if (isDevelopingEligible) {
    whyYouMatch.push(`${profile.country} is an eligible partner on the DAC / ODA international development cooperation roster.`);
    confidenceScore += 20;
  } else if (isEUEligible) {
    whyYouMatch.push(`${profile.country} is an EU member state eligible for intra-European and regional study grants.`);
    confidenceScore += 22;
  } else if (isWorldwide) {
    whyYouMatch.push(`Open to international applicants worldwide, including students from ${profile.country}.`);
    confidenceScore += 15;
  } else if (nationalityStr.includes("commonwealth") && !COMMONWEALTH_COUNTRIES.includes(userCountryLower)) {
    whatCouldDisqualify.push(`${profile.country} is not a Commonwealth member state; this award is strictly restricted to Commonwealth citizens.`);
    confidenceScore -= 40;
  } else {
    whatToConfirm.push(`Verify annual host country bilateral quotas for ${profile.country}.`);
    confidenceScore += 5;
  }

  // 2. EVALUATE CGPA SENSITIVITY
  const cgpaDiff = normStudentCGPA - minCGPA;
  if (cgpaDiff >= 0.3) {
    cgpaStatus = 'exceeds';
    whyYouMatch.push(`Your normalized CGPA (${normStudentCGPA.toFixed(2)}/4.0) substantially exceeds the minimum cutoff (${minCGPA.toFixed(2)}/4.0), making your application highly competitive.`);
    confidenceScore += 25;
  } else if (cgpaDiff >= 0) {
    cgpaStatus = 'meets';
    whyYouMatch.push(`Your normalized CGPA (${normStudentCGPA.toFixed(2)}/4.0) meets the stated academic threshold of ${minCGPA.toFixed(2)}/4.0.`);
    confidenceScore += 15;
  } else if (cgpaDiff >= -0.15) {
    cgpaStatus = 'borderline';
    whatToConfirm.push(`Your normalized CGPA (${normStudentCGPA.toFixed(2)}/4.0) is marginally below the preferred benchmark of ${minCGPA.toFixed(2)}/4.0; strong GRE scores, publications, or motivated essays can compensate.`);
    confidenceScore += 2;
  } else {
    cgpaStatus = 'below';
    whatCouldDisqualify.push(`Your normalized CGPA (${normStudentCGPA.toFixed(2)}/4.0) does not meet the minimum required academic cutoff (${minCGPA.toFixed(2)}/4.0).`);
    confidenceScore -= 35;
  }

  // 3. EVALUATE FAILED SUBJECTS INTELLIGENTLY
  const failedCount = profile.failedSubjects || 0;
  const policy = scholarship.failedSubjectRule.policy;

  if (failedCount === 0) {
    failedSubjectsStatus = 'safe';
    whyYouMatch.push("Pristine transcript with zero failed courses fulfills strict academic standing requirements.");
    confidenceScore += 12;
  } else if (failedCount >= 1 && failedCount <= 2) {
    // 1-2 backlogs
    switch (policy) {
      case 'strict_zero_fails':
        failedSubjectsStatus = 'disqualified';
        whatCouldDisqualify.push(`This ultra-competitive award favors flawless academic transcripts. Having ${failedCount} failed course(s) places you at a disadvantage against candidates with clean transcripts.`);
        confidenceScore -= 25;
        break;
      case 'no_active_backlogs':
      case 'must_be_cleared':
        failedSubjectsStatus = 'cleared_required';
        whyYouMatch.push(`Earlier failed courses are acceptable once cleared; ensure your ${failedCount} backlog(s) are officially passed before departure.`);
        whatToConfirm.push(`Verify that all ${failedCount} retaken subjects are marked as passed on your final degree transcript.`);
        confidenceScore += 5;
        break;
      case 'allowed_if_cgpa_met':
      default:
        failedSubjectsStatus = 'safe';
        whyYouMatch.push(`The provider focuses on overall cumulative CGPA rather than isolated course failures. Your ${failedCount} failed subject(s) do not disqualify you.`);
        confidenceScore += 8;
        break;
    }
  } else if (failedCount >= 3 && failedCount <= 5) {
    // 3-5 backlogs
    switch (policy) {
      case 'strict_zero_fails':
        failedSubjectsStatus = 'disqualified';
        whatCouldDisqualify.push(`Having ${failedCount} failed subjects will likely disqualify you from this top-tier merit award where unblemished records are expected.`);
        confidenceScore -= 35;
        break;
      case 'no_active_backlogs':
      case 'must_be_cleared':
        failedSubjectsStatus = 'cleared_required';
        whatCouldDisqualify.push(`You have ${failedCount} failed subjects. Official rules require every backlog to be remediated and an unencumbered degree conferred.`);
        whatToConfirm.push(`Confirm timeline to clear all ${failedCount} backlogs before the scholarship visa issuance window.`);
        confidenceScore -= 10;
        break;
      case 'allowed_if_cgpa_met':
      default:
        failedSubjectsStatus = 'cleared_required';
        whyYouMatch.push(`Cumulative CGPA rule applies: if your overall grade point average is maintained, your ${failedCount} failed courses remain permissible.`);
        whatToConfirm.push(`Check if host department imposes a cap on the total number of course retakes allowed.`);
        confidenceScore -= 5;
        break;
    }
  } else {
    // 6+ backlogs
    failedSubjectsStatus = 'cleared_required';
    whatCouldDisqualify.push(`Having ${failedCount} failed subjects indicates substantial academic setbacks. Many selective universities will require a strong statement of explanation or mitigating circumstances.`);
    confidenceScore -= 28;
  }

  // 4. UNIVERSITY CONTEXT
  if (profile.university && profile.university.trim().length > 0) {
    whyYouMatch.push(`Undergraduate credentials from ${profile.university.trim()} are recognized for international degree equivalence.`);
  }

  // 5. OPTIONAL PROFILE ENRICHMENT SENSITIVITY
  if (profile.degreeLevel && profile.degreeLevel !== 'any') {
    if (scholarship.degreeLevels.includes(profile.degreeLevel as any)) {
      whyYouMatch.push(`Provides direct funding for your intended ${profile.degreeLevel.toUpperCase()} degree level.`);
      confidenceScore += 8;
    } else {
      whatCouldDisqualify.push(`This scholarship specifically targets ${scholarship.degreeLevels.join(", ").toUpperCase()} studies, differing from your selected target (${profile.degreeLevel.toUpperCase()}).`);
      confidenceScore -= 20;
    }
  }

  // 5. SUBJECT / DISCIPLINE EVALUATION
  let subjectMatchStatus: 'direct_major_match' | 'open_all_fields' | 'restricted_field' = 'open_all_fields';
  if (profile.field) {
    const subjectEval = evaluateSubjectMatch(scholarship, profile.field);
    subjectMatchStatus = subjectEval.status;

    if (subjectMatchStatus === 'direct_major_match') {
      whyYouMatch.push(subjectEval.reason);
      confidenceScore += 18;
    } else if (subjectMatchStatus === 'open_all_fields') {
      whyYouMatch.push(subjectEval.reason);
      confidenceScore += 6;
    } else {
      whatCouldDisqualify.push(subjectEval.reason);
      confidenceScore -= 30;
    }
  }

  // 6. DEGREE LEVEL
  if (profile.degreeLevel && profile.degreeLevel !== 'any') {
    if (scholarship.degreeLevels.includes(profile.degreeLevel as any)) {
      whyYouMatch.push(`Provides direct funding for your intended ${profile.degreeLevel.toUpperCase()} degree level.`);
      confidenceScore += 8;
    } else {
      whatCouldDisqualify.push(`This scholarship specifically targets ${scholarship.degreeLevels.join(", ").toUpperCase()} studies, differing from your selected target (${profile.degreeLevel.toUpperCase()}).`);
      confidenceScore -= 20;
    }
  }

  // 7. ADMISSION & LANGUAGE CONFIRMATION
  whatToConfirm.push(scholarship.languageRequirement);
  whatToConfirm.push(scholarship.admissionRequirement);

  // 8. NEXT STEPS
  nextSteps.push("Review official program guidelines at the primary source portal.");
  if (scholarship.applicationSteps && scholarship.applicationSteps.length > 0) {
    nextSteps.push(scholarship.applicationSteps[0]);
  }
  nextSteps.push("Prepare certified transcripts, statement of purpose, and academic reference letters.");

  // 9. ACCURATE CATEGORY CALCULATION
  let category: MatchCategory = 'POSSIBLE_MATCH';

  if (scholarship.deadlineStatus === 'closed') {
    category = 'CLOSED_EXPIRED';
  } else if (isExplicitlyExcluded || (nationalityStr.includes("commonwealth") && !COMMONWEALTH_COUNTRIES.includes(userCountryLower))) {
    category = 'LOW_MATCH';
  } else if (cgpaStatus === 'below') {
    category = 'LOW_MATCH';
  } else if (failedSubjectsStatus === 'disqualified') {
    category = 'LOW_MATCH';
  } else if (subjectMatchStatus === 'restricted_field') {
    category = 'LOW_MATCH';
  } else if (confidenceScore >= 70 && cgpaStatus !== 'borderline') {
    category = 'STRONG_MATCH';
  } else if (confidenceScore >= 50) {
    category = 'LIKELY_MATCH';
  } else {
    category = 'POSSIBLE_MATCH';
  }

  // Clamp confidence score 10 - 99
  confidenceScore = Math.min(99, Math.max(10, confidenceScore));

  return {
    scholarship,
    category,
    confidenceScore,
    whyYouMatch,
    whatCouldDisqualify,
    whatToConfirm,
    nextSteps,
    cgpaStatus,
    failedSubjectsStatus,
    subjectMatchStatus
  };
}

// Evaluate whether scholarship fields align with specific user subject
export function evaluateSubjectMatch(
  scholarship: Scholarship,
  userSubject?: string
): {
  status: 'direct_major_match' | 'open_all_fields' | 'restricted_field';
  reason: string;
} {
  if (!userSubject || !userSubject.trim() || userSubject.toLowerCase().includes('all disciplines') || userSubject.toLowerCase().includes('all fields')) {
    return {
      status: 'open_all_fields',
      reason: 'General academic eligibility across all study programs.'
    };
  }

  const userSubjectLower = userSubject.trim().toLowerCase();
  const fieldsJoined = scholarship.fields.join(" ").toLowerCase();

  // Check universal program fields
  const isUniversal = fieldsJoined.includes("all fields") || fieldsJoined.includes("all one-year") || fieldsJoined.includes("all majors") || fieldsJoined.includes("all master") || fieldsJoined.includes("all degree");

  // Lookup subject in database
  const subjectObj = findSubjectByName(userSubject);
  const termsToCheck: string[] = [
    userSubjectLower,
    ...(subjectObj?.aliases.map(a => a.toLowerCase()) || []),
    ...(subjectObj?.keywords.map(k => k.toLowerCase()) || [])
  ];

  const hasDirectMatch = scholarship.fields.some(field => {
    const fLower = field.toLowerCase();
    return termsToCheck.some(term => {
      if (term.length < 3) return false;
      return fLower.includes(term) || term.includes(fLower);
    });
  });

  if (hasDirectMatch) {
    return {
      status: 'direct_major_match',
      reason: `Direct Major Match: Stated priority funding specifically covers ${userSubject}.`
    };
  }

  if (isUniversal) {
    return {
      status: 'open_all_fields',
      reason: `Universal Eligibility: Open to all academic faculties, including ${userSubject}.`
    };
  }

  return {
    status: 'restricted_field',
    reason: `Field Focus: This program targets ${scholarship.fields.join(", ")}, which does not match ${userSubject}.`
  };
}

export function sortAndFilterMatches(
  matches: MatchResult[],
  filter: {
    category?: string;
    fundingType?: string;
    degreeLevel?: string;
    destination?: string;
    searchQuery?: string;
    subjectFilter?: string;
    sortBy?: 'best_match' | 'deadline_soonest' | 'fully_funded' | 'recently_verified';
  }
): MatchResult[] {
  let filtered = [...matches];

  // Subject / Field filter
  if (filter.subjectFilter && filter.subjectFilter !== 'all' && !filter.subjectFilter.toLowerCase().includes('all disciplines')) {
    filtered = filtered.filter(m => {
      const matchRes = evaluateSubjectMatch(m.scholarship, filter.subjectFilter);
      return matchRes.status !== 'restricted_field';
    });
  }

  // Category filter
  if (filter.category && filter.category !== 'all') {
    filtered = filtered.filter(m => m.category.toLowerCase() === filter.category?.toLowerCase());
  }

  // Funding type filter
  if (filter.fundingType && filter.fundingType !== 'all') {
    filtered = filtered.filter(m => m.scholarship.fundingType === filter.fundingType);
  }

  // Degree level filter
  if (filter.degreeLevel && filter.degreeLevel !== 'all') {
    filtered = filtered.filter(m => m.scholarship.degreeLevels.includes(filter.degreeLevel as any));
  }

  // Destination country filter
  if (filter.destination && filter.destination !== 'all') {
    filtered = filtered.filter(m => 
      m.scholarship.destinationCountry.toLowerCase().includes(filter.destination!.toLowerCase())
    );
  }

  // Text search query
  if (filter.searchQuery && filter.searchQuery.trim().length > 0) {
    const q = filter.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(m => 
      m.scholarship.name.toLowerCase().includes(q) ||
      m.scholarship.provider.toLowerCase().includes(q) ||
      m.scholarship.destinationCountry.toLowerCase().includes(q) ||
      m.scholarship.fields.some(f => f.toLowerCase().includes(q))
    );
  }

  // Sorting
  const sortBy = filter.sortBy || 'best_match';
  filtered.sort((a, b) => {
    if (sortBy === 'best_match') {
      // Prioritize direct major matches
      const aDirect = a.subjectMatchStatus === 'direct_major_match' ? 1 : 0;
      const bDirect = b.subjectMatchStatus === 'direct_major_match' ? 1 : 0;
      if (bDirect !== aDirect) return bDirect - aDirect;

      const rankOrder: Record<MatchCategory, number> = {
        'STRONG_MATCH': 5,
        'LIKELY_MATCH': 4,
        'POSSIBLE_MATCH': 3,
        'LOW_MATCH': 2,
        'CLOSED_EXPIRED': 1
      };
      const rankDiff = rankOrder[b.category] - rankOrder[a.category];
      if (rankDiff !== 0) return rankDiff;
      return b.confidenceScore - a.confidenceScore;
    }

    if (sortBy === 'deadline_soonest') {
      const aDays = a.scholarship.daysRemaining ?? 999;
      const bDays = b.scholarship.daysRemaining ?? 999;
      return aDays - bDays;
    }

    if (sortBy === 'fully_funded') {
      const isAFully = a.scholarship.fundingType === 'fully_funded' ? 1 : 0;
      const isBFully = b.scholarship.fundingType === 'fully_funded' ? 1 : 0;
      if (isBFully !== isAFully) return isBFully - isAFully;
      return b.confidenceScore - a.confidenceScore;
    }

    if (sortBy === 'recently_verified') {
      return new Date(b.scholarship.lastVerified).getTime() - new Date(a.scholarship.lastVerified).getTime();
    }

    return 0;
  });

  return filtered;
}
