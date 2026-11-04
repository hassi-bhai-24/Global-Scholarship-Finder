# Laiba Global Scholarship Finder

A scholarship finder that matches a student's country, study level, field and
academic record against a local catalog of international scholarships — and
exists to protect students from scholarship scams. It is dedicated in loving
memory of Laiba (see the memorial note in the app).

**The honesty rule of this project:** a listing here is never a guarantee,
and it is never proof that an offer received somewhere else is genuine.
Every listing shows its source and the date its links were last checked, so
anyone can verify it on the official page before applying or paying anything.

## What it does

- **Search / matching** — enter nationality, study level, education status,
  university, field and academic results; the matcher ranks catalog
  scholarships (Strong / Likely / Possible / Low / Closed) with written
  reasons. Match labels are rough indicators, not probabilities, and
  deadlines are computed from the deadline date at runtime, so expired
  listings show as Closed.
- **Global directory** — browse the whole catalog with search, subject,
  study-level and funding filters.
- **Tracker** — save scholarships and track application status locally in
  the browser (localStorage). Saved items are refreshed from the catalog
  whenever they are read, so deadlines do not go stale.
- **Sources** — the list of official portals, with a real "Audit Portals"
  check that fetches each portal and reports reachability per source.
- **Scam safety** — a safety guide and a report form. The form stores a
  report **only in the visitor's own browser**; this site has no report
  inbox or verification team, and the form says so. The guide links to
  official reporting channels instead of promising an investigation.
- **Optional live discovery** — with a `GEMINI_API_KEY` set, the server can
  ask Gemini (with Google Search grounding) for additional scholarships.
  Live results are **not verified**: they are labelled as needing
  confirmation, their links/deadlines are not checked, and items with a
  missing or past deadline, or an invalid URL, are dropped. Without a key,
  only the local catalog is searched and the UI says so.

## How verification works (and what it does not do)

- The catalog is a hardcoded list in `src/data/scholarships.ts` (54
  listings). There is no scraper and no database.
- On 4 November 2026 every listing's official and application URLs were
  checked over HTTP from the machine doing the check, and the result is
  stored per listing (`linkCheck`: HTTP status of each link, checked date).
  Links that returned a definite 404 are labelled broken; links that did
  not respond, or returned bot-protection responses (403/412/503), are
  labelled "could not be checked" — **not** dead.
- That check verified **links only**. Deadlines, CGPA cutoffs, benefit
  amounts and failed-subject policies were **not** re-confirmed against
  official pages, and are shown as listed in the catalog. Confirm all of
  them on the official page before applying.
- `POST /api/scholarships/verify-single` performs a real HTTP check of a
  listing's official URL (plus a domain check) at request time and reports
  honestly when the page cannot be reached. It never stamps a listing
  verified from a lookup alone.
- Re-checks are manual and visible: run **Audit Portals** on the Sources
  page (the last audit date is shown there) and re-check listings at least
  monthly. Nothing re-checks itself automatically.

## How to run

Requirements: Node.js 22+ and npm.

```bash
npm ci        # install (a lock file is committed; plain `npm install` works too)
npm run lint  # strict TypeScript check (tsc --noEmit, strict + noUnusedLocals)
npm run build # production build (Vite) into dist/
npm start     # serve the production build (node server.ts, port 3000 by default)
```

For development, `npm run dev` starts the server with Vite middleware
(`tsx server.ts`).

Optional environment variables (see `.env.example`):

- `GEMINI_API_KEY` — enables live discovery. Without it, the app works
  fully on the local catalog. Never commit a key.
- `PORT` — server port (default 3000).

## How to add or correct a listing

1. Edit one entry in `src/data/scholarships.ts`. Copy the facts only from
   the programme's official page: name, provider, destination, official
   and application URLs, eligible nationalities, degree levels, fields,
   CGPA cutoff, failed-subject policy, funding/benefits, deadline.
2. Never invent a deadline, amount, CGPA, benefit, quote or link. If a
   fact cannot be confirmed on the official page, leave it out or mark it
   as not stated — do not fill it with a plausible default.
3. Set `lastVerified` to the date you checked the links, add a `linkCheck`
   record with the HTTP status of each URL, and set
   `verificationStatus` to `needs_confirmation` unless both links
   responded. If the entry is a track/variant of another entry sharing
   the same official page, add a `programmeNote` saying so instead of
   presenting it as a separate scholarship.
4. Run `npm run lint` and `npm run build` before committing.

## Safety notes for students

- Apply only on the official programme page, reached from the listing's
  own link. Never pay an agent who guarantees selection, and always check
  any fee on the official page — some legitimate programmes do charge
  application fees, but a fee demanded by an agent is a warning sign.
- Never share passwords, bank OTPs or passport details with unverified
  contacts.
- To report a scam, use the official channels in the app's safety guide
  (for example the National Cyber Crime Investigation Agency in Pakistan)
  and tell the real programme through its official page.

## Tech stack

React 19 + Vite 8 + Tailwind CSS 4, Express server (`server.ts`, run with
`tsx`/Node type-stripping), `@google/genai` for the optional live path,
`lucide-react` icons. The university directory (`universities.json`) is
loaded lazily as a separate chunk. No analytics or tracking code; the
only external request the page used to make was Google Fonts, which has
been removed in favour of system font stacks.

## Licence

MIT — see `LICENSE`.
