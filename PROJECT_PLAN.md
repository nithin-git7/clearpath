# ClearPath Germany: staged MVP plan

## Execution rules

- Build one numbered section at a time and stop for approval after validation.
- At the end of each section, report the files created or changed, commands, and a quick test.
- Prefer simple, typed, understandable code over premature abstractions.
- Do not add features from later sections early.
- Keep high-risk guidance cautious and tied to official verification.
- Never expose LLM or database secrets to the browser.
- Treat Pydantic and TypeScript types as the source of truth; mocks and generators must conform.
- High-risk numeric facts (amounts, deadlines) must come from the knowledge base or be marked unverified.
- Golden fixture tests must pass before marking sections 11 or 17 complete.

## Build sections

| Section | Deliverable | Status |
| --- | --- | --- |
| 1 | Project plan, folder scaffold, README, environment examples, and communication contract | Complete (2026-07-04) |
| 2 | FastAPI skeleton and health check | Complete (2026-07-04) |
| 3 | Next.js skeleton and landing page | Complete (2026-07-04) |
| 4 | Multi-section roadmap form UI | Complete (2026-07-10) |
| 5 | Typed roadmap contract and deterministic `POST /api/roadmap/generate` | Complete (2026-07-10) |
| 6 | Connect roadmap form and render result cards | Complete (2026-07-10) |
| 7 | Replaceable LLM provider wrapper (timeouts, retries, logging) | Not started |
| 8 | Profile normalizer and deterministic stage detector | Complete (2026-07-10) |
| 9 | Curated knowledge base and rules layer | Not started |
| 10 | Roadmap prompt and structured JSON generation | Not started |
| 11 | Roadmap safety verifier and golden fixture eval set | In progress (deterministic fixtures added 2026-07-10) |
| 12 | Document explainer UI | Complete (2026-07-10) |
| 13 | Typed explain contract and deterministic `POST /api/explain` | Complete (2026-07-10) |
| 14 | Deterministic document classifier and entity extractor | Complete (2026-07-10) |
| 15 | Structured document explanation generation | Complete (2026-07-10) |
| 16 | Professional email draft generator | Complete (2026-07-10) |
| 17 | Document explainer safety verifier and golden fixture eval set | In progress (deterministic fixtures added 2026-07-10) |
| 18 | Supabase schema and optional result persistence | Not started |
| 19 | Feedback endpoint and UI | Not started |
| 20 | Copy controls, loading/error states, and privacy warnings | In progress |
| 21 | Serious MVP demo polish and end-to-end validation | In progress |
| 22 | Curated university dataset and schema (`universities.json`) | Complete (2026-07-06) |
| 23 | Curated program/course dataset (`programs.json`) with intakes and deadlines | Complete (2026-07-06) |
| 24 | Explorer backend endpoints (`/api/universities`, `/api/programs`, `/api/deadlines`, `/api/cost-of-living`) | Complete (2026-07-06) |
| 25 | University and course explorer UI (search, filters, result cards) | Complete (2026-07-06) |
| 26 | University and program detail pages | Complete (2026-07-06) |
| 27 | Deadline tracker and intake calendar | Complete (2026-07-06) |
| 28 | Finance and cost planner | Complete (2026-07-06) |
| 29 | Unified journey hub / dashboard | Complete (2026-07-06) |
| 30 | Application shortlist and per-application checklist | Complete (2026-07-06) |
| 31 | Guides, FAQ, and glossary content pages | Complete (2026-07-06) |
| 32 | Global search, empty/loading states, and end-to-end hub validation | Complete (2026-07-06) |

## Section boundaries

### Sections 2-6: prove the core roadmap flow

Establish both runtimes and shared typed contracts before any LLM work. Complete a browser-to-API roadmap flow using deterministic mock data. This proves the user experience before adding an LLM dependency.

Section 5 explicitly delivers:

- Pydantic request and response models in `backend/app/models/`
- Matching TypeScript types in `frontend/lib/` (for example `roadmap.ts`)
- Mock `POST /api/roadmap/generate` returning valid fixture JSON

Section 6 wires form to API client to result cards. User input is preserved on error.

### Sections 7-11: intelligent roadmap with ground truth

Introduce a provider-neutral AI boundary, deterministic preprocessing, a curated knowledge layer, structured generation, schema validation, safety verification, and golden fixture evaluation.

- **Section 7** — Provider-neutral wrapper in `backend/app/services/llm/`; env-driven; no secrets in browser; timeout, retry, and basic request logging.
- **Section 8** — Normalizer and deterministic stage detector (rules over profile fields, not LLM). Stages drive which knowledge rules apply.
- **Section 9** — Curated knowledge base:
  - Versioned JSON modules in `backend/app/data/knowledge/`
  - Official URLs with `last_verified` dates
  - Country-aware rules (APS applicability, uni-assist vs direct apply, blocked-account amount reference)
  - High-risk topic tags
  - Read-only service consumed by prompt builder and safety verifier
  - UI surfaces "Verified on {date} — confirm at {link}" for grounded facts
- **Section 10** — Prompt and structured JSON generation; must cite knowledge-base entries for factual claims; schema validation on response.
- **Section 11** — Safety verifier checks: no promises, high-risk disclaimers present, amounts and deadlines match knowledge base where applicable; golden fixtures in `backend/tests/fixtures/roadmap/` with expected stage, required fields, and forbidden phrases.

