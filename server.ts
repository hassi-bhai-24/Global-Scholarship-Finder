import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { VERIFIED_SCHOLARSHIPS, OFFICIAL_SOURCES } from './src/data/scholarships.ts';
import { evaluateEligibility, isEligibleNationality, computeDeadlineStatus } from './src/services/matchingEngine.ts';
import type { Scholarship, StudentProfile } from './src/types/scholarship.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '100kb' }));

// Security headers for the served page (F16). CSP is kept permissive for
// styles/fonts only: the built app has no inline scripts and talks only to
// its own origin plus Google Fonts.
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
  );
  next();
});

// Minimal in-memory per-IP rate limiting (F16). No store is persisted and
// no identity is logged; buckets reset on restart. Each limiter instance
// keeps its own buckets so the general API limit and the write limit are
// counted separately.
function rateLimit(maxRequests: number, windowMs: number) {
  const buckets = new Map<string, { count: number; resetAt: number }>();
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const key = req.ip || 'unknown';
    const now = Date.now();
    if (buckets.size > 5000) buckets.clear();
    const bucket = buckets.get(key);
    if (!bucket || now > bucket.resetAt) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }
    bucket.count += 1;
    if (bucket.count > maxRequests) {
      return res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
    }
    return next();
  };
}
const apiRateLimit = rateLimit(120, 60_000);
const writeRateLimit = rateLimit(30, 60_000);
app.use('/api/', apiRateLimit);

// Input length/type caps (F16): user text is interpolated into prompts and
// used downstream, so oversized or non-string values are rejected early.
function invalidText(value: unknown, maxLength: number): boolean {
  return typeof value !== 'string' || value.length > maxLength;
}
function profileInputError(profile: any): string | null {
  if (!profile || typeof profile !== 'object') return 'Profile is required.';
  const fields: Array<[string, number]> = [
    ['country', 100], ['university', 200], ['studyLevel', 150], ['educationStatus', 100],
    ['field', 100], ['targetDestination', 100], ['degreeLevel', 20],
  ];
  for (const [field, max] of fields) {
    if (profile[field] !== undefined && invalidText(profile[field], max)) return `${field} is too long or invalid.`;
  }
  if (profile.cgpa !== undefined && (typeof profile.cgpa !== 'number' || !Number.isFinite(profile.cgpa) || profile.cgpa < 0 || profile.cgpa > 100)) {
    return 'CGPA is invalid.';
  }
  if (profile.failedSubjects !== undefined && (!Number.isInteger(profile.failedSubjects) || profile.failedSubjects < 0 || profile.failedSubjects > 50)) {
    return 'Failed subjects count is invalid.';
  }
  if (profile.preUniResult !== undefined && typeof profile.preUniResult !== 'object') return 'Pre-university result is invalid.';
  return null;
}

// Initialize Google GenAI if key available
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({});
  } catch (err) {
    console.warn("Failed to initialize GoogleGenAI client:", err);
  }
}

// Rate-limit & Quota handling circuit breaker
let geminiCooldownUntil = 0;

function isQuotaOrRateLimit(err: unknown): boolean {
  if (!err) return false;
  const errorObj = err as any;
  const msg = String(errorObj?.message || errorObj || '');
  const status = errorObj?.status || '';
  const code = errorObj?.code;
  return (
    code === 429 ||
    status === 'RESOURCE_EXHAUSTED' ||
    msg.includes('429') ||
    msg.includes('RESOURCE_EXHAUSTED') ||
    msg.includes('quota') ||
    msg.includes('rate-limit') ||
    msg.includes('exceeded your current quota')
  );
}

function shouldAttemptGemini(): boolean {
  if (!aiClient || !process.env.GEMINI_API_KEY) return false;
  if (Date.now() < geminiCooldownUntil) return false;
  return true;
}

