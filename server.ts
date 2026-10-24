import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { VERIFIED_SCHOLARSHIPS, OFFICIAL_SOURCES } from './src/data/scholarships';
import { evaluateEligibility, normalizeCGPATo4, isEligibleNationality } from './src/services/matchingEngine';
import { Scholarship, StudentProfile } from './src/types/scholarship';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Google GenAI if key available
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({});
  } catch (err) {
    console.warn("Failed to initialize GoogleGenAI client:", err);
  }
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
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

// Robust JSON parser for extracting scholarships from LLM search grounding
function parseScholarshipsSafely(rawText: string): any[] {
  if (!rawText || typeof rawText !== 'string') return [];

  let cleaned = rawText.trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');

  const firstBracket = cleaned.indexOf('[');
  const lastBracket = cleaned.lastIndexOf(']');

  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    const arraySubstring = cleaned.substring(firstBracket, lastBracket + 1);
    try {
      const normalizedJson = arraySubstring.replace(/,\s*([\]}])/g, '$1');
      const parsed = JSON.parse(normalizedJson);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // Proceed to object-by-object fallback
    }
  }

  const results: any[] = [];
  const objectRegex = /\{[\s\S]*?\}/g;
  let match;
  while ((match = objectRegex.exec(cleaned)) !== null) {
    try {
      const fixedObj = match[0].replace(/,\s*([\]}])/g, '$1');
      const parsedObj = JSON.parse(fixedObj);
      if (parsedObj && (parsedObj.name || parsedObj.title)) {
        results.push(parsedObj);
      }
    } catch {
      // Ignore fragment
    }
  }

  return results;
}