Official-resource recommendations remain curated and clearly marked for verification.

### Sections 12-17: build the pasted-text explainer

Add the privacy-aware paste flow, typed contracts, extraction and classification pipeline, structured explanation, email draft, high-risk safeguards, and golden fixture evaluation. File uploads remain out of scope.

- **Section 13** mirrors section 5: typed explain contract and mock endpoint before real AI.
- **Section 14** adds classifier and extractor with prompt-injection awareness (treat pasted text as untrusted input).
- **Section 17** adds explain-specific golden fixtures (deadline extraction, risk level, email draft shape).

### Sections 18-21: persistence and product readiness

Add Supabase only after both core flows work end-to-end with real LLM, then feedback and interaction polish. Finish with end-to-end checks, accessibility review, failure-state review, safety-language review, and eval fixture smoke runs.

### Sections 22-32: all-in-one consultancy hub

Turn the roadmap and explainer MVP into a place a student never has to leave: browse universities and courses, track deadlines, plan finances, follow a step-by-step journey, and read guides, all free and in one site. Data is a hand-curated seed (no scraping, no heavy RAG), building on the section 9 knowledge-base philosophy: every high-risk or time-sensitive fact carries a `last_verified` date and links to an official source.

- **Data** — Curated JSON in `backend/app/data/` (`universities.json`, `programs.json`, `cost_of_living.json`), validated by Pydantic models in `backend/app/models/catalog.py` and mirrored by TypeScript types in `frontend/lib/catalog.ts`.
- **Backend** — Read-only, filterable endpoints served by `backend/app/services/catalog.py` and `backend/app/routes/catalog.py`; covered by `backend/tests/test_catalog.py` (dataset integrity, filters, and HTTP contract).
- **Frontend** — `explore`, `explore/program/[id]`, `explore/university/[id]`, `deadlines`, `finance`, `hub`, `shortlist`, `guides`, `guides/[slug]`, and `search` routes. Personalization (shortlist, per-application checklist, saved deadlines, journey progress) uses `localStorage` via `frontend/lib/storage.ts` since auth is deferred; it is structured to sync to Supabase later (section 18) without redesign.
- **Still deferred** — Accounts/auth, file/PDF upload, payments, mobile app, automated scraping, and heavy RAG.

## Section 9: knowledge base (minimum viable content)

Start small — hand-maintained, not scraped:

- `blocked_account_minimum_eur` with official source link and `last_verified`
- APS countries list and APS India, China, and Vietnam portal links
- uni-assist vs VPD decision hints by application type
- Common document types and typical timing (labeled as guidance, not guarantees)
- Per-stage official resource links (DAAD, Make it in Germany, Ausländerbehörde overview, and similar)

Files to add:

- `backend/app/data/knowledge/` — JSON modules by domain
- `backend/app/services/knowledge.py` — loader and lookup API
- Tests asserting loader integrity and required fields on each entry

## Sections 11 and 17: AI eval fixtures

- `backend/tests/fixtures/roadmap/profiles/` — 5 to 8 representative student profiles (APS country, non-APS, employed, blocked-account stage, and similar)
- `backend/tests/fixtures/explain/samples/` — pasted letter snippets (admission, visa office, insurance, employer)
- Tests run against mock first, then against real LLM in CI only when `LLM_API_KEY` is set (optional gate)
- Assert: schema valid, stage matches detector, no forbidden promise language, key facts align with knowledge base

## MVP completion criteria

The MVP is ready for a serious demo when a user can:

1. Enter a student profile and receive the complete structured roadmap response.
2. See an understandable current stage, next 10 actions, document timing, common mistakes, weekly plan, and resources to verify.
3. Paste confusing text and receive its meaning, required actions, extracted deadlines or amounts, risk level, questions, and an email draft.
4. Understand when information is unverified or requires confirmation from an official authority.
5. Recover from validation, network, provider, and empty-result errors without losing their input.
6. See high-risk factual claims link to a curated official resource with a visible verification date, or explicitly marked as unverified.
7. Browse universities and courses, save a shortlist, track deadlines, plan finances, and read guides from a single hub without leaving the site.

Deferred capabilities are not part of MVP acceptance: authentication, file/image/PDF upload, payments, mobile apps, automated scraping, and heavy RAG.

## Brainstorming and future ideas

Not MVP scope — captured for later:

| Idea | Value | When |
| --- | --- | --- |
| Shareable or printable roadmap (print CSS) | Demo and user retention | Post-MVP |
| "What changed" changelog when knowledge base updates | Trust and accuracy | After section 9 |
| Analytics on completed actions | Product learning | Post-MVP |
| i18n (DE/EN) | Broader audience | Post-MVP |
| Rate limiting and abuse protection on explain endpoint | Cost and safety | Before public launch |
| Lightweight admin UI for knowledge-base updates | Ops without code deploys | Post-MVP |
| PDF or image upload with OCR | Lower paste friction | Explicitly deferred |
| Auth and saved roadmaps | Return users | Explicitly deferred |
| Heavy RAG over official docs | Accuracy at scale | Explicitly deferred |
| Mobile app | Distribution | Explicitly deferred |
