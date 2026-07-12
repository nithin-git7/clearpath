# ClearPath Germany

> Apply to Germany without feeling lost.

ClearPath Germany is a self-guided Germany study and career navigator. It is designed to turn a student's profile and questions into structured next actions, checklists, timelines, and official resources to verify.

The product is an educational planning tool. It is not legal or immigration advice, and it does not guarantee admission, visa approval, eligibility, or work authorization.

## Current status

ClearPath Germany is now a production-oriented, private-by-default application control room. The responsive frontend includes situation-led onboarding, a unified readiness dashboard, 25 universities and 34 programs, deadline health states, shortlist and comparison tools, an itemized finance planner, personalized roadmap, pasted-text explainer, India-first APS guidance, guides, search, error recovery, and production metadata.

The FastAPI service validates catalog dates and official HTTPS sources, serves deterministic roadmap and explainer workflows, and is covered by regression and safety fixtures. High-risk guidance is dated and source-linked; users are still expected to verify their exact case with the responsible authority. Authentication, uploads, payments, cloud sync, broad scraping, and heavy AI/RAG remain intentionally deferred because they add privacy and maintenance risk without being required for the core planning problem.

See [PRODUCTION_READINESS_PLAN.md](PRODUCTION_READINESS_PLAN.md) for the current product assessment, implemented improvements, release criteria, and delivery record. [PROJECT_PLAN.md](PROJECT_PLAN.md) remains the original staged build plan.

## MVP scope

The first serious version will include:

- A Germany roadmap form and personalized structured result
- A document checklist, timeline, next 10 actions, and common mistakes
- Official resources to verify
- A pasted-text document explainer
- A professional email draft generator
- A curated knowledge base with official resources and verification dates
- An all-in-one hub: university and course explorer, deadline tracker, finance planner, shortlist, and guides
- Safety language and disclaimers on high-risk topics

Explicitly deferred: authentication, file upload, payments, mobile apps, heavy RAG, and broad product modules outside the MVP.

## Repository structure

```text
clearpath-germany/
|-- frontend/
|   |-- app/
|   |   |-- layout.tsx
|   |   |-- page.tsx
|   |   |-- explore/           (university and course explorer + detail pages)
|   |   |-- deadlines/         (deadline tracker)
|   |   |-- finance/           (cost and budget planner)
|   |   |-- hub/               (unified journey dashboard)
|   |   |-- shortlist/         (saved programs and checklists)
|   |   |-- guides/            (guides, FAQ, glossary)
|   |   |-- search/            (global search)
|   |   |-- roadmap/
|   |   |-- roadmap-result/
|   |   |-- explain/
|   |   `-- explain-result/
|   |-- components/            (Header, ShortlistButton, VerifiedNote, SiteFooter)
|   |-- lib/                   (api, catalog, storage, content)
|   |-- styles/
|   |-- package.json
|   |-- package-lock.json
|   |-- README.md
|   `-- .env.example
|-- backend/
|   |-- app/
|   |   |-- routes/            (health, catalog)
|   |   |-- services/          (catalog)
|   |   |-- models/            (health, catalog)
|   |   |-- data/              (universities.json, programs.json, cost_of_living.json)
|   |   |   `-- knowledge/
|   |   |-- db/
|   |   `-- prompts/
|   |-- tests/                 (test_health, test_catalog)
|   |   `-- fixtures/
|   |       |-- roadmap/
|   |       `-- explain/
|   |-- requirements.txt
|   |-- README.md
|   `-- .env.example
|-- PROJECT_PLAN.md
|-- README.md
`-- .gitignore
```

Placeholder `.gitkeep` files preserve empty directories until their corresponding build section begins.

## Planned technology

- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: FastAPI, Python
- Database: Supabase Postgres (added in section 18)
- Knowledge base: hand-maintained JSON with official links (added in section 9)
- AI: Replaceable LLM provider wrapper (added after the mock end-to-end flow works)
- Authentication: deferred until it is required

## Frontend/backend communication

During local development, the Next.js frontend will run at `http://localhost:3000` and FastAPI will run at `http://localhost:8000`.

1. The browser submits a typed JSON request to a frontend API client.
2. The client sends the request to `${NEXT_PUBLIC_API_BASE_URL}/api/...`.
3. FastAPI validates the request and runs the relevant roadmap or document-explainer pipeline.
4. FastAPI returns structured JSON; the frontend renders it as cards and action lists.
5. Only the backend may access LLM credentials and, later, Supabase service credentials.

The initial API surface will be:

```text
GET  /api/health
GET  /api/universities
GET  /api/universities/{id}
GET  /api/programs
GET  /api/programs/{id}
GET  /api/deadlines
GET  /api/cost-of-living
POST /api/roadmap/generate
POST /api/explain
POST /api/feedback
```

The `GET` catalog endpoints and deterministic roadmap/explainer `POST` endpoints are implemented. The feedback endpoint remains planned.

The backend will allow the configured `FRONTEND_ORIGIN` through CORS. In v0, the browser will not query the database directly. This keeps secrets and safety checks on the server and leaves the LLM provider replaceable.

## Environment setup

No real credentials belong in committed files. Copy each example locally when its runtime is introduced:

```powershell
Copy-Item frontend/.env.example frontend/.env.local
Copy-Item backend/.env.example backend/.env
```

`frontend/.env.local` may contain only browser-safe configuration. LLM and future database secrets belong only in `backend/.env`. The local environment files are ignored by Git.

## Run the backend

Section 2 adds a runnable FastAPI service. From the repository root:

```powershell
cd backend
python -m venv .venv
.venv\Scripts\python.exe -m pip install -r requirements.txt
Copy-Item .env.example .env
.venv\Scripts\python.exe -m uvicorn app.main:app --reload --env-file .env --host 127.0.0.1 --port 8000
```

See [backend/README.md](backend/README.md) for its endpoint and test commands.

## Run the frontend

From the repository root:

```powershell
cd frontend
npm.cmd install
Copy-Item .env.example .env.local
npm.cmd run dev
```

Open `http://localhost:3000`. See [frontend/README.md](frontend/README.md) for lint, typecheck, build, and production test commands.

## Section 1 quick test

From the repository root in PowerShell:

```powershell
Get-ChildItem -Recurse -Force | Select-Object FullName
Test-Path frontend/.env.example
Test-Path backend/.env.example
Select-String -Path frontend/.env.example -Pattern "NEXT_PUBLIC_API_BASE_URL"
Select-String -Path backend/.env.example -Pattern "FRONTEND_ORIGIN"
```

The two `Test-Path` commands should return `True`, and both environment variable searches should return one match.

## Safety baseline

- Treat visa, APS, financial proof, work authorization, residence, deadlines, insurance, and admission eligibility as high-risk topics.
- Use cautious language and direct users to verify changing requirements with the relevant official source.
- Never promise admission, eligibility, visa approval, or work authorization.
- If an official fact cannot be verified inside the system, say so explicitly.
- Ask users to remove personal details before pasting a document or email.