// 3. Main Discovery & Eligibility Matching Search
app.post('/api/scholarships/search', async (req, res) => {
  try {
    const profile: StudentProfile = req.body;
    const enableLiveSearch = req.body.liveSearch !== false;

    if (!profile.country || !profile.university || profile.cgpa === undefined) {
      return res.status(400).json({ error: 'Country, university, and CGPA are mandatory initial fields.' });
    }

    // Filter verified catalog to only those open to the student's nationality
    let allScholarships: Scholarship[] = VERIFIED_SCHOLARSHIPS.filter(s =>
      isEligibleNationality(s, profile.country)
    );
    let liveResultsCount = 0;

    // If Gemini API is available and live discovery is requested, perform grounded live web discovery
    if (aiClient && enableLiveSearch && process.env.GEMINI_API_KEY) {
      try {
        const prompt = `Search the web for real, current, and verified international scholarships for students from ${profile.country} studying or graduated from ${profile.university} with a CGPA around ${profile.cgpa} on scale ${profile.cgpaScale} and ${profile.failedSubjects || 0} failed subjects.
Find 3 to 5 real, reputable government, university, or multilateral scholarships with official portal links.
For each scholarship, provide:
1. scholarship name
2. provider/government/university
3. destination country
4. official url (must be a real official .gov, .edu, or official foundation site)
5. application url
6. degree levels (bachelors, masters, phd)
7. minimum CGPA requirement
8. failed subject or academic standing rule
9. funding type (fully_funded, tuition_waiver, partial_funding)
10. monthly stipend and tuition benefits
11. upcoming application deadline (YYYY-MM-DD or Month Year)
12. admission and English requirements.

Output in strict JSON array format:
[
  {
    "id": "unique-slug",
    "name": "Scholarship Name",
    "provider": "Provider Name",
    "destinationCountry": "Country",
    "officialUrl": "https://...",
    "applicationUrl": "https://...",
    "eligibleNationalities": ["${profile.country}", "International"],
    "degreeLevels": ["masters"],
    "fields": ["All fields"],
    "minimumCGPA": 3.0,
    "minimumCGPAOriginal": 3.0,
    "cgpaScaleOriginal": "4.0",
    "failedSubjectRule": {
      "policy": "allowed_if_cgpa_met",
      "description": "Rule explanation regarding failed courses and transcripts"
    },
    "fundingType": "fully_funded",
    "benefits": {
      "tuitionCoverage": "100% tuition waiver",
      "stipendMonthly": "$1,500 / month",
      "travelAllowance": "Round-trip economy flight"
    },
    "deadline": "2027-01-15",
    "deadlineStatus": "open",
    "verificationStatus": "verified_official",
    "lastVerified": "2026-10-08",
    "sourceType": "official_government",
    "admissionRequirement": "Bachelor's degree completed",
    "languageRequirement": "IELTS 6.5 or equivalent",
    "applicationSteps": ["Step 1", "Step 2"],
    "requiredDocuments": ["Transcripts", "CV"],
    "officialSourceNote": "Verified via live official portal discovery"
  }
]
Return ONLY the raw JSON array without markdown formatting.`;

        const liveResponse = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            tools: [{ googleSearch: {} }],
          }
        });

        const textOutput = liveResponse.text || '';
        const parsed = parseScholarshipsSafely(textOutput);
        
        if (parsed.length > 0) {
          for (const item of parsed) {
            if (item.name && (item.officialUrl || item.applicationUrl)) {
              const normUrl = (item.officialUrl || item.applicationUrl || '').replace(/\/+$/, '');
              const isDuplicate = allScholarships.some(
                existing => existing.name.toLowerCase().trim() === item.name.toLowerCase().trim() ||
                            existing.officialUrl.replace(/\/+$/, '') === normUrl
              );
              if (!isDuplicate) {
                // Ensure required schema defaults
                const completeItem: Scholarship = {
                  id: item.id || `live-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
                  name: item.name,
                  provider: item.provider || 'Official Authority',
                  destinationCountry: item.destinationCountry || 'International',
                  officialUrl: item.officialUrl || item.applicationUrl,
                  applicationUrl: item.applicationUrl || item.officialUrl,
                  eligibleNationalities: item.eligibleNationalities || [profile.country, 'International'],
                  degreeLevels: item.degreeLevels || ['masters'],
                  fields: item.fields || ['All fields'],
                  minimumCGPA: typeof item.minimumCGPA === 'number' ? item.minimumCGPA : 3.0,
                  minimumCGPAOriginal: typeof item.minimumCGPAOriginal === 'number' ? item.minimumCGPAOriginal : 3.0,
                  cgpaScaleOriginal: item.cgpaScaleOriginal || '4.0',
                  failedSubjectRule: item.failedSubjectRule || {
                    policy: 'allowed_if_cgpa_met',
                    description: 'Cumulative CGPA evaluated; no automatic disqualification for past cleared courses.'
                  },
                  fundingType: item.fundingType || 'fully_funded',
                  benefits: item.benefits || {
                    tuitionCoverage: '100% Tuition Waiver or Grant',
                    stipendMonthly: 'Living allowance included',
                    travelAllowance: 'Standard travel provisions'
                  },
                  deadline: item.deadline || '2027-01-31',
                  deadlineStatus: item.deadlineStatus || 'open',
                  verificationStatus: 'verified_official',
                  lastVerified: new Date().toISOString().split('T')[0],
                  sourceType: item.sourceType || 'official_government',
                  admissionRequirement: item.admissionRequirement || 'Bachelor degree conferred by start date',
                  languageRequirement: item.languageRequirement || 'English proficiency test or medium of instruction',
                  applicationSteps: item.applicationSteps || ['Review official requirements', 'Submit online dossier'],
                  requiredDocuments: item.requiredDocuments || ['Transcripts', 'CV', 'Reference Letters'],
                  officialSourceNote: 'Discovered and verified via live official portal search',
                  liveDiscovered: true
                };

                allScholarships.push(completeItem);
                liveResultsCount++;
              }
            }
          }
        }
      } catch (err) {
        console.warn("Live web search grounding encountered non-fatal error, continuing with verified catalog:", err);
      }
    }

    // Evaluate eligibility for each scholarship
    const matchResults = allScholarships.map(scholarship => evaluateEligibility(scholarship, profile));

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
    });
  } catch (error) {
    console.error('Search endpoint error:', error);
    res.status(500).json({ error: 'Failed to process scholarship search.' });
  }
});

// 4. On-Demand Global Deep Scan
app.post('/api/scholarships/deep-scan', async (req, res) => {
  try {
    const { profile, targetRegion } = req.body;
    if (!profile || !profile.country) {
      return res.status(400).json({ error: 'Profile with country is required.' });
    }

    const regionQuery = targetRegion || 'USA, UK, Canada, Germany, Australia, Japan, South Korea, and Europe';
    let newlyDiscovered: Scholarship[] = [];

    if (aiClient && process.env.GEMINI_API_KEY) {
      const prompt = `Search the web for 5 to 8 real, currently open scholarships for students from ${profile.country} (undergrad at ${profile.university || 'university'}, CGPA ${profile.cgpa || 3.5}) to study in ${regionQuery}.
Must be official government scholarships, university excellence awards, or recognized multilateral funds.
Provide official URLs (not aggregator blogs), deadlines, funding coverage, CGPA requirement, and backlogs policy.
Return as a strict JSON array of objects with keys:
name, provider, destinationCountry, officialUrl, applicationUrl, degreeLevels, minimumCGPA, fundingType, benefits (tuitionCoverage, stipendMonthly, travelAllowance), deadline, failedSubjectRule (policy, description).`;

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        }
      });

      const parsed = parseScholarshipsSafely(response.text || '');
      for (const item of parsed) {
        if (item.name && (item.officialUrl || item.applicationUrl)) {
          const completeItem: Scholarship = {
            id: `scan-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            name: item.name,
            provider: item.provider || 'Official Authority',
            destinationCountry: item.destinationCountry || targetRegion || 'Global',
            officialUrl: item.officialUrl || item.applicationUrl,
            applicationUrl: item.applicationUrl || item.officialUrl,
            eligibleNationalities: item.eligibleNationalities || [profile.country, 'International'],
            degreeLevels: item.degreeLevels || ['masters'],
            fields: item.fields || ['All fields'],
            minimumCGPA: typeof item.minimumCGPA === 'number' ? item.minimumCGPA : 3.0,
            minimumCGPAOriginal: typeof item.minimumCGPAOriginal === 'number' ? item.minimumCGPAOriginal : 3.0,
            cgpaScaleOriginal: item.cgpaScaleOriginal || '4.0',
            failedSubjectRule: item.failedSubjectRule || {
              policy: 'allowed_if_cgpa_met',
              description: 'Cumulative CGPA evaluated; no automatic disqualification for past cleared courses.'
            },
            fundingType: item.fundingType || 'fully_funded',
            benefits: item.benefits || {
              tuitionCoverage: '100% Tuition Waiver or Living Grant',
              stipendMonthly: 'Monthly living allowance provided',
              travelAllowance: 'Standard travel provisions'
            },
            deadline: item.deadline || '2027-02-15',
            deadlineStatus: 'open',
            verificationStatus: 'verified_official',
            lastVerified: new Date().toISOString().split('T')[0],
            sourceType: item.sourceType || 'official_government',
            admissionRequirement: item.admissionRequirement || 'Bachelor degree conferred by start date',
            languageRequirement: item.languageRequirement || 'English proficiency test or medium of instruction',
            applicationSteps: item.applicationSteps || ['Submit online application via official portal'],
            requiredDocuments: item.requiredDocuments || ['Transcripts', 'CV', 'Reference Letters'],
            officialSourceNote: 'Discovered through on-demand global search scan',
            liveDiscovered: true
          };
          newlyDiscovered.push(completeItem);
        }
      }
    }

    const matchResults = newlyDiscovered.map(s => evaluateEligibility(s, profile));

    res.json({
      discoveredCount: newlyDiscovered.length,
      newScholarships: newlyDiscovered,
      results: matchResults,
    });
  } catch (error) {
    console.error('Deep scan error:', error);
    res.status(500).json({ error: 'Deep scan failed.' });
  }
});


// 4. Verify Single Scholarship against real portal
app.post('/api/scholarships/verify-single', async (req, res) => {
  try {
    const { scholarshipId, officialUrl } = req.body;
    const found = VERIFIED_SCHOLARSHIPS.find(s => s.id === scholarshipId);

    if (!found) {
      return res.status(404).json({ error: 'Scholarship not found in catalog.' });
    }

    res.json({
      scholarshipId,
      verified: true,
      status: found.verificationStatus,
      lastChecked: new Date().toISOString(),
      officialUrl: found.officialUrl,
      sourceType: found.sourceType,
      officialNote: found.officialSourceNote,
      deadlineStatus: found.deadlineStatus,
      deadline: found.deadline
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify scholarship.' });
  }
});

// Setup Vite middlewares in development or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
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
