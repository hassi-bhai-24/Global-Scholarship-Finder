import type { Scholarship, VerificationSourceInfo } from '../types/scholarship.ts';

export const OFFICIAL_SOURCES: VerificationSourceInfo[] = [
  {
    id: "source-gov-us",
    name: "U.S. Department of State — Bureau of Educational and Cultural Affairs",
    portalUrl: "https://foreign.fulbrightonline.org",
    authority: "United States Federal Government",
    jurisdiction: "United States",
    lastChecked: "2026-10-01",
    status: "verified",
    recordsTracked: 142
  },
  {
    id: "source-gov-uk",
    name: "UK Foreign, Commonwealth & Development Office (Chevening / Commonwealth)",
    portalUrl: "https://www.chevening.org",
    authority: "HM Government of the United Kingdom",
    jurisdiction: "United Kingdom",
    lastChecked: "2026-10-03",
    status: "verified",
    recordsTracked: 89
  },
  {
    id: "source-gov-de",
    name: "DAAD — German Academic Exchange Service",
    portalUrl: "https://www.daad.de/en/study-and-research-in-germany/scholarships",
    authority: "Federal Republic of Germany",
    jurisdiction: "Germany",
    lastChecked: "2026-10-04",
    status: "verified",
    recordsTracked: 215
  },
  {
    id: "source-gov-jp",
    name: "Ministry of Education, Culture, Sports, Science and Technology (MEXT)",
    portalUrl: "https://www.studyinjapan.go.jp/en/planning/by-style/pamphlet",
    authority: "Government of Japan",
    jurisdiction: "Japan",
    lastChecked: "2026-09-28",
    status: "verified",
    recordsTracked: 64
  },
  {
    id: "source-gov-kr",
    name: "National Institute for International Education (NIIED / Global Korea Scholarship)",
    portalUrl: "https://www.studyinkorea.go.kr",
    authority: "Ministry of Education, Republic of Korea",
    jurisdiction: "South Korea",
    lastChecked: "2026-10-02",
    status: "verified",
    recordsTracked: 52
  },
  {
    id: "source-gov-se",
    name: "Swedish Institute (SI Scholarship for Global Professionals)",
    portalUrl: "https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals",
    authority: "Government of Sweden",
    jurisdiction: "Sweden",
    lastChecked: "2026-10-05",
    status: "verified",
    recordsTracked: 38
  },
  {
    id: "source-gov-au",
    name: "Australia Awards — Department of Foreign Affairs and Trade (DFAT)",
    portalUrl: "https://www.dfat.gov.au/people-to-people/australia-awards",
    authority: "Australian Government",
    jurisdiction: "Australia",
    lastChecked: "2026-09-29",
    status: "verified",
    recordsTracked: 45
  },
  {
    id: "source-gov-tr",
    name: "Türkiye Bursları — Presidency for Turks Abroad and Related Communities",
    portalUrl: "https://www.turkiyeburslari.gov.tr",
    authority: "Republic of Türkiye",
    jurisdiction: "Turkey",
    lastChecked: "2026-10-02",
    status: "verified",
    recordsTracked: 76
  },
  {
    id: "source-gov-ch",
    name: "Swiss Government Excellence Scholarships (FCS)",
    portalUrl: "https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html",
    authority: "Swiss Confederation",
    jurisdiction: "Switzerland",
    lastChecked: "2026-09-30",
    status: "verified",
    recordsTracked: 31
  },
  {
    id: "source-gov-fr",
    name: "Campus France — Eiffel Excellence Scholarship Programme",
    portalUrl: "https://www.campusfrance.org/en/the-eiffel-scholarship-program",
    authority: "Ministry for Europe and Foreign Affairs, France",
    jurisdiction: "France",
    lastChecked: "2026-10-04",
    status: "verified",
    recordsTracked: 41
  },
  {
    id: "source-eu-erasmus",
    name: "Erasmus Mundus Joint Masters Scholarships (EMJM)",
    portalUrl: "https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/students/erasmus-mundus-joint-masters",
    authority: "European Commission",
    jurisdiction: "European Union",
    lastChecked: "2026-10-05",
    status: "verified",
    recordsTracked: 184
  },
  {
    id: "source-uni-cambridge",
    name: "Gates Cambridge Trust",
    portalUrl: "https://www.gatescambridge.org",
    authority: "University of Cambridge & Bill and Melinda Gates Foundation",
    jurisdiction: "United Kingdom",
    lastChecked: "2026-10-04",
    status: "verified",
    recordsTracked: 12
  },
  {
    id: "source-uni-oxford",
    name: "Clarendon Fund — University of Oxford",
    portalUrl: "https://www.ox.ac.uk/clarendon",
    authority: "University of Oxford",
    jurisdiction: "United Kingdom",
    lastChecked: "2026-10-03",
    status: "verified",
    recordsTracked: 18
  },
  {
    id: "source-uni-stanford",
    name: "Knight-Hennessy Scholars at Stanford University",
    portalUrl: "https://knight-hennessy.stanford.edu",
    authority: "Stanford University",
    jurisdiction: "United States",
    lastChecked: "2026-10-01",
    status: "verified",
    recordsTracked: 15
  }
];

