from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = 'Early Stroke Risk API'
    app_version: str = '1.0.0'
    api_prefix: str = '/api'
    backend_host: str = '0.0.0.0'
    backend_port: int = 8000
    allowed_origins: list[str] = ['*']
    model_path: str = '../model/artifacts/best_model.pkl'
    explainer_path: str = '../model/artifacts/shap_explainer.pkl'
    analytics_path: str = 'app/data/analytics.json'
    google_sheets_webhook_url: str | None = None

    class Config:
        env_file = '.env'
        env_file_encoding = 'utf-8'
        protected_namespaces = ('settings_',)


settings = Settings()
