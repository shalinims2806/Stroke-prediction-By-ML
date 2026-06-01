# Architecture Overview

## System architecture

The Early Stroke Risk Prediction Platform is built as a multi-service application:

- `frontend/` — Next.js 15 App Router UI with TypeScript, Tailwind CSS, Framer Motion, and Recharts.
- `backend/` — FastAPI service providing prediction and health endpoints.
- `model/` — ML pipeline and artifact storage for model training and explainability.
- `dataset/` — Stroke dataset resources and preprocessing documentation.
- `docs/` — Deployment, API, and architecture documentation.

## Component flow

1. The user interacts with the frontend dashboard at `/dashboard`.
2. The frontend sends a POST request to `/predict` on the backend.
3. The backend validates the request with Pydantic and routes the payload through the ML scoring logic.
4. The response returns a stroke risk percentage, confidence score, risk category, and feature contributions.
5. The backend also tracks platform usage and patient registration events, with optional Google Sheets webhook logging.
6. The frontend renders the prediction summary, PDF report export, and analytics for a polished portfolio experience.

## Deployment topology

- Frontend deploys to Vercel as a static/app site.
- Backend deploys to Render as a Python web service.
- Environment variables are managed via Vercel and Render dashboard settings.

## Security and production readiness

- CORS limiting with allowed origins.
- Security headers are injected at runtime.
- Input validation ensures only valid clinical values are accepted.
- The backend gracefully handles prediction errors and returns HTTP status codes.
