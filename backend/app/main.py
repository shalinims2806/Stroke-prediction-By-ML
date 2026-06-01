from fastapi import Depends, FastAPI, HTTPException, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from .config import settings
from .analytics import get_platform_metrics, record_prediction
from .schemas import HealthResponse, ModelInfoResponse, PlatformMetricsResponse, PredictionRequest, PredictionResponse
from .utils import MODEL_METADATA, build_summary, get_feature_contributions, get_risk_category, load_model, predict_risk

app = FastAPI(
    title=settings.app_name,
    description='Backend API for the Early Stroke Risk Prediction Platform.',
    version=settings.app_version,
)

# CORS configuration - allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=".*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = load_model()


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse({'detail': exc.detail}, status_code=exc.status_code)


@app.get('/health', response_model=HealthResponse, tags=['Health'])
def health() -> HealthResponse:
    return HealthResponse(status='ok', version=settings.app_version)


@app.get('/metrics', tags=['Health'])
def metrics() -> dict[str, float]:
    return MODEL_METADATA['metrics']


@app.get('/model-info', response_model=ModelInfoResponse, tags=['Health'])
def model_info() -> ModelInfoResponse:
    return ModelInfoResponse(
        algorithm=MODEL_METADATA['algorithm'],
        selected_features=MODEL_METADATA['selected_features'],
        version=MODEL_METADATA['version'],
        trained_on=MODEL_METADATA['trained_on'],
        metrics=MODEL_METADATA['metrics'],
    )


@app.get('/platform-metrics', response_model=PlatformMetricsResponse, tags=['Analytics'])
def platform_metrics() -> PlatformMetricsResponse:
    return get_platform_metrics()


@app.post('/predict', response_model=PredictionResponse, tags=['Predictions'])
def predict(request: PredictionRequest):
    try:
        score = predict_risk(request, model)
        category = get_risk_category(score)
        summary = build_summary(category, score)
        contributions = get_feature_contributions(request)
        top_factor = contributions[0]['feature'] if contributions else 'Age'

        response = PredictionResponse(
            strokeRisk=round(score, 1),
            confidenceScore=round(min(max(score + 10.0, 45.0), 99.9), 1),
            riskCategory=category,
            topFactor=top_factor,
            summary=summary,
            featureContributions=[
                {
                    'feature': item['feature'],
                    'contribution': item['contribution'],
                    'impact': item['impact'],
                }
                for item in contributions
            ],
        )
        record_prediction(request, response.model_dump())
        return response
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(exc))
