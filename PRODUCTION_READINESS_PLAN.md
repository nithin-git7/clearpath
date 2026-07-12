# ClearPath Germany: production-readiness and product improvement plan

**Prepared:** 11 July 2026  
**Execution status:** Approved for implementation in this workstream  
**Product goal:** Turn the current collection of Germany-study tools into one trustworthy, action-oriented product that helps an international student decide what to do next, complete the work, and verify high-risk facts at the official source.

## 1. Current status assessment

ClearPath Germany already has a strong functional base:

- a responsive landing page and shared navigation;
- university and program discovery with detail pages;
- program comparison and a device-local shortlist;
- application deadlines and a budget calculator;
- a multi-step personalized roadmap;
- a pasted-text document explainer and email draft;
- an application hub, guides, FAQ, glossary, and search;
- a typed FastAPI catalog plus deterministic roadmap/explainer services;
- automated backend tests and frontend type, lint, and build scripts;
- a Sites-compatible production build and existing deployment configuration.

The product is therefore in **late MVP / pre-production**, not an early prototype. Its main weaknesses are cohesion, trust, freshness, error resilience, and real-world completion support.

### Key problems found in the audit

1. **The user journey is fragmented.** Powerful tools are present, but the home page does not help a student choose the correct entry point by situation.
2. **The hub is not yet a true command center.** It should surface the next best action, progress, upcoming dates, saved programs, and financial readiness in one place.
3. **Time-sensitive information is uneven.** Verification dates exist, but several sources point to generic landing pages and changing facts are not managed through one source-of-truth layer.
4. **Deadline handling is fragile.** Seed dates can become past dates and silently make the experience feel stale; the interface must distinguish upcoming, passed, and “confirm with university” dates.
5. **Finance planning is too shallow.** One monthly total does not explain rent, insurance, food, transport, setup costs, tuition/semester fees, financial-proof requirements, or a funding gap.
6. **Trust cues are inconsistent.** Official-source links, verification dates, educational disclaimers, privacy notices, and uncertainty labels need one clear visual system.
7. **Content quality defects remain.** Mojibake/encoding artifacts appear in visible copy, and some explanations overgeneralize APS, VPD, work rules, health insurance, and arrival steps.
8. **Production hardening is incomplete.** Metadata, social sharing, canonical discovery, global error states, route-level empty states, accessibility checks, and end-to-end section checks need completion.
9. **The backend is deliberately lightweight but must not be ignored.** Catalog filtering, date safety, health responses, validation, CORS configuration, and feedback capture must remain reliable even though the visible work is frontend-led.

## 2. Product direction

The distinctive idea is a **Germany Application Control Room**: not another article directory or admissions lead form, but a private-by-default workspace that turns official requirements into a personal sequence of decisions and actions.

The product promise will be:

> Know your next step, why it matters, and where to verify it.

The experience will be organized around four modes:

1. **Discover** — find and compare programs using decision-relevant facts.
2. **Qualify** — understand APS, application routes, documents, language, and financial readiness without promising eligibility.
3. **Execute** — follow a staged roadmap, shortlist, checklists, and deadlines.
4. **Verify** — see the official source, freshness date, and uncertainty for every high-risk claim.

## 3. Required improvements and new features

### A. Global experience and information architecture

- Replace the generic home-page flow with a situation-led start panel: “I am exploring,” “I am preparing applications,” “I have an offer,” or “I am preparing to move.”
- Expose the full product, not only the roadmap and explainer: explorer, compare, deadlines, finance, guides, shortlist, and hub.
- Add a consistent, richer footer with primary tools, trusted official resources, legal/educational boundaries, privacy wording, and data-freshness status.
- Improve mobile navigation, keyboard navigation, focus states, selected/active states, labels, and touch targets.
- Add consistent page headers, breadcrumbs where useful, empty states, recovery actions, and “what to do next” panels.

### B. Application Control Room (hub upgrade)

