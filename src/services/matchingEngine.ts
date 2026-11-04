import type { CGPAScale, MatchCategory, MatchResult, Scholarship, StudentProfile } from '../types/scholarship.ts';
import { findSubjectByName } from '../data/subjects.ts';
import { matchesStudyLevels } from '../data/studyLevels.ts';

// Deadline status is always computed from the deadline date at runtime.
// The static deadlineStatus / daysRemaining stored in the catalog are stale
// snapshots and must never be shown as-is: a listing whose deadline has
// passed must read Closed, however old its stored status is.
export function computeDeadlineStatus(
  deadline: string,
  now: Date = new Date()
): { deadlineStatus: 'open' | 'closing_soon' | 'upcoming' | 'closed'; daysRemaining?: number } {
  const parsed = new Date(deadline);
  if (isNaN(parsed.getTime())) return { deadlineStatus: 'open', daysRemaining: undefined };
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDeadline = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
  const daysRemaining = Math.round((startOfDeadline.getTime() - startOfToday.getTime()) / 86400000);
  if (daysRemaining < 0) return { deadlineStatus: 'closed', daysRemaining: 0 };
  if (daysRemaining <= 30) return { deadlineStatus: 'closing_soon', daysRemaining };
  return { deadlineStatus: 'open', daysRemaining };
}

export function withRuntimeDeadline<T extends Scholarship>(scholarship: T, now: Date = new Date()): T {
  const computed = computeDeadlineStatus(scholarship.deadline, now);
  return { ...scholarship, deadlineStatus: computed.deadlineStatus, daysRemaining: computed.daysRemaining };
}
// --- Word-boundary matching (F13) -------------------------------------------
// Substring matching produced false positives ("Niger" in "Nigeria", "Mali"
// in "Somalia", "all" in "small", "eu" in any word containing "eu").
// A phrase only matches when it appears as a whole word/phrase, bounded by
// non-letters or the ends of the string.
function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function containsPhrase(text: string, phrase: string): boolean {
  const clean = phrase.trim().toLowerCase();
  if (!clean) return false;
  const pattern = new RegExp(`(^|[^a-z])${escapeRegExp(clean)}([^a-z]|$)`);
  return pattern.test(text.toLowerCase());
}

function phraseEqualsOrContains(a: string, b: string): boolean {
  const x = a.trim().toLowerCase();
  const y = b.trim().toLowerCase();
  if (!x || !y) return false;
  return x === y || containsPhrase(x, y) || containsPhrase(y, x);
}

export type NationalityMatchKind = 'excluded' | 'direct' | 'commonwealth' | 'developing' | 'eu' | 'worldwide' | null;