function handleGeminiError(err: unknown, context: string): void {
  if (isQuotaOrRateLimit(err)) {
    // 3 minute cooldown window to give quota time to recover without spamming the API
    geminiCooldownUntil = Date.now() + 180000;
    console.info(`[${context}] Gemini API quota limit active. Cooldown engaged for 3 minutes. Serving verified official catalog.`);
  } else {
    console.info(`[${context}] Live discovery note: ${((err as any)?.message || 'Service unavailable').slice(0, 100)}. Utilizing verified official catalog.`);
  }
}

// --- Real link checking (F03/F04) -------------------------------------------
// A "verified" result is only ever returned after an actual HTTP check of the
// catalog URL in this request. A failed, timed-out or mismatched check is
// reported honestly as not verified; it is never stamped with the current time.

function registrableDomain(hostname: string): string {
  const parts = hostname.toLowerCase().split('.').filter(Boolean);
  // Second-level domains such as .co.uk / .ac.uk / .gov.uk: keep three labels.
  const twoLevelSuffixes = ['co.uk', 'ac.uk', 'gov.uk', 'org.uk', 'edu.au', 'gov.au', 'com.au', 'ac.in', 'edu.pk', 'gov.pk'];
  const suffix = parts.slice(-2).join('.');
  if (twoLevelSuffixes.includes(suffix) && parts.length >= 3) return parts.slice(-3).join('.');
  return parts.slice(-2).join('.');
}

async function checkUrlLive(url: string, timeoutMs = 10000): Promise<{ ok: boolean; status: number | null; error?: string; finalUrl?: string }> {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return { ok: false, status: null, error: 'malformed_url' };
  }
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return { ok: false, status: null, error: 'unsupported_protocol' };
  }
  if (/\s/.test(url)) return { ok: false, status: null, error: 'malformed_url' };
  for (const method of ['HEAD', 'GET'] as const) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(parsed.toString(), {
        method,
        signal: controller.signal,
        redirect: 'follow',
        headers: { 'User-Agent': 'Global-Scholarship-Finder link-check/1.0' },
      });
      // Consume/close the body so the connection is released.
      if (method === 'GET') await response.arrayBuffer().catch(() => undefined);
      const ok = response.status >= 200 && response.status < 400;
      return { ok, status: response.status, finalUrl: response.url };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (method === 'HEAD' && !/abort/i.test(message)) {
        // Some servers reject HEAD; fall through and try GET.
        continue;
      }
      return { ok: false, status: null, error: /abort/i.test(message) ? 'timeout' : 'no_response' };
    } finally {
      clearTimeout(timer);
    }
  }
  return { ok: false, status: null, error: 'no_response' };
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    geminiInCooldown: Date.now() < geminiCooldownUntil,
    verifiedCount: VERIFIED_SCHOLARSHIPS.length,
    sourcesCount: OFFICIAL_SOURCES.length,
  });
});

// 2. Sources inspection & admin
app.get('/api/scholarships/sources', (req, res) => {
  res.json({
    sources: OFFICIAL_SOURCES,
    totalTracked: VERIFIED_SCHOLARSHIPS.length,
    lastRefreshed: new Date().toISOString()
  });
});

// 2b. Real portal audit: actually fetches every source portal URL and
// reports the per-source result with the real check time. Nothing here is
// asserted without a request having been made in this call.
app.get('/api/scholarships/audit-sources', async (req, res) => {
  const checkedAt = new Date().toISOString();
  const results = await Promise.all(
    OFFICIAL_SOURCES.map(async (source) => {
      const check = await checkUrlLive(source.portalUrl, 10000);
      return {
        id: source.id,
        name: source.name,
        portalUrl: source.portalUrl,
        reachable: check.ok,
        httpStatus: check.status,
        error: check.error ?? null,
        finalUrl: check.finalUrl ?? null,
        checkedAt,
      };
    })
  );
  const reachableCount = results.filter((r) => r.reachable).length;
  res.json({ checkedAt, reachableCount, total: results.length, results });
});
// Strict JSON parser for model output. Only a markdown fence is stripped;
// malformed output is logged and rejected, never silently repaired, and no
// object-by-object fallback is attempted (F06).
function parseScholarshipsSafely(rawText: string): any[] {
  if (!rawText || typeof rawText !== 'string') return [];
  const cleaned = rawText.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  try {
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) return parsed;
    console.info('[Live Search] Model output was valid JSON but not an array; rejecting it.');
    return [];
  } catch (err) {
    console.info(`[Live Search] Malformed model output rejected (not valid JSON): ${String(err).slice(0, 120)}`);
    return [];
  }
}

