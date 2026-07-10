# ClearPath Germany frontend

This directory contains the Next.js App Router frontend. Alongside the landing page, it provides the all-in-one hub: `/explore` (university and course explorer plus detail pages), `/deadlines`, `/finance`, `/hub`, `/shortlist`, `/guides`, and `/search`.

These pages read from the backend catalog API using `lib/catalog.ts`, so start the backend (see `backend/README.md`) before using them. Personalization (shortlist, checklists, saved deadlines, journey progress) is stored in the browser via `lib/storage.ts`.

The `/roadmap` and `/explain` links intentionally point to routes scheduled for later sections and are not implemented yet.

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