export function nationalityMatchKind(scholarship: Scholarship, userCountry?: string): NationalityMatchKind {
  if (!userCountry || !userCountry.trim()) return 'worldwide';
  const user = userCountry.trim().toLowerCase();
  const entries = scholarship.eligibleNationalities;
  const nationalityStr = entries.join(' ').toLowerCase();

  const isExplicitlyExcluded = (scholarship.ineligibleNationalities || []).some(
    (c) => phraseEqualsOrContains(c, userCountry)
  );
  if (isExplicitlyExcluded) return 'excluded';

  const isDirectlyListed = entries.some((c) => phraseEqualsOrContains(c, userCountry));
  if (isDirectlyListed) return 'direct';

  // "All / International / Worldwide" only as whole words: "small island…"
  // must not count, and "All Non-US" is handled by the exclusion check above.
  const tokens = nationalityStr.split(/[^a-z]+/).filter(Boolean);
  const isWorldwide = tokens.includes('all') || tokens.includes('international') || tokens.includes('worldwide');
  if (isWorldwide) return 'worldwide';

  if (containsPhrase(nationalityStr, 'commonwealth') && COMMONWEALTH_COUNTRIES.includes(user)) return 'commonwealth';
  if ((containsPhrase(nationalityStr, 'developing') || tokens.includes('dac')) && DEVELOPING_COUNTRIES.includes(user)) return 'developing';
  // EU membership only: the phrase "european union" or a standalone "eu"
  // token. "Europe" alone is not EU membership, and a mention of the
  // Netherlands does not make a grant EU-wide.
  if ((containsPhrase(nationalityStr, 'european union') || tokens.includes('eu')) && EU_COUNTRIES.includes(user)) return 'eu';

  return null;
}

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
  const kind = nationalityMatchKind(scholarship, userCountry);
  // Eligible when not excluded and some eligibility route applies. A null
  // kind (restricted to other nationalities) stays ineligible here; the
  // matcher still evaluates it as LOW_MATCH via evaluateEligibility,
  // which uses the same helper.
  return kind !== 'excluded' && kind !== null;
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
  // Runtime deadline status overrides the stale stored snapshot.
  scholarship = withRuntimeDeadline(scholarship);
  const normStudentCGPA = normalizeCGPATo4(profile.cgpa, profile.cgpaScale);
  const minCGPA = scholarship.minimumCGPA;
  
  const whyYouMatch: string[] = [];
  const whatCouldDisqualify: string[] = [];
  const whatToConfirm: string[] = [];
  const nextSteps: string[] = [];

  let matchScore = 45; // Internal rough match points for ranking/categories only. NOT a probability and never shown as a percentage.
  let cgpaStatus: 'exceeds' | 'meets' | 'borderline' | 'below' | 'not_required' = 'meets';
  let failedSubjectsStatus: 'safe' | 'cleared_required' | 'disqualified' | 'not_restricted' = 'safe';

  const userCountryLower = (profile.country || '').trim().toLowerCase();
  const nationalityStr = scholarship.eligibleNationalities.join(" ").toLowerCase();

  // 1. EVALUATE NATIONALITY & BILATERAL ACCORDS (word-boundary matching
  // via nationalityMatchKind — see the helper above).
  const natKind = nationalityMatchKind(scholarship, profile.country);
  const isExplicitlyExcluded = natKind === 'excluded';

  if (natKind === 'excluded') {
    whatCouldDisqualify.push(`Citizens of ${profile.country} are explicitly excluded from this bilateral program.`);
    matchScore -= 45;
  } else if (natKind === 'direct') {
    whyYouMatch.push(`Citizens of ${profile.country} are directly targeted in the official bilateral scholarship agreement.`);
    matchScore += 25;
  } else if (natKind === 'commonwealth') {
    whyYouMatch.push(`${profile.country} is a recognized Commonwealth member state eligible for CSC UK funding.`);
    matchScore += 22;
  } else if (natKind === 'developing') {
    whyYouMatch.push(`${profile.country} is an eligible partner on the DAC / ODA international development cooperation roster.`);
    matchScore += 20;
  } else if (natKind === 'eu') {
    whyYouMatch.push(`${profile.country} is an EU member state eligible for intra-European and regional study grants.`);
    matchScore += 22;
  } else if (natKind === 'worldwide') {
    whyYouMatch.push(`Open to international applicants worldwide, including students from ${profile.country}.`);
    matchScore += 15;
  } else if (containsPhrase(nationalityStr, 'commonwealth') && !COMMONWEALTH_COUNTRIES.includes(userCountryLower)) {
    whatCouldDisqualify.push(`${profile.country} is not a Commonwealth member state; this award is strictly restricted to Commonwealth citizens.`);
    matchScore -= 40;
  } else {
    whatToConfirm.push(`Verify annual host country bilateral quotas for ${profile.country}.`);
    matchScore += 5;
  }

  // 2. CHECK IF PRE-UNIVERSITY APPLICANT
  const isPreUniStudent = !!(
    profile.isPreUniversity ||
    (profile.studyLevel && (
      profile.studyLevel.toLowerCase().includes('undergraduate') ||
      profile.studyLevel.toLowerCase().includes('intermediate') ||
      profile.studyLevel.toLowerCase().includes('12th') ||
      profile.studyLevel.toLowerCase().includes('bachelor')
    ) && (profile.university === 'No university experience' || !profile.university || profile.preUniResult !== undefined))
  );

  const scholarshipSupportsUndergrad = scholarship.degreeLevels.includes('bachelors') ||
    (scholarship.levels && scholarship.levels.some(l => 
      l.toLowerCase().includes('undergraduate') || 
      l.toLowerCase().includes('bachelor') || 
      l.toLowerCase().includes('intermediate') ||
      l.toLowerCase().includes('high school')
    ));

  if (isPreUniStudent) {
    if (!scholarshipSupportsUndergrad) {
      // Disqualify graduate/PhD only programs for pre-university students
      whatCouldDisqualify.push("Requires an existing Bachelor's/Master's degree; this award is strictly for graduate/postdoctoral research.");
      matchScore -= 45;
      cgpaStatus = 'below';
    } else {
      whyYouMatch.push("Directly funds Undergraduate / Bachelor's studies for pre-university and school-leaving applicants.");
      matchScore += 18;

      // Evaluate Board Result
      if (profile.preUniResult) {
        const pur = profile.preUniResult;
        if (pur.percentage !== undefined) {
          if (pur.percentage >= 80) {
            cgpaStatus = 'exceeds';
            whyYouMatch.push(`Your board score of ${pur.percentage}% exceeds international undergraduate admission cutoffs.`);
            matchScore += 25;
          } else if (pur.percentage >= 70) {
            cgpaStatus = 'meets';
            whyYouMatch.push(`Your board score of ${pur.percentage}% meets standard undergraduate entry criteria.`);
            matchScore += 18;
          } else if (pur.percentage >= 60) {
            cgpaStatus = 'borderline';
            whatToConfirm.push(`Board score (${pur.percentage}%) meets baseline eligibility; standard tests (SAT/ACT/IELTS) can bolster profile.`);
            matchScore += 5;
          } else {
            cgpaStatus = 'below';
            whatCouldDisqualify.push(`Board score (${pur.percentage}%) is below competitive merit cutoffs.`);
            matchScore -= 20;
          }
        } else if (pur.grades) {
          cgpaStatus = 'exceeds';
          whyYouMatch.push(`A-Level profile (${pur.grades}) fulfills competitive undergraduate entry requirements.`);
          matchScore += 25;
        } else if (pur.ibPoints !== undefined) {
          if (pur.ibPoints >= 34) {
            cgpaStatus = 'exceeds';
            whyYouMatch.push(`IB Diploma score (${pur.ibPoints}/45) qualifies for international merit admissions.`);
            matchScore += 25;
          } else {
            cgpaStatus = 'meets';
            whyYouMatch.push(`IB Diploma score (${pur.ibPoints}/45) fulfills entry requirements.`);
            matchScore += 15;
          }
        } else if (pur.highSchoolGpa !== undefined) {
          if (pur.highSchoolGpa >= 3.5) {
            cgpaStatus = 'exceeds';
            whyYouMatch.push(`High School GPA (${pur.highSchoolGpa}/4.0) satisfies top-tier entry criteria.`);
            matchScore += 25;
          } else {
            cgpaStatus = 'meets';
            whyYouMatch.push(`High School GPA meets standard entry requirements.`);
            matchScore += 15;
          }
        }
      } else {
        const cgpaDiff = normStudentCGPA - minCGPA;
        if (cgpaDiff >= 0) {
          cgpaStatus = 'meets';
          matchScore += 15;
        } else {
          cgpaStatus = 'borderline';
          matchScore += 5;
        }
      }

      // Pre-university failed papers / compartments
      if (profile.preUniResult?.hasFailedPapers) {
        failedSubjectsStatus = 'cleared_required';
        whatToConfirm.push("Verify that all compartment/improvement papers are officially cleared on your final board certificate.");
        matchScore -= 5;
      } else {
        failedSubjectsStatus = 'safe';
        whyYouMatch.push("Clean board examination record with zero compartments or failed papers.");
        matchScore += 12;
      }

      // Pre-university university context: Never penalize missing university
      if (!profile.university || profile.university === 'No university experience') {
        whyYouMatch.push("Direct entry open for secondary school / college leavers with no prior university degree required.");
      } else {
        whyYouMatch.push(`Undergraduate transfer credentials from ${profile.university.trim()} evaluated for credit mobility.`);
      }
    }
  } else {
    // 2. STANDARD UNIVERSITY CGPA SENSITIVITY
    const cgpaDiff = normStudentCGPA - minCGPA;
    if (cgpaDiff >= 0.3) {
      cgpaStatus = 'exceeds';
      whyYouMatch.push(`Your normalized CGPA (${normStudentCGPA.toFixed(2)}/4.0) substantially exceeds the minimum cutoff (${minCGPA.toFixed(2)}/4.0), making your application highly competitive.`);
      matchScore += 25;
    } else if (cgpaDiff >= 0) {
      cgpaStatus = 'meets';
      whyYouMatch.push(`Your normalized CGPA (${normStudentCGPA.toFixed(2)}/4.0) meets the stated academic threshold of ${minCGPA.toFixed(2)}/4.0.`);
      matchScore += 15;
    } else if (cgpaDiff >= -0.15) {
      cgpaStatus = 'borderline';
      whatToConfirm.push(`Your normalized CGPA (${normStudentCGPA.toFixed(2)}/4.0) is marginally below the preferred benchmark of ${minCGPA.toFixed(2)}/4.0; strong GRE scores, publications, or motivated essays can compensate.`);
      matchScore += 2;
    } else {
      cgpaStatus = 'below';
      whatCouldDisqualify.push(`Your normalized CGPA (${normStudentCGPA.toFixed(2)}/4.0) does not meet the minimum required academic cutoff (${minCGPA.toFixed(2)}/4.0).`);
      matchScore -= 35;
    }

    // 3. UNIVERSITY-LEVEL FAILED SUBJECTS INTELLIGENTLY
    const failedCount = profile.failedSubjects || 0;
    const policy = scholarship.failedSubjectRule.policy;

    if (failedCount === 0) {
      failedSubjectsStatus = 'safe';
      whyYouMatch.push("Pristine transcript with zero failed courses fulfills strict academic standing requirements.");
      matchScore += 12;
    } else if (failedCount >= 1 && failedCount <= 2) {
      switch (policy) {
        case 'strict_zero_fails':
          failedSubjectsStatus = 'disqualified';
          whatCouldDisqualify.push(`This ultra-competitive award favors flawless academic transcripts. Having ${failedCount} failed course(s) places you at a disadvantage against candidates with clean transcripts.`);
          matchScore -= 25;
          break;
        case 'no_active_backlogs':
        case 'must_be_cleared':
          failedSubjectsStatus = 'cleared_required';
          whyYouMatch.push(`Earlier failed courses are acceptable once cleared; ensure your ${failedCount} backlog(s) are officially passed before departure.`);
          whatToConfirm.push(`Verify that all ${failedCount} retaken subjects are marked as passed on your final degree transcript.`);
          matchScore += 5;
          break;
        case 'allowed_if_cgpa_met':
        default:
          failedSubjectsStatus = 'safe';
          whyYouMatch.push(`The provider focuses on overall cumulative CGPA rather than isolated course failures. Your ${failedCount} failed subject(s) do not disqualify you.`);
          matchScore += 8;
          break;
      }
    } else if (failedCount >= 3 && failedCount <= 5) {
      switch (policy) {
        case 'strict_zero_fails':
          failedSubjectsStatus = 'disqualified';
          whatCouldDisqualify.push(`Having ${failedCount} failed subjects will likely disqualify you from this top-tier merit award where unblemished records are expected.`);
          matchScore -= 35;
          break;
        case 'no_active_backlogs':
        case 'must_be_cleared':
          failedSubjectsStatus = 'cleared_required';
          whatCouldDisqualify.push(`You have ${failedCount} failed subjects. Official rules require every backlog to be remediated and an unencumbered degree conferred.`);
          whatToConfirm.push(`Confirm timeline to clear all ${failedCount} backlogs before the scholarship visa issuance window.`);
          matchScore -= 10;
          break;
        case 'allowed_if_cgpa_met':
        default:
          failedSubjectsStatus = 'cleared_required';
          whyYouMatch.push(`Cumulative CGPA rule applies: if your overall grade point average is maintained, your ${failedCount} failed courses remain permissible.`);
          whatToConfirm.push(`Check if host department imposes a cap on the total number of course retakes allowed.`);
          matchScore -= 5;
          break;
      }
    } else {
      failedSubjectsStatus = 'cleared_required';
      whatCouldDisqualify.push(`Having ${failedCount} failed subjects indicates substantial academic setbacks. Many selective universities will require a strong statement of explanation or mitigating circumstances.`);
      matchScore -= 28;
    }

    // 4. UNIVERSITY CONTEXT
    if (profile.university && profile.university.trim().length > 0) {
      whyYouMatch.push(`Credentials from ${profile.university.trim()} are recognized for international degree equivalence.`);
    }
  }

  // 5. STUDY LEVEL SENSITIVITY
  if (profile.studyLevel) {
    if (matchesStudyLevels(scholarship, [profile.studyLevel])) {
      whyYouMatch.push(`Provides verified funding for your target ${profile.studyLevel} program.`);
      matchScore += 10;
    } else {
      whatCouldDisqualify.push(`This scholarship targets academic levels differing from your selected target (${profile.studyLevel}).`);
      matchScore -= 25;
    }
  }

  // 5B. TARGET DESTINATION SENSITIVITY
  if (profile.targetDestination && profile.targetDestination !== 'Worldwide') {
    if (containsPhrase(scholarship.destinationCountry, profile.targetDestination)) {
      whyYouMatch.push(`Matches your target study destination (${scholarship.destinationCountry}).`);
      matchScore += 12;
    }
  }

  // 5C. DEGREE LEVEL — scored exactly once here (the old duplicate §6 block
  // scored it a second time and is removed).
  if (profile.degreeLevel && profile.degreeLevel !== 'any') {
    if (scholarship.degreeLevels.includes(profile.degreeLevel as any)) {
      whyYouMatch.push(`Provides direct funding for your intended ${profile.degreeLevel.toUpperCase()} degree level.`);
      matchScore += 8;
    } else {
      whatCouldDisqualify.push(`This scholarship specifically targets ${scholarship.degreeLevels.join(", ").toUpperCase()} studies, differing from your selected target (${profile.degreeLevel.toUpperCase()}).`);
      matchScore -= 20;
    }
  }

  // 5. SUBJECT / DISCIPLINE EVALUATION
  let subjectMatchStatus: 'direct_major_match' | 'open_all_fields' | 'restricted_field' = 'open_all_fields';
  if (profile.field) {
    const subjectEval = evaluateSubjectMatch(scholarship, profile.field);
    subjectMatchStatus = subjectEval.status;

    if (subjectMatchStatus === 'direct_major_match') {
      whyYouMatch.push(subjectEval.reason);
      matchScore += 18;
    } else if (subjectMatchStatus === 'open_all_fields') {
      whyYouMatch.push(subjectEval.reason);
      matchScore += 6;
    } else {
      whatCouldDisqualify.push(subjectEval.reason);
      matchScore -= 30;
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
  } else if (isExplicitlyExcluded || (containsPhrase(nationalityStr, 'commonwealth') && !COMMONWEALTH_COUNTRIES.includes(userCountryLower))) {
    category = 'LOW_MATCH';
  } else if (cgpaStatus === 'below') {
    category = 'LOW_MATCH';
  } else if (failedSubjectsStatus === 'disqualified') {
    category = 'LOW_MATCH';
  } else if (subjectMatchStatus === 'restricted_field') {
    category = 'LOW_MATCH';
  } else if (matchScore >= 70 && cgpaStatus !== 'borderline') {
    category = 'STRONG_MATCH';
  } else if (matchScore >= 50) {
    category = 'LIKELY_MATCH';
  } else {
    category = 'POSSIBLE_MATCH';
  }

  // Clamp the internal points to 10 - 99 (ranking only; never a percentage).
  matchScore = Math.min(99, Math.max(10, matchScore));

  return {
    scholarship,
    category,
    matchScore,
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

  // Universal program fields, as whole phrases.
  const isUniversal = containsPhrase(fieldsJoined, 'all fields') || containsPhrase(fieldsJoined, 'all one-year') || containsPhrase(fieldsJoined, 'all majors') || containsPhrase(fieldsJoined, 'all master') || containsPhrase(fieldsJoined, 'all degree');

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
      // Whole-phrase matching both ways, so "art" cannot match "earth
      // science" and "law" cannot match "claw" via substring.
      return containsPhrase(fLower, term) || (fLower.length >= 3 && containsPhrase(term, fLower));
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
    studyLevels?: string[];
    destination?: string;
    searchQuery?: string;
    subjectFilter?: string;
    sortBy?: 'best_match' | 'deadline_soonest' | 'fully_funded' | 'recently_verified';
  }
): MatchResult[] {
  let filtered = [...matches];

  // Study level multi-select filter (OR logic across selected levels)
  if (filter.studyLevels && filter.studyLevels.length > 0 && !filter.studyLevels.includes('All Levels')) {
    filtered = filtered.filter(m => matchesStudyLevels(m.scholarship, filter.studyLevels!));
  }

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
      return b.matchScore - a.matchScore;
    }

    if (sortBy === 'deadline_soonest') {
      // Closed listings sort last, whatever their stored daysRemaining says.
      const daysOf = (m: MatchResult) =>
        m.scholarship.deadlineStatus === 'closed'
          ? Number.POSITIVE_INFINITY
          : (computeDeadlineStatus(m.scholarship.deadline).daysRemaining ?? 999);
      return daysOf(a) - daysOf(b);
    }

    if (sortBy === 'fully_funded') {
      const isAFully = a.scholarship.fundingType === 'fully_funded' ? 1 : 0;
      const isBFully = b.scholarship.fundingType === 'fully_funded' ? 1 : 0;
      if (isBFully !== isAFully) return isBFully - isAFully;
      return b.matchScore - a.matchScore;
    }

    if (sortBy === 'recently_verified') {
      return new Date(b.scholarship.lastVerified).getTime() - new Date(a.scholarship.lastVerified).getTime();
    }

    return 0;
  });

  return filtered;
}
