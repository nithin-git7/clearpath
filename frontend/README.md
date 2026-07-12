# ClearPath Germany frontend

This directory contains the Next.js App Router frontend. The production surface includes the situation-led home page, Application Control Room (`/hub`), program explorer and detail pages, shortlist, comparison, deadline tracker, itemized finance planner, personalized roadmap, document explainer, guides, and global search.

These pages read from the backend catalog API using `lib/catalog.ts`, so start the backend (see `backend/README.md`) before using them. Personalization (shortlist, checklists, saved deadlines, journey progress) is stored in the browser via `lib/storage.ts`.

Changing or high-risk information is presented with cautious wording, a verification date, and an official source. Device-local progress is intentionally private by default; clearing browser storage clears saved progress.

## Setup

From the repository root in PowerShell:

```powershell
cd frontend
npm.cmd install
Copy-Item .env.example .env.local
```

## Run

From `frontend/`:

```powershell
npm.cmd run dev
```

Open `http://localhost:3000`.

## Quality checks

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd audit
```

The production server can be tested after a build:

```powershell
npm.cmd run start
Invoke-WebRequest http://127.0.0.1:3000 -UseBasicParsing
```

