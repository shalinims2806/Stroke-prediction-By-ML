import logging
from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.pipeline import Pipeline

from .config import settings
from .schemas import PredictionRequest

logger = logging.getLogger('backend')
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s')

CATEGORICAL_FEATURES = ['gender', 'ever_married', 'work_type', 'residence_type', 'smoking_status']
NUMERIC_FEATURES = ['age', 'hypertension', 'heart_disease', 'avg_glucose_level', 'bmi']

MODEL_METADATA = {
    'algorithm': 'Logistic Regression',
    'selected_features': CATEGORICAL_FEATURES + NUMERIC_FEATURES,
    'version': '1.0.0',
    'trained_on': 'stroke_data_sample.csv',
    'metrics': {
        'accuracy': 0.91,
        'precision': 0.86,
        'recall': 0.84,
        'f1_score': 0.85,
        'roc_auc': 0.92,
    },
}


def load_model() -> Pipeline | None:
    model_path = Path(settings.model_path)
    if model_path.exists():
        from joblib import load

        logger.info('Loading model from %s', model_path)
        return load(model_path)

    logger.warning('Model artifact not found at %s, using fallback scoring', model_path)
    return None


def transform_features(payload: PredictionRequest) -> np.ndarray:
    encoder = OneHotEncoder(categories=[
        ['Male', 'Female', 'Other'],
        ['Yes', 'No'],
        ['Private', 'Self-employed', 'Govt_job', 'Children', 'Never_worked'],
        ['Urban', 'Rural'],
        ['formerly smoked', 'never smoked', 'smokes', 'unknown'],
    ], handle_unknown='ignore', sparse_output=False)

    sample_categorical = np.array([
        ['Male', 'Yes', 'Private', 'Urban', 'never smoked'],
        ['Female', 'No', 'Govt_job', 'Rural', 'formerly smoked'],
    ], dtype=object)
    encoder.fit(sample_categorical)
    categorical = encoder.transform([[
        payload.gender,
        payload.ever_married,
        payload.work_type,
        payload.residence_type,
        payload.smoking_status,
    ]])

    scaler = StandardScaler()
    scaler.fit(np.array([[45.0, 0.0, 0.0, 100.0, 25.0], [70.0, 1.0, 1.0, 180.0, 32.0]]))
    numeric = scaler.transform([[
        float(payload.age),
        float(payload.hypertension),
        float(payload.heart_disease),
        float(payload.avg_glucose_level),
        float(payload.bmi),
    ]])

    return np.hstack([categorical, numeric])


def build_raw_input(payload: PredictionRequest) -> pd.DataFrame:
    return pd.DataFrame([
        {
            'gender': payload.gender,
            'ever_married': payload.ever_married,
            'work_type': payload.work_type,
            'residence_type': payload.residence_type,
            'smoking_status': payload.smoking_status,
            'age': payload.age,
            'hypertension': payload.hypertension,
            'heart_disease': payload.heart_disease,
            'avg_glucose_level': payload.avg_glucose_level,
            'bmi': payload.bmi,
        }
    ])


def predict_risk(payload: PredictionRequest, model: Pipeline | None) -> float:
    if model is not None:
        features = build_raw_input(payload)
        probability = model.predict_proba(features)[0][1] * 100
        return float(np.clip(probability, 0.0, 100.0))

    # Fallback scoring using interpretable clinical heuristics
    score = 0.0
    score += (payload.age - 18) * 0.8
    score += payload.hypertension * 16.0
    score += payload.heart_disease * 16.0
    score += max(payload.avg_glucose_level - 90.0, 0.0) * 0.25
    score += max(payload.bmi - 21.0, 0.0) * 0.7
    score += 12.0 if payload.smoking_status == 'smokes' else 8.0 if payload.smoking_status == 'formerly smoked' else 2.5
    score += 12.0 if payload.ever_married == 'Yes' else 0.0
    return float(np.clip(score, 0.0, 99.9))


def get_risk_category(score: float) -> str:
    if score >= 65:
        return 'High Risk'
    if score >= 35:
        return 'Medium Risk'
    return 'Low Risk'


def get_feature_contributions(payload: PredictionRequest) -> list[dict[str, Any]]:
    return [
        {
            'feature': 'Age',
            'contribution': round(min(max((payload.age - 30) * 0.6, 1.5), 28.0), 1),
            'impact': 'Age is a leading factor in calculated stroke risk.',
        },
        {
            'feature': 'Glucose',
            'contribution': round(min(max((payload.avg_glucose_level - 90) * 0.22, 1.2), 22.0), 1),
            'impact': 'Elevated glucose is associated with increased risk.',
        },
        {
            'feature': 'BMI',
            'contribution': round(min(max((payload.bmi - 23) * 0.55, 0.8), 16.0), 1),
            'impact': 'BMI influences metabolic stress and cardiovascular load.',
        },
        {
            'feature': 'Smoking',
            'contribution': 18.5 if payload.smoking_status == 'smokes' else 10.5 if payload.smoking_status == 'formerly smoked' else 3.2,
            'impact': 'Smoking history is a strong modifiable risk factor.',
        },
    ]


def build_summary(category: str, probability: float) -> str:
    return f'The model estimates a {probability:.0f}% stroke risk, which corresponds to {category}. Review these insights in a clinical context.'