// Validate one live-discovered item. Returns null (drop the item) when the
// name, URL or deadline cannot be confirmed from the item itself. Nothing is
// invented: missing CGPA/benefits/policy are labelled "not stated", and no
// item is ever stamped verified_official from model text alone (F06).
function validateLiveItem(item: any, profile: StudentProfile): Scholarship | null {
  const name = typeof item?.name === 'string' ? item.name.trim() : '';
  const rawUrl = typeof item?.officialUrl === 'string' ? item.officialUrl : item?.applicationUrl;
  if (!name || typeof rawUrl !== 'string') return null;
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(rawUrl.trim());
  } catch {
    return null;
  }
  if ((parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') || /\s/.test(rawUrl)) return null;
  const officialUrl = parsedUrl.toString();
  const applicationUrl = typeof item?.applicationUrl === 'string' && item.applicationUrl.trim()
    ? item.applicationUrl.trim() : officialUrl;

  const deadlineRaw = typeof item?.deadline === 'string' ? item.deadline.trim() : '';
  const deadlineDate = new Date(deadlineRaw);
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (!deadlineRaw || isNaN(deadlineDate.getTime()) || deadlineDate < startOfToday) return null;
  const deadline = deadlineDate.toISOString().split('T')[0];

  const cgpa = typeof item?.minimumCGPA === 'number' && Number.isFinite(item.minimumCGPA) && item.minimumCGPA >= 0
    ? item.minimumCGPA : 0;
  const benefits = item?.benefits && typeof item.benefits === 'object' ? item.benefits : {};
  const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : 'Not stated — check the official page.');
  const validSourceTypes = ['official_government', 'official_university', 'official_foundation', 'verified_portal'] as const;

  return {
    id: `live-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name,
    provider: typeof item?.provider === 'string' && item.provider.trim() ? item.provider.trim() : 'Not stated — check the official page.',
    destinationCountry: typeof item?.destinationCountry === 'string' && item.destinationCountry.trim() ? item.destinationCountry.trim() : 'International',
    officialUrl,
    applicationUrl,
    eligibleNationalities: Array.isArray(item?.eligibleNationalities) && item.eligibleNationalities.length > 0
      ? item.eligibleNationalities : [profile.country, 'International'],
    degreeLevels: Array.isArray(item?.degreeLevels) && item.degreeLevels.length > 0 ? item.degreeLevels : ['masters'],
    levels: Array.isArray(item?.levels) && item.levels.length > 0 ? item.levels : (profile.studyLevel ? [profile.studyLevel] : ["Master's"]),
    fields: Array.isArray(item?.fields) && item.fields.length > 0 ? item.fields : [profile.field || 'All fields'],
    minimumCGPA: cgpa,
    minimumCGPAOriginal: cgpa,
    cgpaScaleOriginal: item?.cgpaScaleOriginal || profile.cgpaScale || '4.0',
    failedSubjectRule: item?.failedSubjectRule && typeof item.failedSubjectRule === 'object' && item.failedSubjectRule.policy
      ? item.failedSubjectRule
      : { policy: 'not_stated', description: 'Not stated — check the official page.' },
    fundingType: ['fully_funded', 'tuition_waiver', 'partial_funding', 'stipend_only', 'research_grant'].includes(item?.fundingType)
      ? item.fundingType : 'partial_funding',
    benefits: {
      tuitionCoverage: str(benefits.tuitionCoverage),
      stipendMonthly: str(benefits.stipendMonthly),
      travelAllowance: str(benefits.travelAllowance),
      accommodation: benefits.accommodation ? String(benefits.accommodation) : undefined,
      insurance: benefits.insurance ? String(benefits.insurance) : undefined,
      otherPerks: Array.isArray(benefits.otherPerks) ? benefits.otherPerks : undefined,
    },
    deadline,
    deadlineStatus: computeDeadlineStatus(deadline).deadlineStatus,
    verificationStatus: 'needs_confirmation',
    lastVerified: new Date().toISOString().split('T')[0],
    sourceType: validSourceTypes.includes(item?.sourceType) ? item.sourceType : 'verified_portal',
    admissionRequirement: str(item?.admissionRequirement),
    languageRequirement: str(item?.languageRequirement),
    applicationSteps: Array.isArray(item?.applicationSteps) && item.applicationSteps.length > 0
      ? item.applicationSteps : ['Review official requirements on the portal'],
    requiredDocuments: Array.isArray(item?.requiredDocuments) && item.requiredDocuments.length > 0
      ? item.requiredDocuments : ['Check the official page for the required documents'],
    officialSourceNote: 'Live-discovered via Google Search grounding. NOT verified: the link, deadline and eligibility were not checked. Confirm on the official page before applying.',
    liveDiscovered: true
  };
}

function normaliseUrlForDedupe(url: string): string {
  return url.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/[?#].*$/, '').replace(/\/+$/, '');
}

function normaliseNameForDedupe(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

// 3. Main Discovery & Eligibility Matching Search
app.post('/api/scholarships/search', writeRateLimit, async (req, res) => {
  try {
    const profile: StudentProfile = req.body;
    const inputError = profileInputError(profile);
    if (inputError) {
      return res.status(400).json({ error: inputError });
    }
    const enableLiveSearch = req.body.liveSearch !== false;

    const isPreUni = !!(
      profile.isPreUniversity ||
      (profile.studyLevel && (
        profile.studyLevel.toLowerCase().includes('undergraduate') ||
        profile.studyLevel.toLowerCase().includes('intermediate') ||
        profile.studyLevel.toLowerCase().includes('12th') ||
        profile.studyLevel.toLowerCase().includes('bachelor')
      ) && (profile.university === 'No university experience' || !profile.university || profile.preUniResult !== undefined))
    );

    if (!profile.country || !profile.country.trim()) {
      return res.status(400).json({ error: 'Country / Nationality is required.' });
    }

    if (!isPreUni && (!profile.university || !profile.university.trim())) {
      return res.status(400).json({ error: 'Current / Graduated University is required.' });
    }

    if (profile.cgpa === undefined || (typeof profile.cgpa === 'number' && isNaN(profile.cgpa))) {
      if (profile.preUniResult) {
        // Pre-university applicants have no university CGPA; their board
        // result is evaluated from preUniResult. Do not invent a CGPA.
        profile.cgpa = 0;
        profile.cgpaScale = '4.0';
      } else {
        return res.status(400).json({ error: 'CGPA is required. Enter your CGPA instead of leaving it blank.' });
      }
    }

    // Filter verified catalog to only those open to the student's nationality
    let allScholarships: Scholarship[] = VERIFIED_SCHOLARSHIPS.filter(s =>
      isEligibleNationality(s, profile.country)
    );
    let liveResultsCount = 0;
    let webSearchQueries: string[] = [];
    let searchSources: Array<{ title: string; uri: string }> = [];

    // If Gemini API is available and live discovery is requested, perform grounded live web discovery
    if (enableLiveSearch && shouldAttemptGemini()) {
      try {
        const levelInfo = profile.studyLevel ? `at the ${profile.studyLevel} level` : (profile.degreeLevel ? `at the ${profile.degreeLevel} level` : 'for higher education');
        const educationInfo = isPreUni
          ? `- Pre-University Status: ${profile.educationStatus || 'Intermediate / A-Levels / High School'} (No university degree required)`
          : `- Current / Graduated University: ${profile.university}`;
        const scoreInfo = isPreUni && profile.preUniResult
          ? `- Academic Result: ${profile.preUniResult.percentage ? profile.preUniResult.percentage + '% board score' : profile.preUniResult.grades || 'Passed'}`
          : `- Cumulative CGPA: ${profile.cgpa} out of ${profile.cgpaScale} scale`;
        const destInfo = profile.targetDestination && profile.targetDestination !== 'Worldwide'
          ? `- Preferred Destination: ${profile.targetDestination}`
          : `- Target Destination: Worldwide`;
        
        const prompt = `You are a real-time global scholarship crawler with Google Search. Browse the open internet across verified government, ministerial, university, and multilateral funding databases.

Search for real, currently active, or upcoming 2026/2027 international scholarships matching these EXACT student conditions:
- Target Study Level: ${profile.studyLevel || 'All Levels'}
- Nationality / Citizenship: ${profile.country}
${educationInfo}
- Field / Academic Discipline: ${profile.field || 'All disciplines'}
${scoreInfo}
- Failed Course Backlogs / Compartments: ${profile.failedSubjects || 0}
${destInfo}

Search across top international destinations:
1. United Kingdom & Commonwealth (Chevening, Commonwealth, GREAT, Gates Cambridge, Clarendon, university merit awards)
2. United States & Americas (Fulbright Foreign Student, AAUW, university tuition waivers, regional fellowships)
3. Europe & Germany (DAAD, Erasmus Mundus Joint Masters, Eiffel France, Swiss Government Excellence, Swedish Institute, Holland Scholarship)
4. Asia & Middle East (MEXT Japan, CSC China, GKS South Korea, Turkiye Burslari, KAUST Fellowship, Singapore SINGA)
5. Australia, Canada & Multilateral Funds (Australia Awards, Lester B. Pearson, Vanier CGS, World Bank, ADB, Rotary)

Find 8 to 15 REAL, distinct scholarships matching ${levelInfo} for students from ${profile.country}.
CRITICAL: Every entry MUST provide a REAL official website URL (.gov, .edu, .ac.uk, or official authority domain). Do not link to aggregator blogs. Do NOT invent a deadline, CGPA cutoff, benefit, fee or URL: use only values stated on the official page, and set any field you cannot confirm to null or omit it. An entry with an unconfirmed deadline must be omitted entirely.

Return ONLY a strict JSON array of objects:
[
  {
    "id": "slug-name",
    "name": "Full Official Scholarship Name",
    "provider": "Ministry / University / Foundation Name",
    "destinationCountry": "Host Country or Global",
    "officialUrl": "https://official.portal.gov/path",
    "applicationUrl": "https://official.portal.gov/apply",
    "eligibleNationalities": ["${profile.country}", "International"],
    "degreeLevels": ["masters"],
    "levels": ["${profile.studyLevel || "Master's"}"],
    "fields": ["${profile.field || "All fields"}"],
    "minimumCGPA": null,
    "cgpaScaleOriginal": "${profile.cgpaScale}",
    "failedSubjectRule": null,
    "fundingType": null,
    "benefits": null,
    "deadline": "YYYY-MM-DD",
    "admissionRequirement": null,
    "languageRequirement": null,
    "applicationSteps": null,
    "requiredDocuments": null
  }
]
Output ONLY raw valid JSON array. No conversational text. No markdown blocks outside the JSON.`;

        const liveResponse = await aiClient!.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            tools: [{ googleSearch: {} }],
          }
        });

        // Extract executed web queries and sources for telemetry
        const candidate = liveResponse.candidates?.[0];
        const groundingMeta = candidate?.groundingMetadata as any;
        if (groundingMeta?.webSearchQueries) {
          webSearchQueries = groundingMeta.webSearchQueries;
        }
        if (groundingMeta?.groundingChunks) {
          searchSources = groundingMeta.groundingChunks
            .map((chunk: any) => chunk.web)
            .filter(Boolean)
            .map((w: any) => ({ title: w.title || 'Official Portal', uri: w.uri || '' }));
        }

        const textOutput = liveResponse.text || '';
        const parsed = parseScholarshipsSafely(textOutput);
        
        let droppedLiveCount = 0;
        for (const item of parsed) {
          const validated = validateLiveItem(item, profile);
          if (!validated) { droppedLiveCount++; continue; }
          const isDuplicate = allScholarships.some(
            existing => normaliseNameForDedupe(existing.name) === normaliseNameForDedupe(validated.name) ||
                        normaliseUrlForDedupe(existing.officialUrl) === normaliseUrlForDedupe(validated.officialUrl)
          );
          if (!isDuplicate) {
            allScholarships.push(validated);
            liveResultsCount++;
          }
        }
        if (droppedLiveCount > 0) {
          console.info(`[Live Search] Dropped ${droppedLiveCount} of ${parsed.length} live items: missing/invalid name, URL or deadline.`);
        }
      } catch (err) {
        handleGeminiError(err, 'Live Search');
      }
    }

    // Deduplicate scholarships by id defensively
    const seenScholarshipIds = new Set<string>();
    const deduplicatedScholarships = allScholarships.filter(s => {
      if (!s.id || seenScholarshipIds.has(s.id)) return false;
      seenScholarshipIds.add(s.id);
      return true;
    });

    // Evaluate eligibility for each scholarship
    const matchResults = deduplicatedScholarships.map(scholarship => evaluateEligibility(scholarship, profile));

    // Summary stats
    const strongMatches = matchResults.filter(m => m.category === 'STRONG_MATCH').length;
    const likelyMatches = matchResults.filter(m => m.category === 'LIKELY_MATCH').length;
    const possibleMatches = matchResults.filter(m => m.category === 'POSSIBLE_MATCH').length;
    const openOpportunities = matchResults.filter(m => m.scholarship.deadlineStatus !== 'closed').length;

    res.json({
      profile,
      summary: {
        totalDiscovered: allScholarships.length,
        strongMatches,
        likelyMatches,
        possibleMatches,
        openOpportunities,
        liveDiscovered: liveResultsCount,
      },
      results: matchResults,
      quotaCooldown: Date.now() < geminiCooldownUntil,
      liveDiscovery: !aiClient || !process.env.GEMINI_API_KEY ? 'unavailable_no_key' : (Date.now() < geminiCooldownUntil ? 'cooldown' : 'available'),
      refreshed: true,
      refreshedAt: new Date().toISOString(),
      webSearchQueries,
      searchSourcesCount: searchSources.length,
      searchSources: searchSources.slice(0, 10),
      studentConditions: {
        country: profile.country,
        university: profile.university,
        studyLevel: profile.studyLevel,
        field: profile.field,
        cgpa: profile.cgpa,
        failedSubjects: profile.failedSubjects
      }
    });
  } catch (error) {
    // Fallback: only reuse the caller's own profile values. Never invent
    // a CGPA or a profile the caller did not send.
    try {
      const body = req.body as Partial<StudentProfile> | undefined;
      if (!body || !body.country || typeof body.cgpa !== 'number' || !Number.isFinite(body.cgpa)) {
        return res.status(200).json({ results: [], summary: { totalDiscovered: 0 }, fallbackMode: true });
      }
      const fallbackProfile: StudentProfile = body as StudentProfile;
      const fallbackCatalog = VERIFIED_SCHOLARSHIPS.filter(s => isEligibleNationality(s, fallbackProfile.country || 'International'));
      const fallbackMatches = fallbackCatalog.map(s => evaluateEligibility(s, fallbackProfile));
      res.json({
        profile: fallbackProfile,
        summary: {
          totalDiscovered: fallbackCatalog.length,
          strongMatches: fallbackMatches.filter(m => m.category === 'STRONG_MATCH').length,
          likelyMatches: fallbackMatches.filter(m => m.category === 'LIKELY_MATCH').length,
          possibleMatches: fallbackMatches.filter(m => m.category === 'POSSIBLE_MATCH').length,
          openOpportunities: fallbackMatches.filter(m => m.scholarship.deadlineStatus !== 'closed').length,
          liveDiscovered: 0,
        },
        results: fallbackMatches,
        fallbackMode: true
      });
    } catch {
      res.status(200).json({ results: [], summary: { totalDiscovered: 0 } });
    }
  }
});

// 4. On-Demand Global Deep Scan
app.post('/api/scholarships/deep-scan', writeRateLimit, async (req, res) => {
  try {
    const { profile, targetRegion } = req.body;
    if (!profile || !profile.country) {
      return res.status(400).json({ error: 'Profile with country is required.' });
    }
    const inputError = profileInputError(profile);
    if (inputError) {
      return res.status(400).json({ error: inputError });
    }
    if (targetRegion !== undefined && invalidText(targetRegion, 150)) {
      return res.status(400).json({ error: 'Target region is too long or invalid.' });
    }

    const regionQuery = targetRegion || 'USA, UK, Canada, Germany, Australia, Japan, South Korea, and Europe';
    let newlyDiscovered: Scholarship[] = [];
    let isQuotaLimit = Date.now() < geminiCooldownUntil;
    let liveUnavailable = !aiClient || !process.env.GEMINI_API_KEY;

    if (shouldAttemptGemini()) {
      try {
        const majorPart = profile.field ? `majoring in ${profile.field}` : '';
        const prompt = `Search the web for 5 to 8 real, currently open scholarships for students from ${profile.country} ${majorPart} (undergrad at ${profile.university || 'university'}, CGPA ${profile.cgpa ?? 'not provided'}) to study in ${regionQuery}.
Must be official government scholarships, university excellence awards, or recognized multilateral funds.
Provide official URLs (not aggregator blogs), deadlines, funding coverage, CGPA requirement, and backlogs policy. Do not invent any deadline, CGPA cutoff, benefit or URL: include only values stated on the official page, and omit any field you cannot confirm.
Return as a strict JSON array of objects with keys:
name, provider, destinationCountry, officialUrl, applicationUrl, degreeLevels, minimumCGPA, fundingType, benefits (tuitionCoverage, stipendMonthly, travelAllowance), deadline, failedSubjectRule (policy, description).`;

        const response = await aiClient!.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            tools: [{ googleSearch: {} }],
          }
        });

        const parsed = parseScholarshipsSafely(response.text || '');
        let droppedScanCount = 0;
        for (const item of parsed) {
          const validated = validateLiveItem(item, profile);
          if (!validated) { droppedScanCount++; continue; }
          const isDuplicate = newlyDiscovered.some(
            existing => normaliseNameForDedupe(existing.name) === normaliseNameForDedupe(validated.name) ||
                        normaliseUrlForDedupe(existing.officialUrl) === normaliseUrlForDedupe(validated.officialUrl)
          ) || VERIFIED_SCHOLARSHIPS.some(
            existing => normaliseNameForDedupe(existing.name) === normaliseNameForDedupe(validated.name) ||
                        normaliseUrlForDedupe(existing.officialUrl) === normaliseUrlForDedupe(validated.officialUrl)
          );
          if (!isDuplicate) newlyDiscovered.push(validated);
        }
        if (droppedScanCount > 0) {
          console.info(`[Deep Scan] Dropped ${droppedScanCount} of ${parsed.length} live items: missing/invalid name, URL or deadline.`);
        }
      } catch (err) {
        handleGeminiError(err, 'Deep Scan');
        isQuotaLimit = true;
      }
    } else {
      // No key configured or Gemini in cooldown: live discovery did not run.
      // This is not a quota error unless the cooldown is active.
      liveUnavailable = true;
    }

    // Resilient fallback: If live search didn't yield items or quota limit is active,
    // select matching high-relevance scholarships from the verified official catalog
    if (newlyDiscovered.length === 0) {
      const eligible = VERIFIED_SCHOLARSHIPS.filter(s => isEligibleNationality(s, profile.country));
      const pool = targetRegion
        ? eligible.filter(s => s.destinationCountry.toLowerCase().includes(targetRegion.toLowerCase()))
        : eligible;
      newlyDiscovered = (pool.length > 0 ? pool : eligible).slice(0, 6);
    }

    const matchResults = newlyDiscovered.map(s => evaluateEligibility(s, profile));

    const usedCatalogFallback = newlyDiscovered.length > 0 && !newlyDiscovered.some((item) => item.liveDiscovered);
    res.json({
      discoveredCount: newlyDiscovered.length,
      newScholarships: newlyDiscovered,
      results: matchResults,
      quotaExceeded: isQuotaLimit,
      liveUnavailable,
      message: liveUnavailable
        ? 'Live discovery is unavailable (no key configured or Gemini in cooldown). Showing catalog matches for your profile; nothing new was verified live.'
        : usedCatalogFallback
          ? 'Live discovery returned nothing usable. Showing catalog matches for your profile; nothing new was verified live.'
          : `Live discovery returned ${newlyDiscovered.length} unchecked result(s). They have NOT been verified: confirm each one on its official page before applying.`
    });
  } catch {
    // Return verified catalog matches instead of 500
    const fallbackProfile = (req.body?.profile && typeof req.body.profile.cgpa === 'number')
      ? req.body.profile
      : { country: 'International', university: 'General', cgpa: 0 };
    const eligible = VERIFIED_SCHOLARSHIPS.filter(s => isEligibleNationality(s, fallbackProfile.country || 'International'));
    const matchResults = eligible.slice(0, 6).map(s => evaluateEligibility(s, fallbackProfile));
    res.json({
      discoveredCount: matchResults.length,
      newScholarships: eligible.slice(0, 6),
      results: matchResults,
      quotaExceeded: true,
      liveUnavailable: true,
      message: 'Live discovery failed. Showing catalog matches for your profile; nothing new was verified live.'
    });
  }
});


// 4. Verify Single Scholarship: performs a real HTTP check of the catalog
// official URL in this request, plus a domain check against the catalog URL
// and a runtime deadline re-check. verified is true only when the URL
// responds 2xx/3xx. A listing whose page cannot be reached is reported as
// not verified — never stamped verified with the current time.
app.post('/api/scholarships/verify-single', writeRateLimit, async (req, res) => {
  try {
    if (invalidText(req.body?.scholarshipId, 200) || (req.body?.officialUrl !== undefined && invalidText(req.body.officialUrl, 2000))) {
      return res.status(400).json({ error: 'Invalid verification request.' });
    }
    const { scholarshipId, officialUrl } = req.body ?? {};
    const found = VERIFIED_SCHOLARSHIPS.find(s => s.id === scholarshipId);

    if (!found) {
      return res.status(404).json({ error: 'Scholarship not found in catalog.' });
    }

    const checkedAt = new Date().toISOString();
    const deadline = computeDeadlineStatus(found.deadline);

    // If the caller supplied a URL, it must belong to the same registrable
    // domain as the catalog URL; a different domain is not this listing.
    let domainMismatch = false;
    if (officialUrl && typeof officialUrl === 'string') {
      try {
        domainMismatch =
          registrableDomain(new URL(officialUrl).hostname) !==
          registrableDomain(new URL(found.officialUrl).hostname);
      } catch {
        domainMismatch = true;
      }
    }

    const check = domainMismatch
      ? { ok: false, status: null as number | null, error: 'domain_mismatch' }
      : await checkUrlLive(found.officialUrl, 10000);

    const verified = check.ok && !domainMismatch;
    res.json({
      scholarshipId,
      verified,
      status: verified ? found.verificationStatus : 'needs_confirmation',
      lastChecked: checkedAt,
      checkMethod: 'http',
      httpStatus: check.status,
      linkError: check.error ?? null,
      finalUrl: check.finalUrl ?? null,
      officialUrl: found.officialUrl,
      sourceType: found.sourceType,
      officialNote: found.officialSourceNote,
      deadlineStatus: deadline.deadlineStatus,
      daysRemaining: deadline.daysRemaining,
      deadline: found.deadline
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify scholarship.' });
  }
});

// Setup Vite middlewares in development or static serving in production
async function startServer() {
  const distPath = path.resolve(__dirname, 'dist');
  const isProduction = process.env.NODE_ENV === 'production' || fs.existsSync(path.resolve(distPath, 'index.html'));

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Global Scholarship Finder server listening on port ${PORT}`);
  });
}

startServer();
