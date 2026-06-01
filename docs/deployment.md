# Deployment Guide

## Frontend (Vercel)

1. Sign in to [Vercel](https://vercel.com/) and create a new project.
2. Link the repository and set the root directory to `frontend/`.
3. Configure environment variables:
   - `NEXT_PUBLIC_API_URL` = `https://your-render-backend-url.onrender.com`
4. Deploy the project.

### Vercel configuration

The frontend uses `frontend/package.json` and `frontend/next.config.ts` automatically. No additional build command is required beyond the default `npm run build`.

## Backend (Render)

1. Sign in to [Render](https://render.com/) and create a new web service.
2. Set the environment to `Python`, and connect the repository.
3. Use the `backend/render.yaml` configuration or set:
   - `Build Command`: `pip install -r backend/requirements.txt`
   - `Start Command`: `uvicorn app.main:app --host 0.0.0.0 --port 8000`
4. Set environment variables in Render:
   - `BACKEND_PORT=8000`
   - `BACKEND_HOST=0.0.0.0`
   - `ALLOWED_ORIGINS=https://your-vercel-app.vercel.app,http://localhost:3000`

## Local development

### Start frontend

```bash
cd frontend
npm install
npm run dev
```

### Start backend

```bash
cd backend
python -m pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Notes

- Ensure `NEXT_PUBLIC_API_URL` points to the backend base URL.
- The backend automatically exposes Swagger UI at `/docs`.
- Keep sensitive values out of source control by using environment variables.
