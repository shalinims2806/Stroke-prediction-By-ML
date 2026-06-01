# Early Stroke Risk Prediction Platform

[![Vercel](https://img.shields.io/badge/deploy-vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)
[![Python](https://img.shields.io/badge/python-3.12-blue?logo=python)](https://www.python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)

A production-ready healthcare AI platform for early stroke risk assessment.

The repository contains two separate projects:

- `frontend/` — Next.js 15 production UI with a modern landing page, prediction dashboard, analytics, and explainability.
- `backend/` — FastAPI service for stroke risk prediction with validation, health checks, and model metadata.

## Features

- Modern AI healthcare landing page and dashboard
- Predict stroke risk from clinical profile inputs with patient onboarding
- SHAP-style feature contribution explanations
- Interactive analytics with Recharts and platform metrics
- PDF report generation for each risk assessment
- Google Sheets integration for patient event logging
- Professional glassmorphism UI and dark theme
- FastAPI backend with validation and security headers
- Deployment-ready for Vercel frontend and Render backend
- GitHub Actions CI for frontend build and backend validation

## Repository layout

- `frontend/` — Next.js application
- `backend/` — FastAPI application
- `model/` — ML pipeline and artifact support
- `dataset/` — Sample dataset and dataset documentation
- `docs/` — Architecture, deployment, and API guides
- `legacy-portfolio/` — Archived older portfolio project

## Local setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m pip install --upgrade pip
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Environment variables

Copy the example file and update the backend URL and optional Google Sheets webhook:

```bash
copy .env.example .env
```

Then set:

- `NEXT_PUBLIC_API_URL` to your backend address
- `GOOGLE_SHEETS_WEBHOOK_URL` to a Google Apps Script webhook or webhook endpoint for patient event logging

## Deployment

Refer to the deployment guide in `docs/deployment.md`.

## API reference

Open `docs/api.md` for endpoint details and example payloads.

## Notes

The backend uses a fallback risk scoring method if a pre-trained model artifact is unavailable. For true production deployment, train and store a model artifact in `model/artifacts/best_model.pkl`.