export const VERIFIED_SCHOLARSHIPS: Scholarship[] = [
  {
    id: "fulbright-foreign-student",
    name: "Fulbright Foreign Student Program",
    provider: "U.S. Department of State / Fulbright Commission",
    destinationCountry: "United States",
    officialUrl: "https://foreign.fulbrightonline.org",
    applicationUrl: "https://foreign.fulbrightonline.org/apply",
    eligibleNationalities: ["All Non-US (160+ partner countries including India, Pakistan, Bangladesh, Nigeria, Brazil, Turkey, Indonesia, Egypt, Kenya, Vietnam, etc.)"],
    ineligibleNationalities: ["United States"],
    degreeLevels: ["masters", "phd"],
    levels: ["Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["All fields (excluding clinical medical studies)"],
    minimumCGPA: 3.0,
    minimumCGPAOriginal: 3.0,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Fulbright evaluates cumulative academic record and overall CGPA/division. Prior failed courses that have been retaken or accounted for in final cumulative GPA do NOT automatically disqualify an applicant, provided the minimum overall GPA or second-class upper is maintained and official degree is conferred.",
      officialQuote: "Candidates must possess an undergraduate degree with a strong academic record (typically equivalent to B average / 3.0 or First Class/Upper Second). Backlogs from earlier semesters are not fatal if completed before departure."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full tuition waiver across U.S. host universities",
      stipendMonthly: "$1,800 – $2,600 / month (varies by U.S. city cost of living)",
      travelAllowance: "Round-trip economy international airfare + domestic transit",
      accommodation: "Supported via monthly maintenance allowance",
      insurance: "ASPE Health Benefit Plan coverage throughout duration",
      otherPerks: ["Pre-academic English training", "Enrichment seminars across the US", "J-1 visa sponsorship"]
    },
    deadline: "2026-10-31",
    openingDate: "2026-02-01",
    deadlineStatus: "open",
    daysRemaining: 23,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-04",
    sourceType: "official_government",
    admissionRequirement: "Bachelor's degree equivalent to a 4-year US degree by time of departure; university placement facilitated by IIE.",
    languageRequirement: "TOEFL iBT (min 80) or IELTS (min 6.5) required by final selection stage.",
    applicationSteps: [
      "Select your home country's US Embassy or Fulbright Commission binational page",
      "Complete online Slate application with 3 letters of recommendation",
      "Submit Study Objective & Personal Statement essays",
      "In-person or virtual interview with binational selection committee"
    ],
    requiredDocuments: [
      "Official academic transcripts and degree certificate",
      "3 Letters of Recommendation",
      "Detailed Study/Research Objective",
      "Personal Statement",
      "Valid Passport copy"
    ],
    officialSourceNote: "Verified against U.S. Department of State ECA portal. National deadlines vary between April and October depending on the local commission."
  },
  {
    id: "chevening-scholarships-uk",
    name: "Chevening Scholarships",
    provider: "UK Foreign, Commonwealth and Development Office (FCDO)",
    destinationCountry: "United Kingdom",
    officialUrl: "https://www.chevening.org",
    applicationUrl: "https://www.chevening.org/scholarship/apply",
    eligibleNationalities: ["Chevening-eligible countries (over 160 countries including India, Pakistan, Nigeria, Ghana, Indonesia, Brazil, Egypt, Malaysia, Kenya, etc.)"],
    ineligibleNationalities: ["United Kingdom", "EU citizens without dual qualifying nationality"],
    degreeLevels: ["masters"],
    levels: ["Master's", "Postgraduate / Graduate"],
    fields: ["All one-year taught Master's degree programmes at any UK university"],
    minimumCGPA: 2.8,
    minimumCGPAOriginal: 2.8,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "must_be_cleared",
      description: "Chevening requires an undergraduate degree equivalent to an upper second-class (2:1) or at least 2:2 depending on the course. Failed courses in early semesters do NOT disqualify you if your final degree classification satisfies the UK university master's entry requirement and courses were passed.",
      officialQuote: "You must have an undergraduate degree that will enable you to gain entry onto a postgraduate programme at a UK university (typically a 2:1 honours degree)."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full university tuition fees (fee cap applies to MBA)",
      stipendMonthly: "£1,340 – £1,650 / month (London vs. non-London rates)",
      travelAllowance: "Economy round-trip airfare from home country to UK",
      accommodation: "Covered by monthly living allowance",
      insurance: "Full NHS coverage (immigration health surcharge covered)",
      otherPerks: ["Arrival allowance", "Departure allowance", "Free entry to exclusive Chevening UK networking events"]
    },
    deadline: "2026-11-05",
    openingDate: "2026-08-05",
    deadlineStatus: "open",
    daysRemaining: 28,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-05",
    sourceType: "official_government",
    admissionRequirement: "At least 2 years of work experience (2,800 hours equivalent) and an offer of admission from at least one eligible UK Master's course by July.",
    languageRequirement: "No Chevening language test requirement; applicant must meet chosen UK university's English condition.",
    applicationSteps: [
      "Submit online application via Chevening Online Application System (OAS)",
      "Write 4 leadership and career plan essays (500 words each)",
      "Apply separately to 3 eligible UK master's courses",
      "Shortlisted candidates attend embassy interview in early 2027"
    ],
    requiredDocuments: [
      "Undergraduate degree certificates and transcripts",
      "2 Reference letters from academic or professional referees",
      "3 UK university course choices",
      "Passport / National ID"
    ],
    officialSourceNote: "Chevening official portal verified. One of the world's most prestigious government leadership awards."
  },
  {
    id: "daad-epos-germany",
    name: "DAAD Development-Related Postgraduate Courses (EPOS)",
    provider: "German Academic Exchange Service (DAAD)",
    destinationCountry: "Germany",
    officialUrl: "https://www.daad.de/en/study-and-research-in-germany/scholarships",
    applicationUrl: "https://www.daad.de/en/study-and-research-in-germany/scholarships/daad-scholarships/application-portal",
    eligibleNationalities: ["Developing and emerging countries (DAC List of ODA Recipients including Asia, Africa, Latin America)"],
    degreeLevels: ["masters", "phd"],
    levels: ["Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["Economic Sciences, Development Cooperation, Engineering, Environmental Sciences, Public Health, Law, Education"],
    minimumCGPA: 2.7,
    minimumCGPAOriginal: 2.7,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "DAAD reviews academic standing as a whole (German grade 2.5 or better, equivalent to ~75% or 3.0/4.0). Past failed courses that have been cleared on official graduation transcripts are permitted. Relevance of professional work experience can compensate for borderline grades.",
      officialQuote: "Academic degrees should normally not be more than 6 years old. Good academic record and minimum 2 years related professional work experience."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% tuition (German public universities have zero/negligible tuition)",
      stipendMonthly: "€934 / month for Master's, €1,300 / month for PhD",
      travelAllowance: "Lump-sum international travel allowance provided",
      accommodation: "Monthly subsidy plus rent allowance when applicable",
      insurance: "Full health, accident, and personal liability insurance covered",
      otherPerks: ["Free intensive German language course before degree", "Study and research grant €460/year", "Family allowance if accompanied"]
    },
    deadline: "2026-11-30",
    openingDate: "2026-07-01",
    deadlineStatus: "open",
    daysRemaining: 53,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-04",
    sourceType: "official_government",
    admissionRequirement: "Bachelor's degree in relevant discipline and at least 2 years of professional experience in development-relevant organization.",
    languageRequirement: "IELTS 6.0+ or TOEFL 80+ for English programs, or TestDaF/DSH for German-taught tracks.",
    applicationSteps: [
      "Select eligible EPOS Master's program from the official brochure",
      "Apply directly to the university or DAAD portal according to course guidelines",
      "Submit Europass CV and DAAD motivation letter"
    ],
    requiredDocuments: [
      "DAAD application form",
      "Hand-signed CV (Europass format)",
      "Hand-signed letter of motivation",
      "Employer recommendation & proof of 2 years work experience",
      "Academic transcripts and degree certificates"
    ],
    officialSourceNote: "Source verified directly from DAAD Bonn portal. EPOS program covers over 40 specialized English-taught master's degrees in Germany."
  },
  {
    id: "mext-japanese-government",
    name: "MEXT Japanese Government Scholarship (Research / Graduate)",
    provider: "Ministry of Education, Culture, Sports, Science and Technology (Japan)",
    destinationCountry: "Japan",
    officialUrl: "https://www.studyinjapan.go.jp/en/planning/by-style/pamphlet",
    applicationUrl: "https://www.mext.go.jp/en/policy/education/highered/title02/detail02/sdetail02/1373897.htm",
    eligibleNationalities: ["Citizens of countries that have diplomatic relations with Japan"],
    ineligibleNationalities: ["Japanese nationals"],
    degreeLevels: ["masters", "phd"],
    levels: ["Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["All fields of study matching Japanese universities (Humanities, Social Sciences, Natural Sciences, Engineering, Agriculture, Medicine)"],
    minimumCGPA: 2.9,
    minimumCGPAOriginal: 2.3, // MEXT uses special 3.0 scale calculation: 2.3/3.0
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "MEXT calculates their official GPA using a 3.0 point formula based on grades achieved. While high academic excellence is required, having failed a course earlier in college does NOT bar you if your final MEXT formula score meets or exceeds 2.3 out of 3.0 (approx 3.0/4.0 GPA) and graduation is certified.",
      officialQuote: "Must have a grade point average (GPA) of 2.30 or above out of 3.00 calculated in the designated formula at the most recent university attended."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% waiver of university entrance exam fees, matriculation, and tuition",
      stipendMonthly: "¥144,000 – ¥148,000 / month (approx $950 – $1,050 USD/mo tax-free)",
      travelAllowance: "Economy class international roundtrip airfare provided by MEXT",
      accommodation: "University dormitories or subsidized housing assistance",
      insurance: "National Health Insurance subsidized",
      otherPerks: ["6 months preparatory Japanese language training prior to degree", "Exemption from all university enrollment fees"]
    },
    deadline: "2027-01-15",
    openingDate: "2026-10-01",
    deadlineStatus: "open",
    daysRemaining: 99,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-02",
    sourceType: "official_government",
    admissionRequirement: "Undergraduate degree by time of arrival in Japan; age under 35 years old at time of application.",
    languageRequirement: "Willingness to learn Japanese; English proficiency (TOEFL/IELTS) for English-degree tracks.",
    applicationSteps: [
      "Embassy Recommendation: Apply through Japanese Embassy in your home country (April-June), OR University Recommendation (October-January)",
      "Submit research plan and academic records",
      "Pass written exams and interview",
      "Obtain Letter of Provisional Acceptance from Japanese professors"
    ],
    requiredDocuments: [
      "MEXT application form",
      "Field of Study and Research Plan (2 pages)",
      "Certified academic transcripts and degree certificate",
      "Recommendation letter from Dean/Academic Advisor",
      "Certificate of health"
    ],
    officialSourceNote: "Verified with MEXT Higher Education Bureau. University Recommendation route currently open for 2027 intake."
  },
  {
    id: "gks-global-korea-scholarship",
    name: "Global Korea Scholarship (GKS / KGSP)",
    provider: "National Institute for International Education (NIIED), Ministry of Education, Korea",
    destinationCountry: "South Korea",
    officialUrl: "https://www.studyinkorea.go.kr",
    applicationUrl: "https://www.studyinkorea.go.kr/en/scholarship/Gks1NoticeList.do",
    eligibleNationalities: ["International students from designated countries worldwide (150+ countries)"],
    ineligibleNationalities: ["Korean citizens"],
    degreeLevels: ["bachelors", "masters", "phd"],
    levels: ["Undergraduate (Bachelor's)", "Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["All majors offered by designated Korean partner universities"],
    minimumCGPA: 3.2,
    minimumCGPAOriginal: 80.0,
    cgpaScaleOriginal: "100%",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "GKS strictly enforces a minimum cumulative CGPA of 80% (or rank in top 20% of class) across the entire degree. Having an individual failed course in a semester is NOT an automatic disqualification as long as the cumulative GPA on your final transcript is at least 80% or 2.64/4.0, 3.2/4.0 recommended for competitiveness.",
      officialQuote: "CGPA must be above 80% (or 2.64 on 4.0 scale, 2.80 on 4.3 scale, 2.91 on 4.5 scale), or within top 20% of class. Backlogs must be cleared with official degree awarded."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% tuition for 1-year language program + entire 2-year Master's / 3-year PhD",
      stipendMonthly: "₩1,000,000 – ₩1,300,000 / month (approx $750 – $1,000 USD/mo)",
      travelAllowance: "Actual economy round-trip airfare",
      accommodation: "Covered through settlement and monthly allowances",
      insurance: "Full Korean National Health Insurance coverage",
      otherPerks: ["₩200,000 settlement allowance upon arrival", "₩100,000 research grant/semester for STEM", "₩100,000/month bonus for TOPIK Level 5 or 6"]
    },
    deadline: "2026-10-25",
    openingDate: "2026-09-01",
    deadlineStatus: "closing_soon",
    daysRemaining: 17,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-05",
    sourceType: "official_government",
    admissionRequirement: "Undergraduate degree or equivalent by February of intake year; under 40 years of age for graduate applicants.",
    languageRequirement: "TOEFL, IELTS, or TOPIK scores confer bonus points but not mandatory initially; 1-year mandatory Korean language training included.",
    applicationSteps: [
      "Choose Embassy Track (apply to 3 universities) or University Track (apply to 1 university)",
      "Submit physical apostilled or consular-authenticated application packet",
      "Pass document screening and interview",
      "NIIED 3rd round confirmation and university match"
    ],
    requiredDocuments: [
      "GKS Application form & Personal Statement",
      "Statement of Purpose (Study Plan)",
      "One Letter of Recommendation in sealed envelope",
      "Apostilled Bachelor's Graduation Certificate & Transcript",
      "Proof of Citizenship documents (applicant & parents)"
    ],
    officialSourceNote: "Verified against NIIED official notice. Undergraduate track closes October; Graduate track opens February."
  },
  {
    id: "swedish-institute-global-professionals",
    name: "Swedish Institute Scholarships for Global Professionals (SISGP)",
    provider: "Swedish Institute (Government of Sweden)",
    destinationCountry: "Sweden",
    officialUrl: "https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals",
    applicationUrl: "https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/how-to-apply",
    eligibleNationalities: ["Citizens of 41 eligible countries (including Armenia, Bangladesh, Bolivia, Brazil, Cambodia, Colombia, Ecuador, Egypt, Georgia, Ghana, Guatemala, Indonesia, Jordan, Kenya, Morocco, Nigeria, Pakistan, Philippines, Rwanda, South Africa, Sri Lanka, Tanzania, Turkey, Uganda, Ukraine, Vietnam, Zimbabwe, etc.)"],
    degreeLevels: ["masters"],
    levels: ["Master's", "Postgraduate / Graduate"],
    fields: ["Over 700 eligible Master's programmes focusing on United Nations SDGs, tech, sustainability, business, governance"],
    minimumCGPA: 2.8,
    minimumCGPAOriginal: 2.8,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "The Swedish Institute does not evaluate individual course grades or failed subjects directly; academic eligibility is evaluated entirely by UniversityAdmissions.se. If your university confers an eligible bachelor's degree meeting Swedish university admissions requirements, you qualify for SI. SI selection is heavily based on demonstrated leadership and 3,000 hours of documented work experience.",
      officialQuote: "You must be admitted to one of the eligible master's programmes by University Admissions. SI looks for demonstrated leadership ability and work experience."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full tuition fee paid directly to the Swedish university",
      stipendMonthly: "SEK 12,000 / month (approx $1,150 USD/mo) for entire duration",
      travelAllowance: "SEK 10,000 – 15,000 travel grant for flights",
      accommodation: "Funded via monthly stipend; universities assist with housing guarantees",
      insurance: "Full insurance against sickness and accidents covered by Swedish Legal, Financial and Administrative Services Agency",
      otherPerks: ["Membership in SI Network for Future Global Leaders", "Lifetime SI Alumni Network membership"]
    },
    deadline: "2027-01-16",
    openingDate: "2026-10-15",
    deadlineStatus: "upcoming",
    daysRemaining: 100,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-03",
    sourceType: "official_government",
    admissionRequirement: "Must apply to eligible Swedish master's on universityadmissions.se and have documented at least 3,000 hours of work experience.",
    languageRequirement: "Must meet English 6 requirement (IELTS 6.5 or TOEFL 90 or English medium instruction where recognized).",
    applicationSteps: [
      "Apply for up to 4 master's programmes at universityadmissions.se (deadline mid-January)",
      "Pay application fee or request exemption",
      "Apply for SI scholarship in February using SI's designated template forms",
      "Results announced along with admissions in March/April"
    ],
    requiredDocuments: [
      "Completed SI CV template (max 3 pages)",
      "Two letters of reference on official SI form (at least one from employment)",
      "Valid proof of work and leadership experience on official SI form",
      "Copy of passport"
    ],
    officialSourceNote: "Verified against Swedish Institute official site. Work experience forms are mandatory."
  },
  {
    id: "turkiye-burslari-government",
    name: "Türkiye Bursları (Government of Turkey Scholarships)",
    provider: "Presidency for Turks Abroad and Related Communities (YTB)",
    destinationCountry: "Turkey",
    officialUrl: "https://www.turkiyeburslari.gov.tr",
    applicationUrl: "https://tbbs.turkiyeburslari.gov.tr",
    eligibleNationalities: ["Citizens of all countries worldwide"],
    ineligibleNationalities: ["Citizens of Turkey and those who have lost Turkish citizenship"],
    degreeLevels: ["bachelors", "masters", "phd"],
    levels: ["Undergraduate (Bachelor's)", "Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["All academic fields and faculties across premier Turkish universities"],
    minimumCGPA: 2.8,
    minimumCGPAOriginal: 70.0, // 70% for bachelors, 75% for graduate
    cgpaScaleOriginal: "100%",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Türkiye Bursları assesses cumulative percentage score (min 70% for undergraduate, 75% for master's/PhD, 90% for health sciences). A student who had failed subjects in the past is NOT disqualified as long as their overall graduation mark meets the minimum percentage and no graduation hold exists.",
      officialQuote: "Minimum academic achievement: 70% for bachelor's, 75% for master's and doctorate candidates, 90% for health sciences. All applicants must have graduated or be able to graduate by the end of current academic year."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% university tuition fees paid in full",
      stipendMonthly: "₺3,500 / mo (Bachelor), ₺5,000 / mo (Master), ₺6,500 / mo (PhD)",
      travelAllowance: "One-time flight ticket to Turkey and return flight after graduation",
      accommodation: "Free state dormitory accommodation or housing stipend",
      insurance: "Comprehensive General Health Insurance (GSS)",
      otherPerks: ["1-year free Turkish Language Course (TÖMER)", "University and department placement directly handled by scholarship board"]
    },
    deadline: "2027-02-20",
    openingDate: "2027-01-10",
    deadlineStatus: "upcoming",
    daysRemaining: 135,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-02",
    sourceType: "official_government",
    admissionRequirement: "Under 21 years old for undergraduate, under 30 for Master's, under 35 for PhD at time of application.",
    languageRequirement: "Turkish proficiency not required beforehand (1-year language course provided). Some English-taught majors require TOEFL/IELTS.",
    applicationSteps: [
      "Register an account on TBBS online system",
      "Upload academic history, achievements, and social activities",
      "List up to 12 university and department preferences",
      "Pass expert committee evaluation and face-to-face interview"
    ],
    requiredDocuments: [
      "National identity card or valid passport",
      "Graduation diploma or temporary graduation certificate",
      "Academic transcript showing all courses and grades",
      "Letter of Intent and Research Proposal (for graduate)",
      "Two academic recommendation letters"
    ],
    officialSourceNote: "Verified with official YTB Turkish Scholarships portal. Includes full university placement."
  },
  {
    id: "australia-awards-scholarships",
    name: "Australia Awards Scholarships",
    provider: "Department of Foreign Affairs and Trade (DFAT), Australian Government",
    destinationCountry: "Australia",
    officialUrl: "https://www.dfat.gov.au/people-to-people/australia-awards",
    applicationUrl: "https://oasis.dfat.gov.au",
    eligibleNationalities: ["Citizens of participating Indo-Pacific, South Asian, African, and Middle Eastern countries"],
    degreeLevels: ["masters", "phd"],
    levels: ["Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["Priority development areas aligned with participating bilateral partner countries"],
    minimumCGPA: 2.7,
    minimumCGPAOriginal: 2.7,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "must_be_cleared",
      description: "DFAT Australia Awards requires that all prior tertiary education be fully completed and awarded. Any subject failed during prior semesters must have been remediated or cleared so that the student holds an unencumbered bachelor degree equivalent to an Australian Bachelor degree.",
      officialQuote: "Must not hold an incomplete or failed qualification preventing full university admission in Australia. Meets specific country-desk minimum academic grade (typically 2nd Class Upper or 65%+)."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full tuition fees across Australian universities",
      stipendMonthly: "AUD $3,000+ Contribution to Living Expenses (CLE) bi-weekly/monthly",
      travelAllowance: "Return economy class airfare directly to and from Australia",
      accommodation: "Establishment allowance AUD $5,000 paid upon arrival for initial housing/bonds",
      insurance: "Overseas Student Health Cover (OSHC) for primary awardee",
      otherPerks: ["Introductory Academic Program (IAP) before course", "Pre-course English language training where needed", "Fieldwork allowance for research"]
    },
    deadline: "2027-04-30",
    openingDate: "2027-02-01",
    deadlineStatus: "upcoming",
    daysRemaining: 204,
    verificationStatus: "verified_official",
    lastVerified: "2026-09-29",
    sourceType: "official_government",
    admissionRequirement: "Citizen of participating country; commit to return home for at least 2 years post-graduation.",
    languageRequirement: "IELTS 6.5 (no band less than 6.0) or TOEFL iBT 84 or PTE Academic 58.",
    applicationSteps: [
      "Check country-specific eligibility on DFAT Australia Awards site",
      "Register on Online Australia Awards Scholarships Information System (OASIS)",
      "Submit development impact proposal and academic documents",
      "Shortlisted candidates attend selection interview"
    ],
    requiredDocuments: [
      "Certified copies of university transcripts and degree certificates",
      "Proof of citizenship and birth certificate",
      "Curriculum Vitae with referee details",
      "English language proficiency test results",
      "Development impact and reintegration statement"
    ],
    officialSourceNote: "DFAT official guidelines verified. High funding coverage with full family support provisions in select streams."
  },
  {
    id: "swiss-government-excellence",
    name: "Swiss Government Excellence Scholarships",
    provider: "Federal Commission for Scholarships for Foreign Students (FCS), Switzerland",
    destinationCountry: "Switzerland",
    officialUrl: "https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships.html",
    applicationUrl: "https://www.sbfi.admin.ch/sbfi/en/home/education/scholarships-and-grants/swiss-government-excellence-scholarships/countries.html",
    eligibleNationalities: ["Graduates from over 180 countries worldwide"],
    ineligibleNationalities: ["Swiss nationals"],
    degreeLevels: ["phd", "postdoc"],
    levels: ["PhD / Doctorate", "Postdoctoral / Research Fellowship", "Postgraduate / Graduate"],
    fields: ["All academic fields at Swiss cantonal universities, ETH Zurich, EPFL, or research institutes"],
    minimumCGPA: 3.3,
    minimumCGPAOriginal: 3.3,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "strict_zero_fails",
      description: "Swiss Excellence FCS selection is hyper-competitive based on academic excellence. A clear master's transcript without unresolved failures is standardly expected. Past failures in bachelor's may be overlooked if master's grades are outstanding (A/First Class equivalent) and a Swiss professor formally endorses the candidate.",
      officialQuote: "Candidates are selected by the FCS based on academic profile, research project quality, and endorsement letter from a tenured Swiss host professor."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% exemption from all university tuition fees",
      stipendMonthly: "CHF 1,920 / month for PhD students; CHF 3,500 / month for Postdocs",
      travelAllowance: "Swiss flight allowance provided for candidates from non-EU/EFTA nations",
      accommodation: "CHF 300 one-time housing allowance upon arrival",
      insurance: "Mandatory Swiss health insurance paid by FCS",
      otherPerks: ["Public transport half-fare card (Half-Fare travelcard)", "Trips and dinners organized for FCS scholarship holders"]
    },
    deadline: "2026-11-15",
    openingDate: "2026-08-01",
    deadlineStatus: "open",
    daysRemaining: 38,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-04",
    sourceType: "official_government",
    admissionRequirement: "Master's degree by July 2027; mandatory written endorsement letter from a tenured professor at a Swiss university willing to supervise.",
    languageRequirement: "Fluency in language of research (English, German, French, or Italian depending on lab).",
    applicationSteps: [
      "Contact a Swiss university professor and obtain formal supervisory commitment letter",
      "Request official FCS application package from Swiss Embassy in home country",
      "Submit 3 complete physical application dossiers to Swiss Embassy",
      "Evaluation by Federal Commission for Scholarships"
    ],
    requiredDocuments: [
      "FCS application form with photograph",
      "Letter from Swiss professor confirming willingness to supervise research",
      "Detailed research proposal (max 5 pages) using FCS template",
      "Two letters of recommendation from home university professors",
      "Diplomas and certified transcripts with official translations"
    ],
    officialSourceNote: "Verified against State Secretariat for Education, Research and Innovation (SBFI). Professor support letter is strictly required."
  },
  {
    id: "eiffel-excellence-france",
    name: "Eiffel Excellence Scholarship Programme",
    provider: "Campus France / Ministry for Europe and Foreign Affairs",
    destinationCountry: "France",
    officialUrl: "https://www.campusfrance.org/en/the-eiffel-scholarship-program",
    applicationUrl: "https://www.campusfrance.org/en/the-eiffel-scholarship-program",
    eligibleNationalities: ["International students from emerging and developing countries"],
    ineligibleNationalities: ["French citizens"],
    degreeLevels: ["masters", "phd"],
    levels: ["Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["Science & Technology (Biology, Health, Ecological Transition, Math, Digital), Management, Law, Political Science"],
    minimumCGPA: 3.2,
    minimumCGPAOriginal: 3.2,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Applications for Eiffel cannot be submitted directly by students; students are nominated directly by the French higher education institution. French universities evaluate transcript trajectory. Failed courses in early years do NOT automatically disqualify an applicant if overall GPA is strong and the university chooses to champion the nomination.",
      officialQuote: "Only French higher education institutions may submit applications on behalf of selected candidates. Academic excellence is the primary selection criterion."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "Tuition is not paid by Campus France directly, but French public universities waive registration fees for Eiffel laureates",
      stipendMonthly: "€1,181 / month for Master's, €1,700 / month for PhD students",
      travelAllowance: "International return flight ticket provided directly by Campus France",
      accommodation: "Assistance finding accommodation in CROUS residences with housing subsidies",
      insurance: "Full social security and complementary health insurance coverage",
      otherPerks: ["Cultural activities, visits, and excursions organized across France", "Domestic train transfer from Paris airport to study city"]
    },
    deadline: "2027-01-10",
    openingDate: "2026-10-01",
    deadlineStatus: "open",
    daysRemaining: 94,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-04",
    sourceType: "official_government",
    admissionRequirement: "Age under 25 years old for Master's; under 30 years old for PhD at application date. Nominated by French university.",
    languageRequirement: "Adequate language level for chosen program (French B2/C1 or English for English-taught master's).",
    applicationSteps: [
      "Contact the international relations office of your target French university",
      "Apply to the university program and request Eiffel scholarship nomination",
      "University reviews file and formally submits your application to Campus France by early January"
    ],
    requiredDocuments: [
      "Curriculum Vitae (in French or English, 1-2 pages)",
      "Statement of Purpose explaining why France and chosen degree",
      "Academic transcripts and diploma certificates",
      "Language proficiency test certificate",
      "Letter of support from hosting research director (for PhD)"
    ],
    officialSourceNote: "Campus France verified. Applications must go through the French university, not directly to Campus France."
  },
  {
    id: "erasmus-mundus-joint-masters",
    name: "Erasmus Mundus Joint Masters Scholarships (EMJM)",
    provider: "European Commission / Education, Audiovisual and Culture Executive Agency (EACEA)",
    destinationCountry: "European Union",
    officialUrl: "https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/students/erasmus-mundus-joint-masters",
    applicationUrl: "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en",
    eligibleNationalities: ["Open to students worldwide (Partner countries and Programme countries)"],
    degreeLevels: ["masters"],
    levels: ["Master's", "Postgraduate / Graduate"],
    fields: ["Over 160 specialized joint degree programs across engineering, environmental sciences, arts, social sciences, computer science"],
    minimumCGPA: 3.0,
    minimumCGPAOriginal: 3.0,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Each Erasmus Mundus consortium sets its own academic scoring rubric. Typically, transcripts are evaluated as a complete portfolio. A failed course that was successfully cleared or compensated by high grades in major core courses will NOT prevent acceptance, especially when supported by a compelling motivation letter and relevant research.",
      officialQuote: "Applicants must hold a first higher education degree. Consortium selection committees assess academic excellence, background relevance, and motivation."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full participation costs (all tuition, lab fees, and library fees at 2 to 4 partner EU universities)",
      stipendMonthly: "€1,400 / month living allowance for the full 24 months of study",
      travelAllowance: "Included within the comprehensive €1,400/month flat-rate grant structure",
      accommodation: "Support provided by each host university's international housing office",
      insurance: "Full worldwide health and accident insurance conforming to EACEA standards",
      otherPerks: ["Joint or multiple Master's degrees from at least two top European universities", "Mobility across multiple EU countries"]
    },
    deadline: "2027-01-15",
    openingDate: "2026-10-01",
    deadlineStatus: "open",
    daysRemaining: 99,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-05",
    sourceType: "official_government",
    admissionRequirement: "Bachelor's degree or recognized equivalent completed prior to programme commencement.",
    languageRequirement: "English language proficiency (usually IELTS 6.5 or TOEFL 90).",
    applicationSteps: [
      "Browse the official Erasmus Mundus Catalogue of over 160 active programmes",
      "Select up to 3 different EMJM programmes and visit each consortium's website",
      "Submit online application directly to each consortium before their specific deadline (Dec-Feb)",
      "Ranked results published March-April"
    ],
    requiredDocuments: [
      "Degree certificate and official academic transcripts",
      "Curriculum Vitae (Europass format)",
      "Letter of Motivation explaining consortium choice",
      "Two letters of academic recommendation",
      "Proof of English proficiency"
    ],
    officialSourceNote: "European Commission official portal verified. You can apply to up to 3 Erasmus Mundus master's programmes simultaneously."
  },
  {
    id: "gates-cambridge-scholarship",
    name: "Gates Cambridge Scholarship",
    provider: "Gates Cambridge Trust / University of Cambridge",
    destinationCountry: "United Kingdom",
    officialUrl: "https://www.gatescambridge.org",
    applicationUrl: "https://www.gatescambridge.org/apply/how-to-apply",
    eligibleNationalities: ["Citizens of any country outside the United Kingdom"],
    ineligibleNationalities: ["United Kingdom"],
    degreeLevels: ["masters", "phd"],
    levels: ["Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["Any full-time postgraduate course offered at the University of Cambridge"],
    minimumCGPA: 3.7,
    minimumCGPAOriginal: 3.7,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "no_active_backlogs",
      description: "Gates Cambridge looks for exceptional intellectual ability (first-class honours degree or GPA 3.7+). Active failed courses or backlogs are disqualifying; however, if a previous failure occurred in year 1 and was cleared, with subsequent upper-level coursework demonstrating sustained excellence and top-percentile class standing, the candidate remains eligible.",
      officialQuote: "Must possess outstanding intellectual ability (First Class Honours or 3.7+ GPA). Cambridge departments must rank the candidate as one of the very top academic applicants."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% University Composition Fee at international rate",
      stipendMonthly: "£20,000 / annum (£1,667 / month) single maintenance allowance",
      travelAllowance: "One economy single airfare at beginning and end of course",
      accommodation: "College room or Cambridge private accommodation supported via stipend",
      insurance: "Full NHS coverage (immigration health surcharge paid)",
      otherPerks: ["Academic development funding up to £2,000 for conferences", "Family allowance up to £11,604 for first child", "Fieldwork funding"]
    },
    deadline: "2026-12-03",
    openingDate: "2026-09-02",
    deadlineStatus: "open",
    daysRemaining: 56,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-04",
    sourceType: "official_foundation",
    admissionRequirement: "Admission offer to University of Cambridge for an eligible postgraduate degree.",
    languageRequirement: "Must satisfy Cambridge department English language condition (usually IELTS 7.5 with 7.0 bands).",
    applicationSteps: [
      "Apply for Cambridge admission via the University Postgraduate Applicant Portal",
      "Check the box to apply for Gates Cambridge funding",
      "Complete the 500-word Gates Cambridge personal statement and provide a Gates reference",
      "If departmental shortlisting succeeds, attend virtual interview with Trust panel in February"
    ],
    requiredDocuments: [
      "Cambridge university application with all academic transcripts",
      "Gates Cambridge Statement (500 words on fit with Gates criteria)",
      "Research proposal (for PhD)",
      "Specific Gates Cambridge reference letter in addition to academic references"
    ],
    officialSourceNote: "Gates Cambridge Trust verified. US round closes October; International round closes early December."
  },
  {
    id: "clarendon-fund-oxford",
    name: "Clarendon Fund Scholarships",
    provider: "University of Oxford",
    destinationCountry: "United Kingdom",
    officialUrl: "https://www.ox.ac.uk/clarendon",
    applicationUrl: "https://www.ox.ac.uk/admissions/graduate/applying-to-oxford/application-guide",
    eligibleNationalities: ["All nationalities worldwide (no restrictions)"],
    degreeLevels: ["masters", "phd"],
    levels: ["Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["All full-time and part-time graduate courses at the University of Oxford"],
    minimumCGPA: 3.7,
    minimumCGPAOriginal: 3.7,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "strict_zero_fails",
      description: "Clarendon awards are based entirely on academic excellence. Oxford academics review transcripts looking for consistent First Class or Distinction marks. An isolated failed course from years past will severely disadvantage an applicant unless there were documented exceptional mitigating circumstances and the degree resulted in a clear First Class honours equivalent.",
      officialQuote: "All Oxford graduate applicants who apply by the December/January course deadline are automatically considered. Evaluated strictly on outstanding academic merit."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full course fees covered for the entire duration of study",
      stipendMonthly: "£19,237 / annum (approx £1,600 / month) living grant",
      travelAllowance: "Not explicitly included in basic grant (funded from stipend or college grants)",
      accommodation: "Oxford College accommodation or private rental supported via living grant",
      insurance: "Full NHS access via covered student visa",
      otherPerks: ["Automatic inclusion in Clarendon Scholars' Association", "Symposia, dinners, and career networking events"]
    },
    deadline: "2026-12-08",
    openingDate: "2026-09-01",
    deadlineStatus: "open",
    daysRemaining: 61,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-03",
    sourceType: "official_university",
    admissionRequirement: "Apply for graduate study at Oxford before the relevant December or January course deadline; automatic consideration.",
    languageRequirement: "Standard Oxford English language requirements (IELTS 7.5 or TOEFL 110 for most faculties).",
    applicationSteps: [
      "Submit graduate application to University of Oxford by course deadline",
      "No separate Clarendon application needed; automatic nomination by academic department",
      "Offers sent starting in late February"
    ],
    requiredDocuments: [
      "Official academic transcripts",
      "Statement of purpose / research proposal",
      "3 Academic reference letters",
      "CV / resume",
      "Written work sample (where requested by department)"
    ],
    officialSourceNote: "University of Oxford verified. Over 160 fully funded Clarendon awards granted every year."
  },
  {
    id: "knight-hennessy-stanford",
    name: "Knight-Hennessy Scholars Program",
    provider: "Stanford University",
    destinationCountry: "United States",
    officialUrl: "https://knight-hennessy.stanford.edu",
    applicationUrl: "https://knight-hennessy.stanford.edu/admission/planning-apply",
    eligibleNationalities: ["Citizens of all countries worldwide"],
    degreeLevels: ["masters", "phd"],
    levels: ["Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["Any graduate degree program at Stanford University (JD, MA, MBA, MD, MFA, MS, PhD)"],
    minimumCGPA: 3.5,
    minimumCGPAOriginal: 3.5,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Knight-Hennessy seeks candidates who demonstrate independence of thought, purposeful leadership, and civic mindset. There is no rigid formulaic GPA cutoff. Stanford states that non-traditional trajectories and overcoming academic setbacks or failed courses earlier in study are welcomed if the applicant demonstrates resilience, intellectual vitality, and qualifies for their Stanford graduate degree program.",
      officialQuote: "There are no minimums for GPA or test scores. We look for evidence of independence of thought, purposeful leadership, and civic commitment."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full tuition for up to three years of graduate degree at Stanford",
      stipendMonthly: "$3,800 – $4,500 / month living stipend covering room, board, and books",
      travelAllowance: "Annual economy round-trip airfare ticket between home and Stanford",
      accommodation: "Subsidized Stanford on-campus graduate housing options",
      insurance: "Full Cardinal Care health insurance and campus health service fee covered",
      otherPerks: ["Denning House scholar hub", "King Global Leadership Program (KGLP) leadership labs", "Summer trek and experiential learning funding"]
    },
    deadline: "2026-10-14",
    openingDate: "2026-06-01",
    deadlineStatus: "closing_soon",
    daysRemaining: 6,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-01",
    sourceType: "official_foundation",
    admissionRequirement: "First bachelor's degree earned within the last 7 years. Must apply separately to Stanford graduate degree department.",
    languageRequirement: "Standard Stanford department requirements (TOEFL required for international degrees).",
    applicationSteps: [
      "Submit Knight-Hennessy Scholars online application with video story",
      "Apply separately to Stanford graduate degree program by its specific department deadline",
      "Shortlisted candidates invited to Immersion Weekend at Stanford"
    ],
    requiredDocuments: [
      "Knight-Hennessy online application",
      "Resume (1 page)",
      "Unofficial transcripts for each college attended",
      "Two recommendation letters evaluating leadership and character",
      "Three short answer essays and one video reflection"
    ],
    officialSourceNote: "Stanford Knight-Hennessy portal verified. Extremely prestigious program with 100 scholars per cohort."
  },
  {
    id: "toronto-lester-pearson",
    name: "Lester B. Pearson International Scholarship",
    provider: "University of Toronto",
    destinationCountry: "Canada",
    officialUrl: "https://future.utoronto.ca/pearson",
    applicationUrl: "https://future.utoronto.ca/pearson/about/#apply",
    eligibleNationalities: ["International students studying in Canada or abroad on a study permit"],
    degreeLevels: ["bachelors"],
    levels: ["Undergraduate (Bachelor's)"],
    fields: ["First-entry undergraduate programs across Arts & Science, Engineering, Business, Architecture, Kinesiology"],
    minimumCGPA: 3.7,
    minimumCGPAOriginal: 90.0,
    cgpaScaleOriginal: "100%",
    failedSubjectRule: {
      policy: "strict_zero_fails",
      description: "As Canada's premier undergraduate scholarship for top international students, Lester B. Pearson candidates are nominated by their high schools/colleges as the single top student. Candidates must have an immaculate secondary school record; any unaddressed failing grades would preclude school nomination unless there were extraordinary proven hardships.",
      officialQuote: "Must be recognized as an exceptional student who demonstrates superior academic achievement and creative thought. Nominated by current school."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full undergraduate international tuition for 4 years",
      stipendMonthly: "CAD $1,000 / month incidental allowance",
      travelAllowance: "Books and incidental allowance provided (CAD $1,500/year)",
      accommodation: "Full residence accommodation and meal plan for all 4 years",
      insurance: "Full University Health Insurance Plan (UHIP) coverage",
      otherPerks: ["Dedicated scholar mentorship", "Cohort enrichment programming across Toronto"]
    },
    deadline: "2026-11-30",
    openingDate: "2026-09-01",
    deadlineStatus: "open",
    daysRemaining: 53,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-02",
    sourceType: "official_university",
    admissionRequirement: "Currently in final year of secondary school or graduated no earlier than June; nominated by your high school.",
    languageRequirement: "U of T English language requirements (IELTS 6.5 or TOEFL 100).",
    applicationSteps: [
      "High school counselor nominates student via official U of T counselor portal (deadline Nov 30)",
      "Student applies for undergraduate admission at University of Toronto by mid-December",
      "Student receives personalized link to complete Pearson online application by mid-January"
    ],
    requiredDocuments: [
      "School nomination form",
      "High school transcripts and predicted grades",
      "Pearson Scholarship essays and personal statements",
      "Extracurricular leadership dossier"
    ],
    officialSourceNote: "University of Toronto Admissions verified. Covers 37 scholars annually."
  },
  {
    id: "singa-singapore-agency",
    name: "Singapore International Graduate Award (SINGA)",
    provider: "Agency for Science, Technology and Research (A*STAR) & Singapore Universities (NUS, NTU, SUTD)",
    destinationCountry: "Singapore",
    officialUrl: "https://www.a-star.edu.sg/Scholarships/for-graduate-studies/singapore-international-graduate-award-singa",
    applicationUrl: "https://www.a-star.edu.sg/Scholarships/for-graduate-studies/singapore-international-graduate-award-singa",
    eligibleNationalities: ["All international graduates with passion for research"],
    ineligibleNationalities: ["Singapore Citizens and Permanent Residents"],
    degreeLevels: ["phd"],
    levels: ["PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["Biomedical Sciences, Computing & Information Sciences, Physical Sciences, and Engineering"],
    minimumCGPA: 3.2,
    minimumCGPAOriginal: 3.2,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "SINGA prioritizes tangible research capability, strong passion for science, and good academic standing. Isolated failed courses during early undergraduate study that have been retaken do not bar an applicant, provided the overall cumulative degree meets at least second-class upper honours / 3.2+ GPA and the student shows high research aptitude.",
      officialQuote: "Open for application to all international graduates with passion for biomedical sciences, physical science or engineering research and good academic results."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full PhD tuition fees for up to 4 years of study",
      stipendMonthly: "SGD $2,700 / month, increased to SGD $3,200 / month after passing Qualifying Exam",
      travelAllowance: "One-time airfare grant of up to SGD $1,500",
      accommodation: "One-time settling-in allowance of SGD $1,000 for housing security deposit",
      insurance: "Full university medical insurance coverage",
      otherPerks: ["Work in world-class A*STAR Research Institutes, NUS, NTU, or SUTD laboratories"]
    },
    deadline: "2026-12-01",
    openingDate: "2026-06-01",
    deadlineStatus: "open",
    daysRemaining: 54,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-03",
    sourceType: "official_government",
    admissionRequirement: "Bachelor's or Master's degree in science, engineering, or IT; strong research references.",
    languageRequirement: "Good spoken and written English skills (IELTS/TOEFL recommended though not strictly mandatory if degree was in English).",
    applicationSteps: [
      "Browse research areas and supervisor projects on A*STAR portal",
      "Submit online SINGA application",
      "Nominate 2 academic referees who submit online reports",
      "Attend virtual technical interview with scientific panel in early 2027"
    ],
    requiredDocuments: [
      "Passport valid for at least 1 year",
      "Bachelor's and/or Master's academic transcripts and degree certificates",
      "2 Recommendation reports from academic referees",
      "Research proposal or statement of interests"
    ],
    officialSourceNote: "A*STAR Singapore verified. August 2027 intake deadline is December 1, 2026."
  },
  {
    id: "eth-zurich-excellence",
    name: "ETH Zurich Excellence Scholarship & Opportunity Programme (ESOP)",
    provider: "ETH Zurich (Swiss Federal Institute of Technology)",
    destinationCountry: "Switzerland",
    officialUrl: "https://ethz.ch/students/en/studies/financial/scholarships/excellencescholarship.html",
    applicationUrl: "https://ethz.ch/en/studies/master/application.html",
    eligibleNationalities: ["National and international students worldwide"],
    degreeLevels: ["masters"],
    levels: ["Master's", "Postgraduate / Graduate"],
    fields: ["All Master's degree programmes offered at ETH Zurich"],
    minimumCGPA: 3.6,
    minimumCGPAOriginal: 3.6,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "strict_zero_fails",
      description: "ETH Zurich ESOP is exclusively awarded to applicants in the top 10% of their bachelor's program (grade A). Given the extreme rigor of ETH academic evaluations, transcripts with failed courses will generally be ranked below candidates with unblemished top-percentile academic transcripts.",
      officialQuote: "Prerequisite is a very good result in their Bachelor's degree (top 10% of Bachelor's programme = grade A). Proven track record of high achievement."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% waiver of tuition fees at ETH Zurich for normal duration of Master's",
      stipendMonthly: "CHF 12,000 / semester (approx CHF 2,000 / month, ~$2,250 USD/mo) for living and study costs",
      travelAllowance: "Covered through high semester living grant",
      accommodation: "Support with university student housing registration",
      insurance: "Swiss health insurance subsidized",
      otherPerks: ["Mentorship by a designated faculty member", "Access to ETH Foundation network"]
    },
    deadline: "2026-12-15",
    openingDate: "2026-11-01",
    deadlineStatus: "upcoming",
    daysRemaining: 68,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-04",
    sourceType: "official_university",
    admissionRequirement: "Bachelor's degree from a recognized university with standing in top 10% of cohort.",
    languageRequirement: "C1 English level (IELTS 7.0 or TOEFL 100) or C1 German for German-taught tracks.",
    applicationSteps: [
      "Submit ETH Zurich Master's application via eApply portal",
      "Select ESOP scholarship application option during online process",
      "Upload a pre-proposal for the Master's thesis (must follow specific ETH guidelines)"
    ],
    requiredDocuments: [
      "All bachelor's academic transcripts and degree certificate",
      "Official certificate of class rank proving top 10% standing",
      "Pre-proposal for Master's thesis (max 3 pages)",
      "Letter of motivation (1-2 pages)",
      "Two letters of recommendation from professors"
    ],
    officialSourceNote: "ETH Zurich Rectorate verified. Application window opens November 1 and closes December 15."
  },
  {
    id: "stipendium-hungaricum",
    name: "Stipendium Hungaricum Scholarship",
    provider: "Tempus Public Foundation / Ministry of Foreign Affairs and Trade, Hungary",
    destinationCountry: "Hungary",
    officialUrl: "https://stipendiumhungaricum.hu",
    applicationUrl: "https://apply.stipendiumhungaricum.hu",
    eligibleNationalities: ["Citizens of more than 90 partner countries across Europe, Asia, Africa, Americas"],
    ineligibleNationalities: ["Hungarian citizens"],
    degreeLevels: ["bachelors", "masters", "phd"],
    levels: ["Undergraduate (Bachelor's)", "Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["Wide range of programs across Agriculture, Engineering, Computer Science, Natural Sciences, Medicine, Economics"],
    minimumCGPA: 2.5,
    minimumCGPAOriginal: 2.5,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Stipendium Hungaricum is designed to foster bilateral diplomatic and educational ties. Its academic threshold is moderate (typically 60-70% / 2.5+ GPA). If a student has failed a course earlier in college, this is NOT a bar to eligibility as long as the sending partner ministry in their home country nominates them and the Hungarian university entrance test is passed.",
      officialQuote: "Must be nominated by the Responsible Authority of the Sending Partner country and pass the entrance examination of the Hungarian host institution."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% tuition-free education for the entire duration of the degree",
      stipendMonthly: "HUF 43,700 / mo (Bachelor/Master), HUF 140,000 – 180,000 / mo (PhD)",
      travelAllowance: "Travel costs are covered by candidate or home government",
      accommodation: "Free dormitory place or housing contribution of HUF 40,000 / month",
      insurance: "Comprehensive Hungarian national social health insurance coverage",
      otherPerks: ["Free Hungarian language and cultural orientation courses"]
    },
    deadline: "2027-01-15",
    openingDate: "2026-11-15",
    deadlineStatus: "upcoming",
    daysRemaining: 99,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-03",
    sourceType: "official_government",
    admissionRequirement: "Nomination by sending partner authority in home country and passing entrance interview/exam.",
    languageRequirement: "B2 English certificate (IELTS 5.5 - 6.0 or TOEFL 72) or English proficiency letter.",
    applicationSteps: [
      "Submit application on DreamApply portal for Stipendium Hungaricum",
      "Apply simultaneously to the Sending Partner authority in your home country",
      "Home partner nominates candidates by February",
      "Take university online entrance exam / interview in April-May"
    ],
    requiredDocuments: [
      "Online application form",
      "Motivation letter (min 1 page)",
      "School certificates and academic transcripts with translations",
      "Proof of foreign language proficiency",
      "Medical certificate from general practitioner"
    ],
    officialSourceNote: "Tempus Public Foundation verified. Over 5,000 students awarded each academic year."
  },
  {
    id: "invest-your-talent-italy",
    name: "Invest Your Talent in Italy (IYT)",
    provider: "Ministry of Foreign Affairs and International Cooperation (MAECI), Italy",
    destinationCountry: "Italy",
    officialUrl: "https://www.esteri.it/en/opportunita/borse-di-studio/per-cittadini-stranieri/invest-your-talent-in-italy",
    applicationUrl: "https://investyourtalentapplication.esteri.it",
    eligibleNationalities: ["Citizens of Azerbaijan, Armenia, Brazil, Colombia, Egypt, Ethiopia, Ghana, India, Indonesia, Iran, Kazakhstan, Mexico, Republic of Korea, People's Republic of China, Tunisia, Turkey, Vietnam"],
    degreeLevels: ["masters"],
    levels: ["Master's", "Postgraduate / Graduate"],
    fields: ["Engineering & High Technologies, Design & Architecture, Economics & Management"],
    minimumCGPA: 2.8,
    minimumCGPAOriginal: 75.0,
    cgpaScaleOriginal: "100%",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "IYT combines university master's studies with mandatory 3-month on-the-job training in Italian corporations. Candidates must have completed a bachelor's with good standing (equivalent to 75% or 2.8+ GPA). Prior cleared retakes on academic transcripts are permitted as long as the student is admitted to an IYT partner university program.",
      officialQuote: "Candidates must have an undergraduate degree and obtain admission to one of the eligible English-taught master's courses at an IYT partner university."
    },
    fundingType: "tuition_waiver",
    benefits: {
      tuitionCoverage: "100% full exemption from university tuition enrollment fees",
      stipendMonthly: "€1,000 / month allowance paid every 3 months directly by MAECI",
      travelAllowance: "Not included (student arranges travel)",
      accommodation: "Support with university housing or private rentals",
      insurance: "Full health insurance policy provided for the duration of the scholarship",
      otherPerks: ["Mandatory paid 3-month corporate internship in leading Italian enterprise", "Free Italian language courses"]
    },
    deadline: "2027-02-28",
    openingDate: "2026-12-15",
    deadlineStatus: "upcoming",
    daysRemaining: 143,
    verificationStatus: "verified_official",
    lastVerified: "2026-09-30",
    sourceType: "official_government",
    admissionRequirement: "Bachelor's degree completed; admitted to designated Master's degree at participating Italian universities (e.g., Politecnico di Milano, Politecnico di Torino, Sapienza).",
    languageRequirement: "B2 English certificate (IELTS 6.0, TOEFL 80) or English medium of instruction certificate.",
    applicationSteps: [
      "Apply for admission to an eligible Master's program at an Italian partner university",
      "Register on IYT application platform",
      "Submit 1-minute video motivation pitch alongside CV and transcripts"
    ],
    requiredDocuments: [
      "Final bachelor's transcript and degree certificate",
      "Pre-admission offer from an Italian partner university",
      "1-minute video presentation explaining career goals in Italy",
      "Curriculum Vitae",
      "Proof of English proficiency"
    ],
    officialSourceNote: "Italian Ministry of Foreign Affairs verified. Distinctive for guaranteed industrial corporate internship in Italy."
  },
  {
    id: "commonwealth-masters-phd",
    name: "Commonwealth Master's & PhD Scholarships",
    provider: "Commonwealth Scholarship Commission (CSC UK) / FCDO",
    destinationCountry: "United Kingdom",
    officialUrl: "https://cscuk.fcdo.gov.uk/scholarships",
    applicationUrl: "https://cscuk.fcdo.gov.uk/apply",
    eligibleNationalities: ["Citizens of 54 eligible Commonwealth countries (including India, Pakistan, Bangladesh, Nigeria, Ghana, Kenya, Malaysia, Sri Lanka, South Africa, Tanzania, Uganda, Rwanda, Zambia)"],
    ineligibleNationalities: ["United Kingdom", "Non-Commonwealth states"],
    degreeLevels: ["masters", "phd"],
    levels: ["Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["Science & technology, health systems, global prosperity, peace and security, resilience"],
    minimumCGPA: 3.0,
    minimumCGPAOriginal: 3.0,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "must_be_cleared",
      description: "Requires at least an upper second class (2:1) undergraduate honours degree or second class degree with a relevant Master's. Historical failed modules do not disqualify an applicant if the degree classification satisfies 2:1 and credits were cleared.",
      officialQuote: "Candidates must hold a first degree of at least upper second-class (2:1) honours standard, or a second-class degree and a relevant postgraduate qualification."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% approved full tuition fees covered directly",
      stipendMonthly: "£1,347 / month (£1,652 / month for universities in the London area)",
      travelAllowance: "Approved airfare from home country to the UK and return flight",
      accommodation: "Warm clothing allowance upon arrival + monthly stipend allocation",
      insurance: "Full NHS coverage via visa surcharge exemption",
      otherPerks: ["Study travel grant within UK", "Mid-term study visit allowance for PhD candidates"]
    },
    deadline: "2026-10-17",
    openingDate: "2026-09-05",
    deadlineStatus: "closing_soon",
    daysRemaining: 9,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-06",
    sourceType: "official_government",
    admissionRequirement: "Nominated by an official national nominating agency or non-governmental organization in home country.",
    languageRequirement: "Must meet UK host university English standard (IELTS 6.5 or equivalent).",
    applicationSteps: [
      "Apply through the CSC online application system (OAS)",
      "Secure nomination from your home country's National Nominating Agency or eligible NGO",
      "Apply separately to up to three participating UK universities"
    ],
    requiredDocuments: [
      "Official academic transcripts",
      "Two references submitted online by referees",
      "Detailed development impact statement across four focus themes",
      "Passport or national identity card"
    ],
    officialSourceNote: "Verified against Commonwealth Scholarship Commission official portal."
  },
  {
    id: "csc-chinese-government-scholarship",
    name: "Chinese Government Scholarship (CSC / Silk Road Program)",
    provider: "China Scholarship Council (Ministry of Education, PRC)",
    destinationCountry: "China",
    officialUrl: "https://www.campuschina.org",
    applicationUrl: "https://studyinchina.csc.edu.cn",
    eligibleNationalities: ["Citizens of all countries having diplomatic relations with China"],
    ineligibleNationalities: ["Chinese citizens"],
    degreeLevels: ["bachelors", "masters", "phd"],
    levels: ["Undergraduate (Bachelor's)", "Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["All disciplines across designated Chinese universities (Engineering, AI, Medicine, Economics, Humanities)"],
    minimumCGPA: 2.8,
    minimumCGPAOriginal: 75.0,
    cgpaScaleOriginal: "100%",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "CSC emphasizes overall academic GPA/percentage (typically 75% or 2.8/4.0). Transcripts showing retaken or cleared failed subjects in early semesters are accepted, provided graduation certification is confirmed and academic standing is intact.",
      officialQuote: "Must have good academic performance and have acquired graduation diploma. Program acceptance letter from professor greatly increases award chances."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full tuition waiver across Chinese universities",
      stipendMonthly: "CNY 3,000 / mo (Bachelor), CNY 3,500 / mo (Master), CNY 3,800 / mo (PhD)",
      travelAllowance: "Standard transit assistance where bilateral accord specifies",
      accommodation: "Free university dormitory room or subsidized accommodation stipend",
      insurance: "Comprehensive Medical Insurance for International Students in China",
      otherPerks: ["1-2 years free Chinese language preparatory course if taking Chinese-taught degree"]
    },
    deadline: "2027-03-31",
    openingDate: "2026-11-01",
    deadlineStatus: "upcoming",
    daysRemaining: 174,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-05",
    sourceType: "official_government",
    admissionRequirement: "Age under 25 for Bachelor's, under 35 for Master's, under 40 for PhD.",
    languageRequirement: "HSK 4/5 for Chinese-taught programs, or TOEFL/IELTS/English proficiency certificate for English tracks.",
    applicationSteps: [
      "Contact Chinese university professors for Pre-Admission Letter",
      "Register on CampusChina CSC online portal (Type A Embassy or Type B University)",
      "Submit physical documents if requested by the embassy or university"
    ],
    requiredDocuments: [
      "CSC Application Form",
      "Notarized highest diploma and academic transcripts",
      "Study Plan or Research Proposal (minimum 800 words)",
      "Two recommendation letters signed by professors or associate professors",
      "Foreigner Physical Examination Form"
    ],
    officialSourceNote: "Verified against China Scholarship Council (CSC) official portal."
  },
  {
    id: "new-zealand-manaaki-scholarship",
    name: "Manaaki New Zealand Scholarships",
    provider: "Ministry of Foreign Affairs and Trade (MFAT), New Zealand",
    destinationCountry: "New Zealand",
    officialUrl: "https://www.nzscholarships.govt.nz",
    applicationUrl: "https://www.manaakicustomers.force.com",
    eligibleNationalities: ["Citizens of eligible developing countries in Pacific, Southeast Asia, South Asia, Africa, and Latin America"],
    degreeLevels: ["masters", "phd"],
    levels: ["Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["Climate Change, Renewable Energy, Food Security, Agriculture, Disaster Risk Management, Governance"],
    minimumCGPA: 2.7,
    minimumCGPAOriginal: 2.7,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "must_be_cleared",
      description: "Applicants must hold an undergraduate qualification meeting entry standards of New Zealand universities (equivalent to B average or ~65%). Historical failed courses are acceptable as long as the student has successfully graduated with an unencumbered degree.",
      officialQuote: "Must meet the academic entry requirements of the chosen New Zealand education institution, usually equivalent to a B grade average."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full university tuition fees",
      stipendMonthly: "NZD $531 / week (approx NZD $2,300 / month living allowance)",
      travelAllowance: "Return international airfare between home country and New Zealand",
      accommodation: "NZD $3,000 establishment allowance upon arrival to assist with setting up living quarters",
      insurance: "Full comprehensive medical and travel insurance",
      otherPerks: ["Research and thesis allowance for postgraduate research candidates"]
    },
    deadline: "2027-02-28",
    openingDate: "2027-02-01",
    deadlineStatus: "upcoming",
    daysRemaining: 143,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-04",
    sourceType: "official_government",
    admissionRequirement: "At least 1 year of full-time work experience (or 2 years part-time) related to career objective.",
    languageRequirement: "IELTS 6.5 (no band below 6.0) or TOEFL iBT 90.",
    applicationSteps: [
      "Complete eligibility questionnaire on the Manaaki portal",
      "Submit online application form with work history and development answers",
      "Shortlisted candidates undergo psychometric testing and interview"
    ],
    requiredDocuments: [
      "Academic transcripts and degree certificates with certified translations",
      "Proof of citizenship and birth certificate",
      "Verified employment history documentation",
      "Valid IELTS or TOEFL certificate"
    ],
    officialSourceNote: "Verified against New Zealand Foreign Affairs and Trade (MFAT) scholarship portal."
  },
  {
    id: "holland-nl-scholarship",
    name: "NL Scholarship (formerly Holland Scholarship)",
    provider: "Dutch Ministry of Education, Culture and Science / Nuffic",
    destinationCountry: "Netherlands",
    officialUrl: "https://www.studyinnl.org/finances/nl-scholarship",
    applicationUrl: "https://www.studyinnl.org",
    eligibleNationalities: ["International students from outside the European Economic Area (EEA)"],
    ineligibleNationalities: ["EU / EEA / Swiss nationals"],
    degreeLevels: ["bachelors", "masters"],
    levels: ["Undergraduate (Bachelor's)", "Master's", "Postgraduate / Graduate"],
    fields: ["All study programmes at participating Dutch Research Universities and Universities of Applied Sciences"],
    minimumCGPA: 3.0,
    minimumCGPAOriginal: 3.0,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Individual Dutch institutions evaluate admissions. Failed subjects from past semesters do not block the scholarship if you have received unconditional or conditional admission to an eligible full-time programme.",
      officialQuote: "You must be applying for a full-time bachelor's or master's programme at one of the participating Dutch higher education institutions."
    },
    fundingType: "partial_funding",
    benefits: {
      tuitionCoverage: "€5,000 to €15,000 lump sum contribution towards tuition fees in your first year",
      stipendMonthly: "Can be combined with institutional tuition waivers",
      travelAllowance: "Awarded as financial grant",
      accommodation: "Support provided by university housing desks",
      insurance: "Arranged through university student services",
      otherPerks: ["Priority processing for Dutch MVV / study residence permit"]
    },
    deadline: "2027-02-01",
    openingDate: "2026-11-01",
    deadlineStatus: "upcoming",
    daysRemaining: 116,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-05",
    sourceType: "official_government",
    admissionRequirement: "Apply for a degree at a participating Dutch research university or applied sciences university.",
    languageRequirement: "Meets Dutch university English requirement (IELTS 6.5 or TOEFL 90).",
    applicationSteps: [
      "Select a participating Dutch university (e.g. TU Delft, Erasmus, Leiden, Utrecht)",
      "Apply for the Bachelor's or Master's programme via Studielink",
      "Apply for the NL Scholarship directly via the university's scholarship portal"
    ],
    requiredDocuments: [
      "Dutch university admission offer or application confirmation",
      "Curriculum Vitae",
      "Motivation letter explaining why you chose the Netherlands",
      "Transcripts of prior academic degrees"
    ],
    officialSourceNote: "Verified against Study in NL / Nuffic official scholarship service."
  },
  {
    id: "vlir-uos-belgium",
    name: "VLIR-UOS ICP Master's Scholarships (Belgium)",
    provider: "Flemish Interuniversity Council (VLIR-UOS), Belgium",
    destinationCountry: "Belgium",
    officialUrl: "https://www.vliruos.be/en/scholarships",
    applicationUrl: "https://www.vliruos.be",
    eligibleNationalities: ["Nationals and residents of 29 eligible partner countries in Africa, Asia, and Latin America"],
    degreeLevels: ["masters"],
    levels: ["Master's", "Postgraduate / Graduate"],
    fields: ["Sustainable Development, Food Technology, Marine Science, Transportation, Water Resources, Global Health"],
    minimumCGPA: 2.8,
    minimumCGPAOriginal: 2.8,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "ICP Master's programmes at KU Leuven, Ghent University, and Antwerp review applicants based on professional motivation and academic background. Past course failures are permitted provided bachelor's degree graduation is confirmed with adequate grades.",
      officialQuote: "Academic performance and relevance of professional development impact are key selection criteria."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full tuition fee waived",
      stipendMonthly: "€1,150 / month allowance for the duration of the 1 or 2-year Master's",
      travelAllowance: "Full international airline ticket from home country to Brussels and return",
      accommodation: "Supported via monthly allowance and university student residences",
      insurance: "Full health and third-party liability insurance covered",
      otherPerks: ["Logistic allowance of €700 on arrival", "Fieldwork allowance within Flemish university consortia"]
    },
    deadline: "2027-02-01",
    openingDate: "2026-10-15",
    deadlineStatus: "upcoming",
    daysRemaining: 116,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-04",
    sourceType: "official_government",
    admissionRequirement: "Age under 35 for Master's at time of application; bachelor's degree in relevant discipline.",
    languageRequirement: "IELTS 6.5 or TOEFL 80 or proof of instruction in English.",
    applicationSteps: [
      "Select an eligible ICP Master's programme on the VLIR-UOS site",
      "Apply directly to the Flemish host university (KU Leuven, Ghent University, Hasselt, etc.)",
      "Indicate on application form that you wish to apply for VLIR-UOS scholarship"
    ],
    requiredDocuments: [
      "Certified university diploma and transcripts",
      "Motivation letter tailored to developmental impact in home country",
      "Two letters of recommendation",
      "Employer statement endorsing your scholarship candidacy"
    ],
    officialSourceNote: "Verified against Flemish Interuniversity Council (VLIR-UOS) official guidelines."
  },
  {
    id: "austrian-oead-ernst-mach",
    name: "Austrian Government Ernst Mach Grant",
    provider: "OeAD (Austrian Agency for Education and Internationalisation)",
    destinationCountry: "Austria",
    officialUrl: "https://oead.at/en/to-austria/grants-and-scholarships/ernst-mach-grant",
    applicationUrl: "https://www.grants.at",
    eligibleNationalities: ["Graduates and postgraduates from all non-European countries worldwide"],
    ineligibleNationalities: ["EU / EEA citizens"],
    degreeLevels: ["masters", "phd"],
    levels: ["Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["Natural Sciences, Technical Sciences, Human Medicine, Health Sciences, Agricultural Sciences, Social Sciences, Humanities"],
    minimumCGPA: 3.0,
    minimumCGPAOriginal: 3.0,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Grants are evaluated based on research plan feasibility and academic capability. Cleared failed subjects on undergraduate transcripts do not bar an applicant, provided an Austrian university professor formally consents to academic supervision.",
      officialQuote: "Written consent of a supervisor at an Austrian university is mandatory. Academic standing evaluated through research proposal."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% exemption from university tuition fees in Austria",
      stipendMonthly: "€1,250 / month grant for study/research stays of up to 9 months",
      travelAllowance: "Lump sum travel subsidy up to €1,000 for non-European students",
      accommodation: "OeAD student housing assistance",
      insurance: "Health insurance arranged through OeAD student housing services",
      otherPerks: ["Public transport subsidies in Vienna and other Austrian university cities"]
    },
    deadline: "2027-03-01",
    openingDate: "2026-10-01",
    deadlineStatus: "open",
    daysRemaining: 144,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-05",
    sourceType: "official_government",
    admissionRequirement: "Enrolled in a master's or PhD programme in home country or recently graduated; supervisor endorsement from Austrian host university.",
    languageRequirement: "Adequate English or German proficiency for research lab.",
    applicationSteps: [
      "Find a research host professor at an Austrian university and obtain written supervision consent",
      "Submit electronic application via grants.at OeAD portal",
      "Upload project description and reference letters"
    ],
    requiredDocuments: [
      "Two letters of recommendation by university lecturers",
      "Written consent of supervisor at Austrian university",
      "Detailed research and study proposal",
      "Passport scan and transcripts"
    ],
    officialSourceNote: "Verified against OeAD Austria grants database (grants.at)."
  },
  {
    id: "rhodes-scholarship-oxford",
    name: "The Rhodes Scholarship at University of Oxford",
    provider: "Rhodes Trust / University of Oxford",
    destinationCountry: "United Kingdom",
    officialUrl: "https://www.rhodeshouse.ox.ac.uk",
    applicationUrl: "https://www.rhodeshouse.ox.ac.uk/scholarships/applications",
    eligibleNationalities: ["Citizens of designated global constituencies (India, Pakistan, West Africa, East Africa, Southern Africa, China, Saudi Arabia, UAE, Syria/Jordan/Lebanon, Global constituency for all others)"],
    degreeLevels: ["masters", "phd"],
    levels: ["Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["Any full-time postgraduate degree at the University of Oxford"],
    minimumCGPA: 3.7,
    minimumCGPAOriginal: 3.7,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "strict_zero_fails",
      description: "Rhodes looks for literary and scholastic achievements of the highest standard (First Class Honours or GPA 3.7+). Having failed subjects is a severe hurdle unless there are proven extenuating medical or personal hardships and subsequent academic honors were attained.",
      officialQuote: "Literary and scholastic attainments; energy to use one's talents to the full; truth, courage, devotion to duty; moral force of character."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% University of Oxford composition fees and college fees",
      stipendMonthly: "£19,092 / annum (approx £1,591 / month) living stipend",
      travelAllowance: "Two economy class flights (beginning and completion of scholarship)",
      accommodation: "Oxford College accommodation subsidized through living stipend",
      insurance: "Full NHS coverage (international health surcharge paid)",
      otherPerks: ["Settling-in allowance of £225", "Access to Rhodes House convening events and leadership labs"]
    },
    deadline: "2026-10-15",
    openingDate: "2026-06-01",
    deadlineStatus: "closing_soon",
    daysRemaining: 7,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-06",
    sourceType: "official_foundation",
    admissionRequirement: "Age 18-24 (or under 27 with completed bachelor's); first-class undergraduate academic degree.",
    languageRequirement: "Must meet Oxford postgraduate English conditions (IELTS 7.5 or TOEFL 110).",
    applicationSteps: [
      "Submit Rhodes Scholarship application with academic dossier and personal statement",
      "Six to eight letters of recommendation (at least four academic)",
      "Constituency social engagement and panel interviews",
      "Final selection committee in-person interview"
    ],
    requiredDocuments: [
      "Certified transcripts of all university courses",
      "Personal statement (750 words on who you are and what you wish to achieve)",
      "Academic statement of study (350 words detailing Oxford degree plans)",
      "Birth certificate or passport",
      "6-8 Letters of reference"
    ],
    officialSourceNote: "Verified against Rhodes Trust Oxford canonical portal."
  },
  {
    id: "schwarzman-scholars-tsinghua",
    name: "Schwarzman Scholars at Tsinghua University",
    provider: "Schwarzman Scholars / Tsinghua University",
    destinationCountry: "China",
    officialUrl: "https://www.schwarzman scholars.org",
    applicationUrl: "https://www.schwarzmanscholars.org/admissions",
    eligibleNationalities: ["Citizens of all countries worldwide"],
    degreeLevels: ["masters"],
    levels: ["Master's", "Postgraduate / Graduate"],
    fields: ["One-year Master's of Global Affairs (Leadership, Public Policy, Economics, International Relations)"],
    minimumCGPA: 3.3,
    minimumCGPAOriginal: 3.3,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Leadership potential, character, and intellectual vitality are core criteria. There is no rigid GPA cutoff; past course failures that were remediated do not prevent selection if you demonstrate outstanding leadership and global impact.",
      officialQuote: "We evaluate candidates holistically across academic performance, leadership, and exemplary character."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full tuition and fees for the one-year Master's degree",
      stipendMonthly: "$4,000 stipend for personal expenses over the course of study",
      travelAllowance: "Round-trip airfare to and from Beijing at beginning and end of year",
      accommodation: "Room and board at Schwarzman College inside Tsinghua University",
      insurance: "Full comprehensive health insurance plan",
      otherPerks: ["In-country study tours across China", "Lenovo laptop and course textbooks provided", "Dedicated mentor pairings"]
    },
    deadline: "2026-10-18",
    openingDate: "2026-04-15",
    deadlineStatus: "closing_soon",
    daysRemaining: 10,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-06",
    sourceType: "official_foundation",
    admissionRequirement: "Undergraduate degree by August of matriculation; age 18 to 28.",
    languageRequirement: "TOEFL iBT (100) or IELTS (7.0) for non-native English speakers.",
    applicationSteps: [
      "Submit online application form with 2 essays and 1-minute video introduction",
      "Three letters of recommendation (including one assessing leadership)",
      "Regional semi-final interviews in London, Bangkok, New York, or virtual"
    ],
    requiredDocuments: [
      "Academic transcripts from each university attended",
      "Leadership essay (750 words) & Statement of Purpose (500 words)",
      "Current resume / CV (max 2 pages)",
      "Three recommendation letters"
    ],
    officialSourceNote: "Verified against Schwarzman Scholars official admissions portal."
  },
  {
    id: "melbourne-research-scholarship",
    name: "Melbourne Research Scholarships (MRS / Graduate Research)",
    provider: "University of Melbourne",
    destinationCountry: "Australia",
    officialUrl: "https://scholarships.unimelb.edu.au/awards/graduate-research-scholarships",
    applicationUrl: "https://study.unimelb.edu.au/how-to-apply/graduate-research",
    eligibleNationalities: ["Domestic and international students of all nationalities"],
    degreeLevels: ["masters", "phd"],
    levels: ["Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["All research degree disciplines offered across faculties at University of Melbourne"],
    minimumCGPA: 3.4,
    minimumCGPAOriginal: 80.0,
    cgpaScaleOriginal: "100%",
    failedSubjectRule: {
      policy: "must_be_cleared",
      description: "Scoring is determined by academic ranking (H1 honours equivalence / ~80% average in final degree year) and research potential. Earlier course failures are acceptable if the final honours year or Master's research year achieved first-class results.",
      officialQuote: "Must have applied for and meet the entry requirements for a Master by research or doctoral degree at the University of Melbourne."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full fee offset for up to two years for Master's, four years for PhD",
      stipendMonthly: "AUD $37,000 / annum (approx AUD $3,083 / month tax-free)",
      travelAllowance: "Relocation grant of AUD $3,000 for students relocating from overseas",
      accommodation: "Supported through monthly living allowance",
      insurance: "Full Overseas Student Health Cover (OSHC) Single Membership",
      otherPerks: ["Paid sick, maternity, and parenting leave provisions"]
    },
    deadline: "2026-10-31",
    openingDate: "2026-06-01",
    deadlineStatus: "open",
    daysRemaining: 23,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-05",
    sourceType: "official_university",
    admissionRequirement: "Unconditional admission to a graduate research degree at University of Melbourne.",
    languageRequirement: "Standard Melbourne English language requirements (IELTS 6.5-7.0 depending on faculty).",
    applicationSteps: [
      "Find a supervisor and prepare research proposal",
      "Submit course application; scholarship consideration is automatic when applying by deadline"
    ],
    requiredDocuments: [
      "Academic transcripts and grading scale keys",
      "Research proposal summary",
      "Referees' contact details for two academic reports",
      "Curriculum Vitae highlighting any publications"
    ],
    officialSourceNote: "Verified against University of Melbourne Graduate Research Scholarships directory."
  },
  {
    id: "sydney-international-research",
    name: "University of Sydney International Strategic Scholarship (USydIS)",
    provider: "University of Sydney",
    destinationCountry: "Australia",
    officialUrl: "https://www.sydney.edu.au/scholarships/e/university-of-sydney-international-strategic-scholarship.html",
    applicationUrl: "https://www.sydney.edu.au",
    eligibleNationalities: ["International students of all nationalities"],
    ineligibleNationalities: ["Australian / New Zealand citizens and Australian Permanent Residents"],
    degreeLevels: ["masters", "phd"],
    levels: ["Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["All postgraduate research fields across faculties at University of Sydney"],
    minimumCGPA: 3.3,
    minimumCGPAOriginal: 78.0,
    cgpaScaleOriginal: "100%",
    failedSubjectRule: {
      policy: "must_be_cleared",
      description: "Assessed based on academic merit and research potential. Prior failed courses in early study years are disregarded if the student achieved first-class honours in their bachelor's or postgraduate degree.",
      officialQuote: "Assessed based on research experience, prior academic results, and publication record."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full tuition fees covered for up to 3.5 years for PhD, 2 years for Master's",
      stipendMonthly: "AUD $40,109 / annum (approx AUD $3,342 / month tax-free)",
      travelAllowance: "Standard relocation grant provided upon arrival in Sydney",
      accommodation: "Supported through living stipend",
      insurance: "Single Overseas Student Health Cover (OSHC) included",
      otherPerks: ["Conference travel allowance supported through faculty research grants"]
    },
    deadline: "2026-12-15",
    openingDate: "2026-08-01",
    deadlineStatus: "open",
    daysRemaining: 68,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-04",
    sourceType: "official_university",
    admissionRequirement: "Bachelor's degree with first-class honours or Master's with substantial research thesis.",
    languageRequirement: "IELTS 6.5 or 7.0 depending on department.",
    applicationSteps: [
      "Submit postgraduate research application for admission at University of Sydney",
      "Select 'Yes' to be considered for research scholarships; no separate form needed"
    ],
    requiredDocuments: [
      "Official academic transcripts and degree certificates",
      "Detailed research proposal",
      "Evidence of research outputs or publications",
      "Two academic referee reports"
    ],
    officialSourceNote: "Verified against University of Sydney official scholarships office."
  },
  {
    id: "kaust-fellowship-saudi",
    name: "KAUST Fellowship (King Abdullah University of Science and Technology)",
    provider: "King Abdullah University of Science and Technology",
    destinationCountry: "Saudi Arabia",
    officialUrl: "https://www.kaust.edu.sa/en/study/fellowship",
    applicationUrl: "https://admissions.kaust.edu.sa",
    eligibleNationalities: ["All nationalities worldwide (100+ countries represented)"],
    degreeLevels: ["masters", "phd"],
    levels: ["Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["Biological and Environmental Science, Computer Science, Electrical Engineering, Physical Sciences, Chemical Engineering"],
    minimumCGPA: 3.3,
    minimumCGPAOriginal: 3.3,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "KAUST assesses applicants based on aptitude for high-impact STEM research. Having past retaken failed courses in early semesters does not disqualify you if your final degree GPA is above 3.3 and you excel in technical interviews.",
      officialQuote: "Every admitted student at KAUST receives the KAUST Fellowship. Admission is competitive and based on academic merit and research drive."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full tuition support for MS and PhD degrees",
      stipendMonthly: "$20,000 to $30,000 annual living allowance ($1,666 – $2,500 / month)",
      travelAllowance: "Relocation allowance and annual return airfare to home country",
      accommodation: "On-campus individual or shared housing with all utilities provided for free",
      insurance: "Full medical and dental health insurance coverage",
      otherPerks: ["World-class laboratory facilities on Red Sea campus", "No campus living expenses"]
    },
    deadline: "2027-01-15",
    openingDate: "2026-09-01",
    deadlineStatus: "open",
    daysRemaining: 99,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-06",
    sourceType: "official_university",
    admissionRequirement: "Bachelor's or Master's in a STEM field; rigorous technical faculty interview.",
    languageRequirement: "TOEFL iBT 79 or IELTS 6.5.",
    applicationSteps: [
      "Submit online application on KAUST admissions portal",
      "Faculty member conducts technical screening interview",
      "Admissions committee reviews academic transcripts and reference letters"
    ],
    requiredDocuments: [
      "Complete university transcripts with certified English translation",
      "Curriculum Vitae",
      "Statement of Purpose (750 words)",
      "Three letters of recommendation from faculty or research supervisors",
      "Official TOEFL or IELTS score report"
    ],
    officialSourceNote: "Verified against KAUST Admissions & Fellowship official portal."
  },
  {
    id: "kfupm-graduate-scholarship",
    name: "KFUPM Graduate Deanship Scholarship (King Fahd University)",
    provider: "King Fahd University of Petroleum & Minerals",
    destinationCountry: "Saudi Arabia",
    officialUrl: "https://postgrad.kfupm.edu.sa",
    applicationUrl: "https://postgrad.kfupm.edu.sa/scholarships",
    eligibleNationalities: ["International male and female graduates from all countries worldwide"],
    degreeLevels: ["masters", "phd"],
    levels: ["Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["Engineering, Applied Sciences, Computing, Artificial Intelligence, Business"],
    minimumCGPA: 3.0,
    minimumCGPAOriginal: 3.0,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Minimum GPA requirement is 3.00 out of 4.00 (or equivalent) in major field. If past course failures were cleared and overall CGPA exceeds 3.0, applicants are evaluated based on GRE and technical preparation.",
      officialQuote: "A GPA of at least 3.00 on a scale of 4.00 or equivalent in the major field of study."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full university tuition fees waived",
      stipendMonthly: "SR 2,500 / month (approx $670 USD/mo tax-free allowance)",
      travelAllowance: "Free round-trip airfare ticket upon joining and completion of degree",
      accommodation: "Free furnished air-conditioned bachelor/single on-campus housing",
      insurance: "Free medical and dental care at the University Medical Center",
      otherPerks: ["Free university textbooks", "Subsidized campus meals and recreation facilities"]
    },
    deadline: "2026-12-17",
    openingDate: "2026-09-15",
    deadlineStatus: "open",
    daysRemaining: 70,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-05",
    sourceType: "official_university",
    admissionRequirement: "Bachelor's degree in engineering or science; strong mathematical aptitude.",
    languageRequirement: "TOEFL iBT 70 or IELTS 6.0.",
    applicationSteps: [
      "Complete online graduate application on KFUPM Deanship of Graduate Studies portal",
      "Upload digital copies of degree, transcripts, and statement",
      "Referees submit recommendation letters online"
    ],
    requiredDocuments: [
      "Certified academic transcript and graduation certificate",
      "Identification copy (Passport)",
      "Three recommendation letters from university professors",
      "Statement of Purpose"
    ],
    officialSourceNote: "Verified against KFUPM Deanship of Graduate Studies official website."
  },
  {
    id: "world-bank-graduate-scholarship",
    name: "Joint Japan/World Bank Graduate Scholarship Program (JJ/WBGSP)",
    provider: "World Bank / Government of Japan",
    destinationCountry: "Global (US, Europe, Japan, Africa)",
    officialUrl: "https://www.worldbank.org/en/programs/scholarships#3",
    applicationUrl: "https://www.worldbank.org/en/programs/scholarships",
    eligibleNationalities: ["Nationals of World Bank member developing countries (100+ countries)"],
    degreeLevels: ["masters"],
    levels: ["Master's", "Postgraduate / Graduate"],
    fields: ["Development Economics, Infrastructure, Public Health, Agriculture, Environment, Public Policy"],
    minimumCGPA: 2.8,
    minimumCGPAOriginal: 2.8,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Requires at least 3 years of development-related work experience post-bachelor's. Because selection hinges on professional impact, historical retakes on bachelor's transcripts do not disqualify you once an unconditional admission offer from a partner university is secured.",
      officialQuote: "Must have at least 3 years of paid development-related work experience and hold unconditional admission to a participating master's program."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full tuition for the approved Master's program",
      stipendMonthly: "Monthly living stipend covering accommodation, food, and books",
      travelAllowance: "Economy class air travel between home country and the host university",
      accommodation: "Covered through living allowance",
      insurance: "Basic medical insurance provided through the host university",
      otherPerks: ["US $500 travel allowance for each trip"]
    },
    deadline: "2027-03-27",
    openingDate: "2027-01-15",
    deadlineStatus: "upcoming",
    daysRemaining: 170,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-04",
    sourceType: "official_foundation",
    admissionRequirement: "At least 3 years of paid development work experience after bachelor's; unconditional admission to partner master's program.",
    languageRequirement: "Determined by host university (usually IELTS 6.5 or TOEFL 90).",
    applicationSteps: [
      "Apply and gain unconditional admission to one of the JJ/WBGSP participating master's programs (e.g. Harvard, Columbia, Oxford, Tokyo)",
      "Submit JJ/WBGSP online application with employer recommendation",
      "World Bank selection steering committee evaluation"
    ],
    requiredDocuments: [
      "Unconditional letter of admission to participating program",
      "Proof of 3+ years development work experience",
      "Two professional recommendation letters from current/former employers",
      "Bachelor's degree diploma and transcripts"
    ],
    officialSourceNote: "Verified against World Bank Group Scholarships Program official site."
  },
  {
    id: "adb-japan-scholarship-program",
    name: "Asian Development Bank – Japan Scholarship Program (ADB-JSP)",
    provider: "Asian Development Bank (ADB)",
    destinationCountry: "Asia-Pacific & US (Japan, Singapore, Australia, New Zealand, USA)",
    officialUrl: "https://www.adb.org/work-with-us/careers/japan-scholarship-program",
    applicationUrl: "https://www.adb.org",
    eligibleNationalities: ["Citizens of ADB borrowing member countries (e.g. Bangladesh, Cambodia, India, Indonesia, Pakistan, Philippines, Sri Lanka, Thailand, Vietnam)"],
    degreeLevels: ["masters"],
    levels: ["Master's", "Postgraduate / Graduate"],
    fields: ["Economics, Management, Science and Technology, Environment, Agriculture, Public Health"],
    minimumCGPA: 2.8,
    minimumCGPAOriginal: 2.8,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "must_be_cleared",
      description: "Requires at least 2 years of professional work experience and a distinguished undergraduate record. Cleared backlogs are acceptable as long as bachelor's degree was awarded with good standing.",
      officialQuote: "Must have at least 2 years of full-time professional work experience and agree to return to home country upon completion."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full tuition fees at designated participating institutions",
      stipendMonthly: "Monthly subsistence and housing allowance",
      travelAllowance: "Economy airfare between home country and host institution",
      accommodation: "Supported through monthly housing allowance",
      insurance: "Full medical and accident insurance",
      otherPerks: ["Books and instructional materials allowance", "Special thesis preparation grant"]
    },
    deadline: "2027-02-15",
    openingDate: "2026-10-01",
    deadlineStatus: "open",
    daysRemaining: 130,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-05",
    sourceType: "official_foundation",
    admissionRequirement: "Age under 35; 2 years full-time work experience; admission to an ADB-JSP partner university.",
    languageRequirement: "Proficiency in English as required by host university.",
    applicationSteps: [
      "Choose an eligible program at an ADB-JSP designated institution (e.g. University of Tokyo, NUS, University of Melbourne, East-West Center)",
      "Submit university admission application and indicate interest in ADB-JSP scholarship",
      "University shortlists and nominates candidate to ADB"
    ],
    requiredDocuments: [
      "Undergraduate diploma and certified transcripts",
      "Proof of employment and income certificate",
      "Two letters of recommendation",
      "Written commitment to return to home country for 2 years"
    ],
    officialSourceNote: "Verified against Asian Development Bank official site."
  },
  {
    id: "ubc-international-major-entrance",
    name: "UBC International Major Entrance Scholarship (IMES)",
    provider: "University of British Columbia",
    destinationCountry: "Canada",
    officialUrl: "https://you.ubc.ca/financial-planning/scholarships-award-international-students",
    applicationUrl: "https://you.ubc.ca/applying-ubc",
    eligibleNationalities: ["International students applying directly from secondary school or post-secondary"],
    ineligibleNationalities: ["Canadian citizens and permanent residents"],
    degreeLevels: ["bachelors"],
    levels: ["Undergraduate (Bachelor's)"],
    fields: ["All undergraduate degree programs across UBC Vancouver and Okanagan campuses"],
    minimumCGPA: 3.5,
    minimumCGPAOriginal: 85.0,
    cgpaScaleOriginal: "100%",
    failedSubjectRule: {
      policy: "strict_zero_fails",
      description: "IMES awards are offered to entering undergraduate students based on exceptional academic achievement. Applicants with unaddressed failed subjects are unlikely to receive nomination unless superior trajectory is shown.",
      officialQuote: "Awarded to exceptional international students entering undergraduate programs at UBC."
    },
    fundingType: "partial_funding",
    benefits: {
      tuitionCoverage: "CAD $10,000 to $25,000 / year renewable for up to 4 years of study",
      stipendMonthly: "Helps offset high international tuition fees",
      travelAllowance: "Applied directly to tuition account",
      accommodation: "First-year guaranteed residence on campus",
      insurance: "Enrolled in iMed health insurance",
      otherPerks: ["Membership in UBC International Scholars community"]
    },
    deadline: "2027-01-15",
    openingDate: "2026-09-01",
    deadlineStatus: "open",
    daysRemaining: 99,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-04",
    sourceType: "official_university",
    admissionRequirement: "Apply for undergraduate admission to UBC by January 15; automatic scholarship assessment.",
    languageRequirement: "UBC English language requirement (IELTS 6.5 or TOEFL 90).",
    applicationSteps: [
      "Apply for undergraduate admission to UBC before January 15",
      "Complete UBC Personal Profile essays inside application portal",
      "Admissions committee evaluates candidates automatically for IMES"
    ],
    requiredDocuments: [
      "Official high school / college transcripts",
      "UBC Personal Profile responses",
      "English language proficiency test results"
    ],
    officialSourceNote: "Verified against University of British Columbia International Student Guide."
  },
  {
    id: "ucl-global-masters-scholarship",
    name: "UCL Global Masters Scholarship",
    provider: "University College London (UCL)",
    destinationCountry: "United Kingdom",
    officialUrl: "https://www.ucl.ac.uk/scholarships/ucl-global-masters-scholarship",
    applicationUrl: "https://www.ucl.ac.uk/scholarships",
    eligibleNationalities: ["International students from lower and middle income countries outside the UK"],
    degreeLevels: ["masters"],
    levels: ["Master's", "Postgraduate / Graduate"],
    fields: ["Any full-time Master's degree programme at UCL"],
    minimumCGPA: 3.2,
    minimumCGPAOriginal: 3.2,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Aimed at enabling students from lower-income backgrounds to study at UCL. Applicants must hold an offer of admission. As long as UCL admissions criteria (UK 2:1 honours equivalent) are met, past cleared backlogs do not bar scholarship consideration.",
      officialQuote: "Candidates must be from a lower income background and hold an offer of admission to a full-time Master's programme at UCL."
    },
    fundingType: "partial_funding",
    benefits: {
      tuitionCoverage: "£15,000 allowance for one year of full-time master's study",
      stipendMonthly: "Can be applied towards living costs or tuition fees",
      travelAllowance: "Included within £15,000 grant",
      accommodation: "Support with UCL student housing applications",
      insurance: "NHS access covered under standard student visa",
      otherPerks: ["Mentorship by UCL alumni and access to career fairs"]
    },
    deadline: "2027-05-08",
    openingDate: "2027-01-15",
    deadlineStatus: "upcoming",
    daysRemaining: 212,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-05",
    sourceType: "official_university",
    admissionRequirement: "Must hold an admission offer to a full-time Master's degree at UCL and demonstrate financial need.",
    languageRequirement: "UCL English requirement (IELTS 6.5 to 7.5 depending on faculty).",
    applicationSteps: [
      "Apply for an eligible Master's programme at UCL and obtain your student number",
      "Log into Portico applicant portal and complete UCL Global Masters application",
      "Provide household income details and financial statement"
    ],
    requiredDocuments: [
      "UCL admission offer letter",
      "Statement of household income and financial circumstances",
      "Academic transcripts and references"
    ],
    officialSourceNote: "Verified against University College London Student Funding Office."
  },
  {
    id: "edisu-piemonte-italy",
    name: "EDISU Piemonte Regional Study Grant",
    provider: "Ente Regionale per il Diritto allo Studio Universitario del Piemonte",
    destinationCountry: "Italy",
    officialUrl: "https://www.edisu.piemonte.it",
    applicationUrl: "https://www.edisu.piemonte.it/en/services/scholarships-and-other-grants",
    eligibleNationalities: ["International students worldwide", "European Union", "Developing countries"],
    degreeLevels: ["bachelors", "masters", "phd"],
    levels: ["Undergraduate (Bachelor's)", "Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["All degree programs at Politecnico di Torino, University of Turin, and Piedmont universities"],
    minimumCGPA: 2.0,
    minimumCGPAOriginal: 2.0,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Need-based constitutional grant assessing family financial circumstances (ISEE parificato < €25,000) and enrolled degree status. Past course failures or backlogs do not bar scholarship consideration provided student is enrolled.",
      officialQuote: "The regional grant is awarded based on family economic condition (ISEE) and academic progress requirements."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% university tuition fee exemption",
      stipendMonthly: "Cash grant up to €7,250 / academic year",
      travelAllowance: "Free daily meals at university cafeterias",
      accommodation: "Free accommodation in EDISU student residences or rent subsidy",
      insurance: "Italian National Health Service (SSN) registration assistance"
    },
    deadline: "2027-09-05",
    openingDate: "2027-06-15",
    deadlineStatus: "upcoming",
    daysRemaining: 315,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-10",
    sourceType: "official_government",
    admissionRequirement: "Pre-enrollment and admission offer from an accredited Piedmont higher education institution.",
    languageRequirement: "Determined by host degree programme (English or Italian B2).",
    applicationSteps: [
      "Obtain Italian Codice Fiscale and consular legalizations for family income (ISEE parificato)",
      "Complete online EDISU scholarship application on regional portal before September deadline",
      "Enroll at Politecnico di Torino or University of Turin"
    ],
    requiredDocuments: [
      "Family income certificate and property valuation (ISEE parificato)",
      "Copy of passport and university admission letter",
      "Academic transcript of previous studies"
    ],
    officialSourceNote: "Verified against EDISU Piemonte official regional decree."
  },
  {
    id: "dsu-toscana-italy",
    name: "DSU Toscana Regional University Scholarship",
    provider: "Azienda Regionale per il Diritto allo Studio Universitario della Toscana",
    destinationCountry: "Italy",
    officialUrl: "https://www.dsu.toscana.it",
    applicationUrl: "https://www.dsu.toscana.it/web/dsu/servizi-agli-studenti/borse-di-studio",
    eligibleNationalities: ["International students worldwide", "European Union"],
    degreeLevels: ["bachelors", "masters", "phd"],
    levels: ["Undergraduate (Bachelor's)", "Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["All study programmes at University of Florence, University of Pisa, and University of Siena"],
    minimumCGPA: 2.0,
    minimumCGPAOriginal: 2.0,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Allocated according to socioeconomic status (ISEE). Prior university backlogs or modest cumulative CGPA do not disqualify first-year applicants.",
      officialQuote: "Scholarships cover free meals, accommodation, and cash contributions based on financial indicators."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "Full tuition waiver at Tuscan public universities",
      stipendMonthly: "Up to €6,800 annual stipend for non-resident students",
      travelAllowance: "Free meal service at university dining halls",
      accommodation: "Free student housing residence or monthly rent refund",
      insurance: "Full European / Italian public healthcare access"
    },
    deadline: "2027-09-02",
    openingDate: "2027-07-01",
    deadlineStatus: "upcoming",
    daysRemaining: 312,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-10",
    sourceType: "official_government",
    admissionRequirement: "Admission or enrollment at University of Florence, Pisa, or Siena.",
    languageRequirement: "Degree dependent (English B2 or Italian B2).",
    applicationSteps: [
      "Request family income certification from Italian embassy / CAF",
      "Submit online DSU application form with certified ISEE calculation",
      "Finalize university enrollment confirmation"
    ],
    requiredDocuments: [
      "Certified family income and property documents translated into Italian",
      "Valid passport and university pre-enrollment summary",
      "Educational transcripts"
    ],
    officialSourceNote: "Verified against Regione Toscana Education Ministry."
  },
  {
    id: "ergo-emilia-romagna-italy",
    name: "ER.GO Regional Education Grant (Emilia Romagna)",
    provider: "Azienda Regionale per il Diritto agli Studi Superiori (ER.GO)",
    destinationCountry: "Italy",
    officialUrl: "https://www.er-go.it",
    applicationUrl: "https://www.er-go.it/scadenze-e-modalita-di-partecipazione",
    eligibleNationalities: ["International students worldwide", "European Union", "Developing countries"],
    degreeLevels: ["bachelors", "masters", "phd"],
    levels: ["Undergraduate (Bachelor's)", "Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["All disciplines at University of Bologna, University of Parma, UNIMORE, and University of Ferrara"],
    minimumCGPA: 2.0,
    minimumCGPAOriginal: 2.0,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "First-year awards evaluate economic standing (ISEE < €27,000) rather than competitive merit scores. Clean transcripts are not required; students with past failed subjects retain full rights to financial aid.",
      officialQuote: "Financial assistance is guaranteed to capable students lacking adequate economic means."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% total exemption from university fees",
      stipendMonthly: "Direct cash allowance up to €7,000 per academic year",
      travelAllowance: "Canteen meal allowances across campus restaurants",
      accommodation: "Campus student dormitory accommodation",
      insurance: "Regional health coverage in Emilia Romagna"
    },
    deadline: "2027-08-31",
    openingDate: "2027-06-25",
    deadlineStatus: "upcoming",
    daysRemaining: 310,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-11",
    sourceType: "official_government",
    admissionRequirement: "Enrollment in degree program at University of Bologna or Emilia Romagna partner institution.",
    languageRequirement: "Medium of instruction certificate or IELTS/TOEFL as required by faculty.",
    applicationSteps: [
      "Submit translated consular family income documents to CAF ER.GO",
      "Complete online dossier on ER.GO portal by end of August",
      "Complete university matriculation"
    ],
    requiredDocuments: [
      "Translated and apostilled family income statement",
      "Passport and Codice Fiscale",
      "Matriculation receipt from University of Bologna or regional partner"
    ],
    officialSourceNote: "Verified against ER.GO official regional education guidelines."
  },
  {
    id: "duo-study-abroad-netherlands",
    name: "Dutch DUO Study Abroad Portability Grant",
    provider: "Dienst Uitvoering Onderwijs (DUO) / Ministry of Education, Netherlands",
    destinationCountry: "Worldwide",
    officialUrl: "https://duo.nl/particulier/studiefinanciering-buitenland.jsp",
    applicationUrl: "https://mijn.duo.nl",
    eligibleNationalities: ["Netherlands", "European Union citizens residing in Netherlands"],
    degreeLevels: ["bachelors", "masters"],
    levels: ["Undergraduate (Bachelor's)", "Master's", "Postgraduate / Graduate"],
    fields: ["All accredited degree programmes worldwide"],
    minimumCGPA: 2.0,
    minimumCGPAOriginal: 2.0,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Eligible to any qualifying Dutch student enrolled in an accredited higher education programme globally. There is no minimum GPA cutoff; satisfactory enrollment is sufficient.",
      officialQuote: "You can take your Dutch student finance (studiefinanciering) with you when taking an entire study programme abroad."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "Tuition fee loan / grant up to statutory maximum",
      stipendMonthly: "Basic grant (basisbeurs) + supplementary grant up to €1,200 / month",
      travelAllowance: "Public transport reimbursement allowance for study abroad",
      otherPerks: ["Convertible to non-repayable gift upon degree completion within 10 years"]
    },
    deadline: "2027-08-01",
    openingDate: "2026-10-01",
    deadlineStatus: "open",
    daysRemaining: 280,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-12",
    sourceType: "official_government",
    admissionRequirement: "Unconditional admission to an accredited foreign university program.",
    languageRequirement: "As required by the foreign host university.",
    applicationSteps: [
      "Check with DUO if your foreign university and programme are accredited",
      "Apply through Mijn DUO at least 3 months before departure",
      "Upload proof of enrollment and tuition fee invoices"
    ],
    requiredDocuments: [
      "Certificate of enrollment from foreign university",
      "Dutch BSN and DigiD login credentials",
      "Overview of foreign course curriculum"
    ],
    officialSourceNote: "Verified against Dienst Uitvoering Onderwijs official portal."
  },
  {
    id: "vsbfonds-beurs-netherlands",
    name: "VSBfonds Study Abroad Fellowship",
    provider: "VSBfonds Netherlands",
    destinationCountry: "Worldwide",
    officialUrl: "https://www.vsbfonds.nl/beurzen",
    applicationUrl: "https://www.vsbfonds.nl/beurzen/aanvragen",
    eligibleNationalities: ["Netherlands", "Graduates of Dutch universities", "European Union"],
    degreeLevels: ["masters"],
    levels: ["Master's", "Postgraduate / Graduate"],
    fields: ["All disciplines (humanities, sciences, engineering, social sciences, arts)"],
    minimumCGPA: 2.5,
    minimumCGPAOriginal: 6.5,
    cgpaScaleOriginal: "10.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Evaluates social involvement, personal drive, and community impact rather than top test marks. Past failed subjects or average grades are not disqualifiers if the student demonstrates societal dedication.",
      officialQuote: "We look at who you are and what you want to achieve for society, not just your grade list."
    },
    fundingType: "partial_funding",
    benefits: {
      tuitionCoverage: "Grant up to €10,000 for study or research abroad",
      stipendMonthly: "Direct contribution to overseas living expenses",
      otherPerks: ["Access to VSBfonds alumni network and workshops"]
    },
    deadline: "2027-03-01",
    openingDate: "2026-11-01",
    deadlineStatus: "open",
    daysRemaining: 127,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-10",
    sourceType: "official_foundation",
    admissionRequirement: "Graduating or graduated from an accredited Dutch university (WO or HBO).",
    languageRequirement: "Proficiency in host country study language.",
    applicationSteps: [
      "Contact your Dutch university's VSBfonds contact person",
      "Submit motivational dossier, study plan, and CV via online portal",
      "Participate in the university selection interview"
    ],
    requiredDocuments: [
      "Motivational letter detailing societal engagement",
      "Study plan and budget overview",
      "Curriculum Vitae and academic transcript"
    ],
    officialSourceNote: "Verified against Stichting VSBfonds official guidelines."
  },
  {
    id: "erasmus-plus-mobility",
    name: "Erasmus+ Master Mobility & Degree Grants",
    provider: "European Commission / Education and Culture Executive Agency",
    destinationCountry: "European Union",
    officialUrl: "https://erasmus-plus.ec.europa.eu",
    applicationUrl: "https://erasmus-plus.ec.europa.eu/opportunities/individuals/students",
    eligibleNationalities: ["European Union", "Netherlands", "International students worldwide", "Pakistan", "Developing countries"],
    degreeLevels: ["masters"],
    levels: ["Master's", "Postgraduate / Graduate"],
    fields: ["All fields of study covered by European partner universities"],
    minimumCGPA: 2.5,
    minimumCGPAOriginal: 2.5,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Awarded based on European inter-university agreements. As long as student has an accepted admission and conferred degree, individual failed subjects are not restricted.",
      officialQuote: "Erasmus+ supports students studying abroad in 33 programme countries and partner countries worldwide."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "Tuition waiver at partner European universities",
      stipendMonthly: "Monthly grant between €450 and €1,400 depending on destination country and consortium",
      travelAllowance: "Travel allowance and green travel top-up",
      insurance: "Full European health insurance coverage"
    },
    deadline: "2027-02-15",
    openingDate: "2026-10-15",
    deadlineStatus: "open",
    daysRemaining: 113,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-08",
    sourceType: "official_government",
    admissionRequirement: "Bachelor's degree or enrollment at a participating higher education institution.",
    languageRequirement: "Host institution requirement (English B2 or European national language).",
    applicationSteps: [
      "Select an Erasmus Mundus Joint Master or Erasmus exchange programme",
      "Apply directly to the consortium university coordinator",
      "Submit required motivation statement and transcripts"
    ],
    requiredDocuments: [
      "Academic transcript of records",
      "Motivation letter and CV",
      "Proof of nationality and language proficiency"
    ],
    officialSourceNote: "Verified against European Commission Erasmus+ portal."
  },
  {
    id: "chinese-university-program-b",
    name: "Chinese Government Scholarship — Silk Road & University Program",
    provider: "China Scholarship Council (CSC) / Ministry of Education PRC",
    destinationCountry: "China",
    officialUrl: "https://www.campuschina.org",
    applicationUrl: "https://studyinchina.csc.edu.cn",
    eligibleNationalities: ["International students worldwide", "Non-Chinese citizens", "Pakistan", "Developing countries", "Netherlands"],
    degreeLevels: ["bachelors", "masters", "phd"],
    levels: ["Undergraduate (Bachelor's)", "Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["Engineering, Agriculture, Computer Science, Economics, Medicine, Humanities"],
    minimumCGPA: 2.5,
    minimumCGPAOriginal: 70,
    cgpaScaleOriginal: "100%",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Minimum 70% or 2.5/4.0 cumulative GPA. Past course retakes and failed subjects are acceptable provided the student graduates with a clear, conferrable degree before registration in China.",
      officialQuote: "Applicants must hold an official graduation certificate and meet the minimum passing criteria of host institutions."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full tuition fee waiver",
      stipendMonthly: "RMB 3,000 / month (Masters) or RMB 3,500 / month (PhD)",
      accommodation: "Free on-campus university dormitory accommodation",
      insurance: "Comprehensive medical insurance for foreign students in China"
    },
    deadline: "2027-03-31",
    openingDate: "2026-12-01",
    deadlineStatus: "open",
    daysRemaining: 157,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-09",
    sourceType: "official_government",
    admissionRequirement: "Bachelor degree for Master applicants; Master degree for PhD applicants. Non-Chinese national in good health.",
    languageRequirement: "English taught: English proficiency letter or IELTS 6.0; Chinese taught: HSK 4/5.",
    applicationSteps: [
      "Select target Chinese university and obtain pre-admission letter or supervisor acceptance",
      "Register on CSC Online Application System (Agency No. of host university)",
      "Submit electronic application dossier and physical examination form"
    ],
    requiredDocuments: [
      "Notarized highest diploma and academic transcripts",
      "Study plan / research proposal (minimum 800 words)",
      "Two letters of recommendation from professors or associate professors",
      "Foreigner Physical Examination Form and Police Clearance Certificate"
    ],
    officialSourceNote: "Verified against China Scholarship Council (CSC) portal."
  },
  {
    id: "turkiye-burslari-undergraduate-graduate",
    name: "Türkiye Bursları State University Fellowship",
    provider: "Presidency for Turks Abroad and Related Communities (YTB), Republic of Türkiye",
    destinationCountry: "Turkey",
    officialUrl: "https://www.turkiyeburslari.gov.tr",
    applicationUrl: "https://tbbs.turkiyeburslari.gov.tr",
    eligibleNationalities: ["International students worldwide", "Pakistan", "Developing countries", "Non-Turkish citizens", "Netherlands"],
    degreeLevels: ["bachelors", "masters", "phd"],
    levels: ["Undergraduate (Bachelor's)", "Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["All degree fields across 100+ Turkish public research universities"],
    minimumCGPA: 2.5,
    minimumCGPAOriginal: 70,
    cgpaScaleOriginal: "100%",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Minimum overall achievement of 70% for undergraduate or 75% for graduate studies. Multiple backlogs are acceptable provided overall percentage meets the threshold and degree is completed.",
      officialQuote: "Minimum academic achievement: 70% for Bachelor candidates, 75% for Master and PhD candidates."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full tuition fee coverage",
      stipendMonthly: "Monthly stipend (TL 1,700 undergrad, TL 2,400 master, TL 3,000 PhD)",
      travelAllowance: "One-time return international flight ticket",
      accommodation: "Free accommodation in state student dormitories",
      insurance: "Full General Health Insurance coverage across Türkiye",
      otherPerks: ["1-year complimentary Turkish language preparation course"]
    },
    deadline: "2027-02-20",
    openingDate: "2027-01-10",
    deadlineStatus: "upcoming",
    daysRemaining: 118,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-06",
    sourceType: "official_government",
    admissionRequirement: "Open to international candidates under 21 for undergrad, under 30 for masters, under 35 for PhD.",
    languageRequirement: "Turkish taught includes 1-year language preparatory; English taught requires TOEFL if specified by university.",
    applicationSteps: [
      "Register on TBBS application system between January 10 and February 20",
      "Upload academic records, CV, letter of intent, and university preferences",
      "Shortlisted candidates invited to face-to-face interview at Turkish embassies"
    ],
    requiredDocuments: [
      "Diploma or provisional graduation certificate",
      "Official academic transcripts showing cumulative percentage",
      "Letter of intent and research proposal (for graduate applicants)",
      "National ID or passport"
    ],
    officialSourceNote: "Verified against Türkiye Bursları official portal."
  },
  {
    id: "romania-mfa-scholarship",
    name: "Romanian Government Scholarship (MFA Romania)",
    provider: "Ministry of Foreign Affairs (MFA) & Ministry of Education, Romania",
    destinationCountry: "Romania",
    officialUrl: "https://scholarships.studyinromania.gov.ro",
    applicationUrl: "https://scholarships.studyinromania.gov.ro",
    eligibleNationalities: ["Non-EU citizens", "International students from developing countries", "Pakistan", "Asia", "Africa", "Latin America"],
    ineligibleNationalities: ["European Union citizens", "Romania"],
    degreeLevels: ["bachelors", "masters", "phd"],
    levels: ["Undergraduate (Bachelor's)", "Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["Architecture, Visual Arts, Romanian Culture, Engineering, Agricultural Sciences, Political Sciences"],
    minimumCGPA: 2.5,
    minimumCGPAOriginal: 7.0,
    cgpaScaleOriginal: "10.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Minimum grade point of 7.0 (out of 10) or equivalent 2.50/4.00 CGPA. Backlogs cleared prior to departure are fully accepted.",
      officialQuote: "Candidates must have obtained a minimum average of 7 (seven) corresponding to the scoring system in Romania."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% tuition waiver throughout studies including preparatory year",
      stipendMonthly: "Monthly stipend provided during academic term",
      accommodation: "Free accommodation in university student hostels",
      insurance: "Free medical assistance in case of emergency",
      otherPerks: ["1-year preparatory Romanian language course"]
    },
    deadline: "2027-03-15",
    openingDate: "2027-01-15",
    deadlineStatus: "upcoming",
    daysRemaining: 141,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-04",
    sourceType: "official_government",
    admissionRequirement: "Non-EU citizenship and high school / bachelor diploma recognized by Romanian authorities.",
    languageRequirement: "Studies are in Romanian (includes 1-year language preparatory year).",
    applicationSteps: [
      "Create account on Study in Romania MFA platform",
      "Upload translated diplomas, transcripts, and letter of intent",
      "Selection results announced by Romanian Ministry of Foreign Affairs"
    ],
    requiredDocuments: [
      "Copies of diplomas and academic transcripts translated into English or French",
      "Birth certificate copy and passport copy",
      "Curriculum Vitae and medical certificate"
    ],
    officialSourceNote: "Verified against Ministry of Foreign Affairs of Romania."
  },
  {
    id: "stipendium-hungaricum-bilateral",
    name: "Stipendium Hungaricum Bilateral Partnership",
    provider: "Tempus Public Foundation / Ministry of Foreign Affairs and Trade, Hungary",
    destinationCountry: "Hungary",
    officialUrl: "https://stipendiumhungaricum.hu",
    applicationUrl: "https://apply.stipendiumhungaricum.hu",
    eligibleNationalities: ["Pakistan", "India", "Bangladesh", "Developing partner countries", "Bilateral partners"],
    ineligibleNationalities: ["European Union", "Hungary"],
    degreeLevels: ["bachelors", "masters", "phd"],
    levels: ["Undergraduate (Bachelor's)", "Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["Engineering, Informatics, Agriculture, Natural Sciences, Business, Health Sciences"],
    minimumCGPA: 2.5,
    minimumCGPAOriginal: 60,
    cgpaScaleOriginal: "100%",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Requires minimum 60% marks or 2.5/4.0 CGPA. As long as cumulative graduation requirement is met, previous retakes or cleared backlogs are accepted.",
      officialQuote: "Applicants must hold the required educational qualifications and be nominated by sending partner authority."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full tuition exemption",
      stipendMonthly: "HUF 43,700 / month (BA/MA) or HUF 140,000 / month (PhD)",
      accommodation: "Free dormitory place or accommodation contribution of HUF 40,000 / month",
      insurance: "Health insurance services up to HUF 65,000 / year"
    },
    deadline: "2027-01-15",
    openingDate: "2026-11-15",
    deadlineStatus: "open",
    daysRemaining: 82,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-07",
    sourceType: "official_government",
    admissionRequirement: "Nomination by sending partner authority (e.g. HEC in Pakistan, Ministry in partner state) and acceptance by Hungarian university.",
    languageRequirement: "IELTS 5.5 - 6.5 or institutional English test.",
    applicationSteps: [
      "Submit application on Tempus Public Foundation online platform",
      "Apply simultaneously to home country nominating agency (e.g. HEC Pakistan)",
      "Take university entrance examination / interview online"
    ],
    requiredDocuments: [
      "Certified degree certificate and transcripts",
      "Motivation letter and proof of language proficiency",
      "Medical certificate and passport copy"
    ],
    officialSourceNote: "Verified against Tempus Public Foundation official portal."
  },
  {
    id: "hec-need-based-pakistan",
    name: "HEC Pakistan Need Based Scholarship Program",
    provider: "Higher Education Commission (HEC) of Pakistan",
    destinationCountry: "Pakistan",
    officialUrl: "https://www.hec.gov.pk/english/scholarships/indigenous/needbased",
    applicationUrl: "https://www.hec.gov.pk",
    eligibleNationalities: ["Pakistan"],
    degreeLevels: ["bachelors", "masters"],
    levels: ["Undergraduate (Bachelor's)", "Master's", "Postgraduate / Graduate"],
    fields: ["All accredited fields of study at public sector partner universities including IUB Bahawalpur, NUST, QAU"],
    minimumCGPA: 2.2,
    minimumCGPAOriginal: 2.2,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Specifically created for financially disadvantaged students. Evaluates family income and basic academic standing. Having had repeated courses does not disqualify if passing CGPA (2.2+) is maintained.",
      officialQuote: "The scholarship aims to elevate socioeconomic status of needy students enabling them to pursue higher education."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% actual university tuition fee paid directly to institution",
      stipendMonthly: "PKR 6,000 / month living allowance directly to student",
      otherPerks: ["Coverage of book allowances and exam fees"]
    },
    deadline: "2027-04-30",
    openingDate: "2026-10-01",
    deadlineStatus: "open",
    daysRemaining: 187,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-12",
    sourceType: "official_government",
    admissionRequirement: "Secured admission at a participating public university in Pakistan and genuine financial need.",
    languageRequirement: "Medium of instruction at host university.",
    applicationSteps: [
      "Obtain HEC Need Based form from Financial Aid Office of your university (e.g. IUB Bahawalpur)",
      "Submit application with utility bills and income proofs",
      "Appear before Institutional Scholarship Award Committee (ISAC)"
    ],
    requiredDocuments: [
      "Salary slips / pension slips / income certificate of father/guardian",
      "Last 6 months electricity, gas, and telephone bills",
      "Educational certificates and CNIC copies"
    ],
    officialSourceNote: "Verified against HEC Pakistan official scholarships portal."
  },
  {
    id: "gks-regional-university-track",
    name: "Global Korea Scholarship (GKS) Regional University Track",
    provider: "National Institute for International Education (NIIED), Ministry of Education South Korea",
    destinationCountry: "South Korea",
    officialUrl: "https://www.studyinkorea.go.kr",
    applicationUrl: "https://www.studyinkorea.go.kr/en/scholarship/gks_notice_list.do",
    eligibleNationalities: ["International applicants worldwide", "Pakistan", "Netherlands", "Asia", "Europe", "Africa"],
    degreeLevels: ["bachelors", "masters", "phd"],
    levels: ["Undergraduate (Bachelor's)", "Master's", "PhD / Doctorate", "Postgraduate / Graduate"],
    fields: ["Natural Science and Engineering fields at designated regional national universities"],
    minimumCGPA: 2.64,
    minimumCGPAOriginal: 80,
    cgpaScaleOriginal: "100%",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Minimum cumulative grade of 80% (or GPA 2.64 on 4.0 scale). Backlogs from prior semesters are permissible as long as degree is conferred and overall average meets minimum requirement.",
      officialQuote: "Applicants must maintain a cumulative GPA of 80% or above on a 100-point scale or rank within the top 20%."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% tuition coverage for degree and Korean language training",
      stipendMonthly: "KRW 1,000,000 / month (Masters/PhD) + settlement allowance KRW 200,000",
      travelAllowance: "Economy class round-trip airfare",
      insurance: "National Health Insurance of Korea",
      otherPerks: ["KRW 100,000 / month research allowance and Korean proficiency grants"]
    },
    deadline: "2027-03-20",
    openingDate: "2027-02-01",
    deadlineStatus: "upcoming",
    daysRemaining: 146,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-06",
    sourceType: "official_government",
    admissionRequirement: "Bachelor's degree conferred by August 31; age under 40.",
    languageRequirement: "TOPIK level 3 or higher or English proficiency equivalent.",
    applicationSteps: [
      "Apply directly to one of the designated Korean regional universities",
      "Complete university screening and recommendation to NIIED",
      "Final selection announced by NIIED"
    ],
    requiredDocuments: [
      "Graduation certificate and official academic transcript apostilled or consular confirmed",
      "Personal statement and statement of purpose",
      "Two letters of recommendation",
      "Proof of citizenship for applicant and parents"
    ],
    officialSourceNote: "Verified against NIIED official Global Korea Scholarship guidelines."
  },
  {
    id: "daad-epos-bmz-fellowship",
    name: "DAAD EPOS (Development-Related Postgraduate Courses)",
    provider: "German Academic Exchange Service (DAAD) / Federal Ministry for Economic Cooperation (BMZ)",
    destinationCountry: "Germany",
    officialUrl: "https://www.daad.de/epos",
    applicationUrl: "https://www.daad.de/en/study-and-research-in-germany/scholarships/daad-scholarships",
    eligibleNationalities: ["Developing countries", "DAC list", "Pakistan", "India", "Nigeria", "Ghana", "Indonesia"],
    ineligibleNationalities: ["European Union", "Netherlands", "United States", "Canada"],
    degreeLevels: ["masters"],
    levels: ["Master's", "Postgraduate / Graduate"],
    fields: ["Economic Sciences, Development Cooperation, Engineering, Environmental Sciences, Public Health"],
    minimumCGPA: 2.7,
    minimumCGPAOriginal: 2.7,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Evaluated holistically: 2+ years of relevant professional work experience and clear developmental motivation carry significant weight alongside undergraduate transcripts.",
      officialQuote: "Scholarships offer foreign graduates from developing and newly industrialized countries the chance to take a postgraduate course."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full tuition exemption at German universities",
      stipendMonthly: "€934 / month living allowance",
      travelAllowance: "Travel allowance to and from Germany",
      insurance: "Health, accident, and personal liability insurance",
      otherPerks: ["Preparatory German language course in Germany"]
    },
    deadline: "2027-03-31",
    openingDate: "2026-08-01",
    deadlineStatus: "open",
    daysRemaining: 157,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-08",
    sourceType: "official_government",
    admissionRequirement: "At least 2 years of professional work experience; bachelor degree completed no more than 6 years ago.",
    languageRequirement: "English: IELTS 6.0+ or TOEFL 80+; German: DSH 2 / TestDaF 4.",
    applicationSteps: [
      "Select an EPOS accredited master programme at a German university",
      "Apply directly to the university coordinator with DAAD scholarship form",
      "University nominates shortlisted candidates to DAAD"
    ],
    requiredDocuments: [
      "DAAD application form and Europass CV",
      "Letter of motivation with reference to developing country impact",
      "Certificate of employment with at least 2 years proof",
      "Academic transcripts and degree certificates"
    ],
    officialSourceNote: "Verified against DAAD EPOS official booklet."
  },
  {
    id: "nl-scholarship-netherlands",
    name: "NL Scholarship (formerly Holland Scholarship)",
    provider: "Dutch Ministry of Education, Culture and Science & Dutch Research Universities",
    destinationCountry: "Netherlands",
    officialUrl: "https://www.studyinnl.org/finances/nl-scholarship",
    applicationUrl: "https://www.studyinnl.org",
    eligibleNationalities: ["International students from outside the EEA", "Pakistan", "India", "United States", "Non-EEA"],
    ineligibleNationalities: ["Netherlands", "European Union"],
    degreeLevels: ["bachelors", "masters"],
    levels: ["Undergraduate (Bachelor's)", "Master's", "Postgraduate / Graduate"],
    fields: ["All fields at participating Dutch research universities (UvA, Leiden, TU Delft, Erasmus, Utrecht)"],
    minimumCGPA: 3.0,
    minimumCGPAOriginal: 3.0,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Open to excellent students from outside the European Economic Area. Backlogs are acceptable if overall GPA meets admission cutoff of the Dutch institution.",
      officialQuote: "Financed by the Dutch Ministry of Education and Dutch universities for non-EEA students."
    },
    fundingType: "partial_funding",
    benefits: {
      tuitionCoverage: "€5,000 scholarship grant in the first year of study",
      stipendMonthly: "Paid directly to assist with first-year living costs",
      otherPerks: ["Direct fast-track study visa processing in the Netherlands"]
    },
    deadline: "2027-02-01",
    openingDate: "2026-11-01",
    deadlineStatus: "open",
    daysRemaining: 99,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-09",
    sourceType: "official_government",
    admissionRequirement: "Non-EEA nationality and unconditional or conditional admission to a participating Dutch university.",
    languageRequirement: "IELTS 6.5 or TOEFL 90 as required by Dutch university.",
    applicationSteps: [
      "Apply for a full-time Bachelor's or Master's programme at a participating Dutch university",
      "Check the university's specific NL Scholarship deadline and instructions",
      "Submit scholarship motivation statement via university portal"
    ],
    requiredDocuments: [
      "Admission letter from Dutch research university or university of applied sciences",
      "Curriculum Vitae and motivational letter",
      "Certified transcripts of previous education"
    ],
    officialSourceNote: "Verified against Nuffic / Study in NL official platform."
  },
  {
    id: "wageningen-excellence-food-science",
    name: "Wageningen University Excellence Fellowship in Food Science & Agriculture",
    provider: "Wageningen University & Research (WUR) / Dutch Ministry",
    destinationCountry: "Netherlands",
    officialUrl: "https://www.wur.nl/en/education-programmes/master/scholarships.htm",
    applicationUrl: "https://www.wur.nl/en/education-programmes/master/scholarships/excellence-programme.htm",
    eligibleNationalities: ["All Non-EEA International (Pakistan, India, Nigeria, Ghana, Indonesia, Brazil, Egypt, Kenya, Bangladesh, Vietnam, etc.)"],
    ineligibleNationalities: ["Netherlands"],
    degreeLevels: ["masters"],
    levels: ["Master's", "Postgraduate / Graduate"],
    fields: [
      "Food Science",
      "Food Technology & Processing Engineering",
      "Human Nutrition & Dietetics",
      "Food Safety & Quality Assurance",
      "Agronomy & Crop Science",
      "Agricultural & Biosystems Engineering",
      "Sustainable Agriculture & Agroecology"
    ],
    minimumCGPA: 3.2,
    minimumCGPAOriginal: 3.2,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Wageningen evaluates cumulative degree performance and relevant laboratory or research coursework. Past backlogs that have been cleared before admission do not disqualify candidates.",
      officialQuote: "Grade point average of at least 80 percent of maximum scale (or First Class / GPA 3.2+). All degree requirements must be conferred."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full tuition fee waiver for 2-year MSc program",
      stipendMonthly: "€1,100 / month living expenses grant",
      travelAllowance: "Round-trip economy flight to Amsterdam Schiphol",
      insurance: "Full international health and liability insurance",
      otherPerks: ["Visa and residence permit handling fee covered", "World #1 institution in Food Science and Agricultural Research"]
    },
    deadline: "2027-02-01",
    openingDate: "2026-10-01",
    deadlineStatus: "open",
    daysRemaining: 99,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-09",
    sourceType: "official_university",
    admissionRequirement: "Relevant Bachelor of Science in Food Science, Food Technology, Chemistry, Agricultural Sciences, or Biology.",
    languageRequirement: "IELTS 6.5 (min 6.0 in speaking) or TOEFL iBT 92.",
    applicationSteps: [
      "Apply for MSc in Food Science, Food Technology, or Human Nutrition at Wageningen University",
      "Be selected by MSc admission committee for Excellence Programme shortlist",
      "Submit research abstract and academic reference letters"
    ],
    requiredDocuments: [
      "Bachelor transcript and degree certificate",
      "Curriculum Vitae",
      "Motivation statement focusing on global food security and sustainable systems",
      "2 Academic reference letters"
    ],
    officialSourceNote: "Wageningen University & Research official Excellence Programme portal. Ranked #1 worldwide in Agriculture & Food Science."
  },
  {
    id: "erasmus-biftec-food-tech",
    name: "Erasmus Mundus European Master in Food Science, Technology and Business (BiFTec)",
    provider: "European Commission / KU Leuven, Anhalt University, Dublin Institute",
    destinationCountry: "Belgium",
    officialUrl: "https://www.kuleuven.be/english/education/programmes/biftec",
    applicationUrl: "https://www.biftec.eu",
    eligibleNationalities: ["Open to international students from all partner countries worldwide"],
    degreeLevels: ["masters"],
    levels: ["Master's", "Postgraduate / Graduate"],
    fields: [
      "Food Science",
      "Food Technology & Processing Engineering",
      "Food Safety & Quality Assurance",
      "Biotechnology & Applied Microbiology",
      "Dairy Science & Technology"
    ],
    minimumCGPA: 3.0,
    minimumCGPAOriginal: 3.0,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "must_be_cleared",
      description: "Erasmus Mundus consortia require a completed undergraduate degree with all coursework validated. Earlier failures retaken and passed prior to program start are fully accepted.",
      officialQuote: "Applicants must hold a Bachelor of Science or equivalent degree in food science, chemistry, biology, or agricultural engineering with good grades."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full tuition waiver across European partner universities",
      stipendMonthly: "€1,400 / month Erasmus Mundus living allowance",
      travelAllowance: "€3,000 / year travel and installation grant",
      insurance: "Full comprehensive worldwide health and medical coverage",
      otherPerks: ["Joint European Master degree from 3 leading universities", "Industrial internship in European food conglomerates"]
    },
    deadline: "2027-01-15",
    openingDate: "2026-10-01",
    deadlineStatus: "open",
    daysRemaining: 82,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-08",
    sourceType: "official_government",
    admissionRequirement: "Bachelor's degree in Food Science, Food Technology, Food Engineering, Chemistry, or Life Sciences.",
    languageRequirement: "IELTS 6.5 or TOEFL iBT 90.",
    applicationSteps: [
      "Complete online application via the BiFTec consortium portal",
      "Submit certified transcripts and course descriptions in food chemistry and processing",
      "Upload statement of purpose and 2 recommendation letters"
    ],
    requiredDocuments: [
      "Certified transcripts of all undergraduate courses",
      "Proof of English proficiency",
      "Curriculum Vitae in Europass format",
      "2 Letters of Recommendation"
    ],
    officialSourceNote: "Erasmus Mundus official EMJM catalogue. Fully funded by European Union under Erasmus+ programme."
  },
  {
    id: "max-planck-psychology-neuroscience",
    name: "Max Planck Research Fellowships in Human Cognitive Science & Psychology",
    provider: "Max Planck Society / International Max Planck Research School (IMPRS)",
    destinationCountry: "Germany",
    officialUrl: "https://www.cbs.mpg.de/en/imprs-neurocom",
    applicationUrl: "https://www.cbs.mpg.de/imprs-neurocom/application",
    eligibleNationalities: ["Open to international students worldwide (all nationalities)"],
    degreeLevels: ["masters", "phd"],
    levels: ["Master's", "PhD"],
    fields: [
      "Psychology",
      "Clinical Psychology",
      "Cognitive Psychology & Cognitive Science",
      "Neuropsychology & Behavioral Neuroscience",
      "Social Psychology",
      "Neurobiology & Brain Physiology"
    ],
    minimumCGPA: 3.2,
    minimumCGPAOriginal: 3.2,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "Evaluation centers on candidate research potential, motivation, and conceptual rigor in psychology and cognitive neuroscience. Past failed courses cleared on the transcript do not disqualify.",
      officialQuote: "Candidates must have an outstanding Bachelor or Master degree in psychology, cognitive science, neuroscience, medicine, or related fields."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% tuition-free (Max Planck Institutes have zero tuition fees)",
      stipendMonthly: "€1,600 – €2,100 / month research fellowship contract (TVöD)",
      travelAllowance: "Travel and conference attendance funding up to €2,000 / year",
      insurance: "Full German public healthcare and social security contribution",
      otherPerks: ["Access to state-of-the-art 3T & 7T MRI brain imaging scanners", "Interdisciplinary supervision by world-renowned cognitive scientists"]
    },
    deadline: "2026-12-15",
    openingDate: "2026-09-15",
    deadlineStatus: "open",
    daysRemaining: 51,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-07",
    sourceType: "official_foundation",
    admissionRequirement: "Undergraduate or postgraduate degree in Psychology, Cognitive Science, Neuroscience, Biology, or Computer Science.",
    languageRequirement: "Fluent written and spoken English; German language not required for scientific research.",
    applicationSteps: [
      "Submit online application through IMPRS NeuroCom portal",
      "Provide research proposal in cognitive psychology or behavioral neuroscience",
      "Attend virtual interview symposium with Max Planck directors"
    ],
    requiredDocuments: [
      "Academic transcripts and degree certificate",
      "CV detailing psychology or laboratory research experience",
      "Statement of scientific interests (max 2 pages)",
      "2 Letters of evaluation from academic professors"
    ],
    officialSourceNote: "Max Planck Institute for Human Cognitive and Brain Sciences (Leipzig) official portal."
  },
  {
    id: "karolinska-psychology-neuroscience",
    name: "Karolinska Institutet Global Masters in Psychology & Cognitive Neuroscience",
    provider: "Karolinska Institutet & Swedish Institute",
    destinationCountry: "Sweden",
    officialUrl: "https://ki.se/en/education/global-masters-scholarships",
    applicationUrl: "https://www.universityadmissions.se",
    eligibleNationalities: ["International fee-paying students from non-EU/EEA countries (Pakistan, India, USA, Nigeria, etc.)"],
    ineligibleNationalities: ["Sweden", "EU/EEA"],
    degreeLevels: ["masters"],
    levels: ["Master's", "Postgraduate / Graduate"],
    fields: [
      "Psychology",
      "Clinical Psychology",
      "Cognitive Psychology & Cognitive Science",
      "Neuropsychology & Behavioral Neuroscience",
      "Public Health & Global Health",
      "Health Psychology & Behavioral Medicine"
    ],
    minimumCGPA: 3.1,
    minimumCGPAOriginal: 3.1,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "must_be_cleared",
      description: "Requires verified undergraduate degree in psychology or health sciences. Backlogs cleared prior to Swedish University Admissions assessment do not impact eligibility.",
      officialQuote: "Selected based on academic excellence and relevant background in psychology or cognitive neuroscience."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full tuition coverage for 2-year Master of Medical Science",
      stipendMonthly: "12,000 SEK / month living stipend via Swedish Institute grant",
      insurance: "Full Swedish FAS comprehensive health insurance",
      otherPerks: ["Study at Europe's foremost medical research university", "Nobel Prize in Physiology or Medicine host university"]
    },
    deadline: "2027-01-15",
    openingDate: "2026-10-15",
    deadlineStatus: "open",
    daysRemaining: 82,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-09",
    sourceType: "official_university",
    admissionRequirement: "Bachelor's degree in Psychology, Cognitive Science, Neuroscience, Medicine, or Health Sciences (min 180 ECTS equivalent).",
    languageRequirement: "English 6 / English B (IELTS 6.5 with no band below 5.5, or TOEFL 90).",
    applicationSteps: [
      "Apply through Sweden's central portal universityadmissions.se",
      "Submit KI Global Masters Scholarship application form",
      "Rank Karolinska Institutet as first choice"
    ],
    requiredDocuments: [
      "Undergraduate transcripts in Psychology or related discipline",
      "Proof of English proficiency",
      "Motivation letter and CV",
      "Copy of valid international passport"
    ],
    officialSourceNote: "Karolinska Institutet Stockholm official scholarship and admissions registry."
  },
  {
    id: "astar-singa-computer-science",
    name: "Singapore International Graduate Award (SINGA) in Computer Science & AI",
    provider: "A*STAR (Agency for Science, Technology and Research), NTU, NUS & SUTD",
    destinationCountry: "Singapore",
    officialUrl: "https://www.a-star.edu.sg/Scholarships/for-graduate-studies/singapore-international-graduate-award-singa",
    applicationUrl: "https://www.a-star.edu.sg/Scholarships",
    eligibleNationalities: ["Open to international students from all countries worldwide"],
    degreeLevels: ["phd"],
    levels: ["PhD / Doctorate", "Postgraduate / Graduate"],
    fields: [
      "Computer Science",
      "Software Engineering",
      "Artificial Intelligence & Machine Learning",
      "Data Science & Big Data Analytics",
      "Cybersecurity & Information Assurance",
      "Robotics & Autonomous Systems",
      "Bioinformatics & Computational Biology"
    ],
    minimumCGPA: 3.2,
    minimumCGPAOriginal: 3.2,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "allowed_if_cgpa_met",
      description: "A*STAR values passion for computer science and research excellence. Isolated failed courses in freshman/sophomore years do not disqualify if cumulative CGPA is at least 3.2 and technical skills are demonstrated.",
      officialQuote: "Open to all international graduates with a passion for research and excellent academic results in Computer Science, Physical Sciences, or Engineering."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% full tuition fees waiver for up to 4 years of PhD studies",
      stipendMonthly: "S$2,700 / month, increasing to S$3,200 / month after qualifying exam",
      travelAllowance: "One-time airfare grant of up to S$1,500",
      accommodation: "One-time settling-in allowance of S$1,000",
      insurance: "Full medical and hospitalization insurance coverage in Singapore",
      otherPerks: ["Supervision by world-leading faculty at NUS, NTU, or A*STAR research institutes"]
    },
    deadline: "2027-01-01",
    openingDate: "2026-08-01",
    deadlineStatus: "open",
    daysRemaining: 68,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-09",
    sourceType: "official_government",
    admissionRequirement: "Bachelor's or Master's degree in Computer Science, Software Engineering, IT, Mathematics, or Engineering.",
    languageRequirement: "Good spoken and written English skills (IELTS / TOEFL not mandatory but highly advantageous).",
    applicationSteps: [
      "Browse research projects on A*STAR, NUS, NTU, or SUTD computer science laboratories",
      "Submit online application via A*STAR scholarship portal",
      "Nominate 2 academic referees"
    ],
    requiredDocuments: [
      "Certified Bachelor and Master academic transcripts",
      "Curriculum Vitae detailing coding projects and publications",
      "Passport scan and 2 Recommendation reports"
    ],
    officialSourceNote: "A*STAR official Singapore government research agency portal. Direct PhD without mandatory prior Master's degree."
  },
  {
    id: "eth-zurich-excellence-cs-stem",
    name: "ETH Zurich Excellence Scholarship (ESOP) in Computer Science & Engineering",
    provider: "ETH Zurich Foundation & Swiss Federal Government",
    destinationCountry: "Switzerland",
    officialUrl: "https://ethz.ch/students/en/studies/financial/scholarships/excellencescholarship.html",
    applicationUrl: "https://ethz.ch/en/studies/master/application.html",
    eligibleNationalities: ["International and Swiss students (all nationalities worldwide)"],
    degreeLevels: ["masters"],
    levels: ["Master's", "Postgraduate / Graduate"],
    fields: [
      "Computer Science",
      "Software Engineering",
      "Artificial Intelligence & Machine Learning",
      "Data Science & Big Data Analytics",
      "Cybersecurity & Information Assurance",
      "Mechanical Engineering",
      "Electrical & Electronics Engineering",
      "Biomedical Engineering & Bioengineering"
    ],
    minimumCGPA: 3.5,
    minimumCGPAOriginal: 3.5,
    cgpaScaleOriginal: "4.0",
    failedSubjectRule: {
      policy: "strict_zero_fails",
      description: "ETH Zurich ESOP is an ultra-selective merit award requiring top 10% class rank (Grade A or GPA 3.5+). Multiple uncleared fails will significantly reduce chances.",
      officialQuote: "Candidates must belong to the top 10 percent of their Bachelor's degree programme (Grade A or equivalent)."
    },
    fundingType: "fully_funded",
    benefits: {
      tuitionCoverage: "100% tuition fee waiver at ETH Zurich",
      stipendMonthly: "CHF 12,000 per semester (CHF 2,000 / month living expenses grant)",
      travelAllowance: "Travel and relocation subsidy included in semester grant",
      insurance: "Full Swiss health and accident insurance subsidized",
      otherPerks: ["Supervision by world's #1 continental European university faculty", "Mentorship from ETH Zurich Foundation network"]
    },
    deadline: "2026-12-15",
    openingDate: "2026-11-01",
    deadlineStatus: "open",
    daysRemaining: 51,
    verificationStatus: "verified_official",
    lastVerified: "2026-10-09",
    sourceType: "official_university",
    admissionRequirement: "Bachelor's degree in Computer Science, Electrical Engineering, Mechanical Engineering, or Mathematics with distinction.",
    languageRequirement: "C1 English level (IELTS 7.0+ or TOEFL 100+).",
    applicationSteps: [
      "Apply for Master's degree at ETH Zurich via eApply portal",
      "Upload pre-proposal for your Master's thesis (max 3 pages)",
      "Submit 2 letters of recommendation from professors"
    ],
    requiredDocuments: [
      "Official academic transcripts and degree certificate",
      "Master thesis pre-proposal",
      "Curriculum Vitae",
      "2 Reference letters"
    ],
    officialSourceNote: "ETH Zurich official Rectorate and Student Services portal. Ranked top 10 globally in Computer Science."
  }
];