- Turn the hub into the main return-user surface.
- Calculate and display journey progress from locally saved roadmap, shortlist, deadline, and checklist data.
- Show one prioritized “next best action” instead of a flat collection of links.
- Surface upcoming deadlines, incomplete shortlisted-application tasks, and data stored only on the current device.
- Add a compact readiness snapshot for profile, research, documents, applications, finance, and arrival.
- Preserve the no-account, privacy-first model; clearly explain that clearing browser data removes progress.

### C. Discovery, details, shortlist, and comparison

- Improve explorer search/filter clarity, result counts, sorting, mobile filter layout, and no-results recovery.
- Make program cards decision-oriented: intake, language, application route, tuition/semester cost, deadline status, and verification state.
- Harden detail pages for missing or stale catalog fields and always link to the exact official program/application page where available.
- Improve comparison with an explicit maximum, removal controls, meaningful empty state, and a mobile-friendly fact matrix.
- Upgrade shortlist checklists to show completion progress, the nearest relevant deadline, and a direct link to the official program page.

### D. Deadline intelligence

- Classify deadlines as upcoming, near, passed, or not safely known.
- Never present a passed seed date as an actionable upcoming deadline.
- Add date sorting, intake filters, saved-deadline state, and official verification links.
- Explain that applicant category, nationality, qualification, and application channel can change a deadline.
- Provide a useful fallback when no future dated entries are available.

### E. Finance readiness planner

- Replace the single-value estimator with an itemized monthly and one-time budget.
- Include housing, food, insurance, local transport, communication, personal costs, semester contribution, tuition where applicable, visa/application setup costs, travel, and emergency buffer.
- Show annual cost, amount already available, funding gap/surplus, and months of runway.
- Present the blocked-account figure only when confirmed from an authoritative current source and display its applicable period and verification date.
- Keep city costs explicitly labeled as planning estimates rather than official prices.

### F. Roadmap and document explainer

- Preserve form input across failure and improve field-level validation.
- Add a clear result summary, stage progress, priority ordering, copy/print support, and links into deadlines, finance, shortlist, and guides.
- Make uncertainty and official verification visible beside high-risk actions.
- Improve document-explainer privacy guidance before paste, sample behavior, loading state, extracted-deadline emphasis, copy controls, and safe failure recovery.
- Keep deterministic backend behavior production-safe; an LLM is not required for the site to remain useful.

### G. Current, source-backed information

- Refresh the high-risk guidance from authoritative sources only: Federal Foreign Office, Make it in Germany, DAAD, uni-assist, APS offices, and official university pages.
- Centralize current facts in a typed knowledge module with: topic, concise fact, applicability, official URL, last verified date, and caution text.
- Correct oversimplified APS/VPD, student work, health-insurance, financial proof, and arrival wording.
- Replace generic official links with the most specific relevant official page available.
- Show a site-wide “information checked” date and never imply live or guaranteed accuracy.

### H. Backend and operational hardening

- Keep API contracts typed and backwards compatible with the existing frontend.
- Add/strengthen validation for catalog dates, URLs, IDs, and filter inputs.
- Ensure errors return safe, useful messages without stack details.
- Add a lightweight feedback endpoint only if it can be stored safely in the current hosting model; otherwise provide a transparent local/non-submitting feedback affordance rather than a fake form.
- Review CORS and environment examples for production-safe defaults without committing secrets.
- Extend tests for past deadlines, missing catalog fields, invalid filters, and all high-risk response disclaimers.

### I. Production presentation and discoverability

- Fix all visible encoding artifacts and inconsistent capitalization.
- Add complete page metadata, canonical-aware Open Graph/X sharing metadata, robots, sitemap, and a unique social preview.
- Add global not-found and recoverable error experiences consistent with the brand.
- Check responsive layouts at mobile, tablet, laptop, and wide-screen widths.
- Verify contrast, semantic headings, form labels, status announcements, keyboard operation, and reduced-motion behavior.

