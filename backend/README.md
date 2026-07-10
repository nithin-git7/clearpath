# ClearPath Germany backend

This directory contains the FastAPI service. It exposes a health check and the read-only catalog API (universities, programs, deadlines, and cost-of-living) backed by the curated datasets in `app/data/`.

## Setup

Run these commands from the repository root in PowerShell:

```powershell
cd backend
python -m venv .venv
.venv\Scripts\python.exe -m pip install -r requirements.txt
Copy-Item .env.example .env
```

Using the virtual environment's Python directly avoids PowerShell activation-policy problems.

## Run

From `backend/`:

```powershell
.venv\Scripts\python.exe -m uvicorn app.main:app --reload --env-file .env --host 127.0.0.1 --port 8000
```

The service will expose:

- Health check: `http://127.0.0.1:8000/api/health`
- Catalog: `http://127.0.0.1:8000/api/universities`, `/api/programs`, `/api/deadlines`, `/api/cost-of-living`
- Interactive API docs: `http://127.0.0.1:8000/docs`

## Quick test

With the server running:

```powershell
Invoke-RestMethod http://127.0.0.1:8000/api/health
```

Expected JSON fields:

```json
{
  "status": "ok",
  "service": "ClearPath Germany API",
  "version": "0.1.0",
  "environment": "development"
}
```

Run the automated tests from `backend/`:

```powershell
python -m unittest discover -s tests -v
```