## 4. Features intentionally not added in this release

These would add operational, legal, or privacy risk without improving the core problem enough for this release:

- paid consultancy lead capture;
- admission or visa probability scores;
- promises of eligibility or guaranteed outcomes;
- scraping university websites without a maintenance and verification process;
- document/PDF upload and retention;
- public accounts, payments, chat, or a heavy AI/RAG layer;
- fake testimonials, invented success statistics, or unsupported rankings.

The architecture should remain ready for authenticated cloud sync later, but device-local progress is the safer production default for now.

## 5. Implementation sequence

1. Establish a typed current-information layer and fix encoding/content defects.
2. Strengthen the shared layout, navigation, footer, metadata, and trust system.
3. Rebuild the home page around situation-led entry and the Control Room concept.
4. Upgrade the hub and local progress model.
5. Harden explore, details, compare, shortlist, and deadline flows.
6. Build the itemized finance-readiness experience.
7. Polish roadmap and explainer completion/recovery behavior.
8. Add production metadata, sitemap/robots, social preview, error boundaries, and final content consistency.
9. Run all automated checks and section-by-section browser QA; repair every reproducible defect.
10. Produce a clean deployment build and publish the validated Sites version.

## 6. Definition of production ready

The release is complete only when:

- every primary route loads without an unhandled error;
- all core flows work with the API available and show a useful recovery state when it is unavailable;
- no past deadline is described as upcoming;
- every changing/high-risk fact is cautious, dated, and linked to an authoritative source;
- mobile and desktop navigation, forms, filters, save/remove actions, and checklists are keyboard and touch usable;
- no visible encoding defects, placeholder claims, dead internal links, or false submission controls remain;
- frontend lint, TypeScript validation, production build, backend tests, and data-integrity checks pass;
- the production bundle contains the required Sites worker and static assets;
- the deployed version matches the validated source.

## 7. Delivery record

### Completed

- Reframed the product around a unique, private-by-default Application Control Room with situation-led entry, next-best-action guidance, readiness groups, milestones, and connected work tools.
- Rebuilt home, hub, deadlines, finance, roadmap, and key catalog workflows; added deadline health states, saved-only filtering, completion signals, sorting, funding-gap and runway calculations, copy/print actions, and useful empty/recovery states.
- Strengthened navigation, footer trust language, active-route feedback, mobile accessibility, error recovery, robots, sitemap, responsive metadata, and a bespoke social preview.
- Kept device-local personalization and removed the need for risky accounts, uploads, payments, scraping, or invented outcome scoring.
- Added backend validation for real calendar dates and absolute HTTPS official sources, plus regression tests.

### Information refresh

- Reviewed changing guidance on 2026-07-12 using Federal Foreign Office, Make it in Germany, uni-assist, APS India, and official university sources; APS China remains individually dated to its last dedicated review.
- Updated the 2026 financial-proof reference, student work allowance, uni-assist/VPD timing, APS India 2026/27 and summer 2027 notices, health-insurance wording, arrival registration, and Consular Services Portal availability.
- Kept case-specific caveats beside high-risk facts and linked every actionable claim to the responsible official source.

### Validation record

- Frontend ESLint: passed.
- TypeScript validation: passed.
- Backend regression and safety suite: 41 tests passed.
- Production build: passed.
- Production-rendered route matrix: every public route, dynamic detail route, robots, sitemap, social asset, metadata, API-backed roadmap, and document explainer passed; unknown routes correctly return 404.
- Automated in-app visual inspection was unavailable because the Windows browser sandbox could not start. Responsive and accessibility behavior remains covered by source review, lint, type validation, and rendered-route checks; a manual visual spot-check is the only non-blocking follow-up.

### Deliberately deferred

- Accounts and cloud sync, stored documents, feedback submission, payments, outcome probabilities, broad scraping, and a heavy LLM/RAG layer.
- These are future capabilities only after consent, retention, security, and maintenance requirements are designed explicitly.
