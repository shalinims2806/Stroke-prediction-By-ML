import json
import logging
from datetime import datetime
from pathlib import Path
from threading import Lock
from typing import Any

from .config import settings
from .google_sheets import send_patient_summary_to_google_sheets
from .schemas import PredictionRequest

logger = logging.getLogger('backend.analytics')
DATA_LOCK = Lock()
DATA_FILE = Path(settings.analytics_path)


def _ensure_data_file() -> None:
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    if not DATA_FILE.exists():
        DATA_FILE.write_text(json.dumps({'records': []}, indent=2), encoding='utf-8')


def _read_records() -> list[dict[str, Any]]:
    _ensure_data_file()
    try:
        return json.loads(DATA_FILE.read_text(encoding='utf-8')).get('records', [])
    except json.JSONDecodeError:
        logger.warning('Analytics data file is corrupt. Resetting analytics archive.')
        DATA_FILE.write_text(json.dumps({'records': []}, indent=2), encoding='utf-8')
        return []


def _write_records(records: list[dict[str, Any]]) -> None:
    DATA_FILE.write_text(json.dumps({'records': records}, indent=2), encoding='utf-8')


def persist_registration(record: dict[str, Any]) -> None:
    with DATA_LOCK:
        records = _read_records()
        records.append(record)
        _write_records(records)


def build_patient_record(request: PredictionRequest, response: dict[str, Any]) -> dict[str, Any]:
    return {
        'timestamp': datetime.utcnow().isoformat() + 'Z',
        'patient_name': request.patient_name or 'Anonymous',
        'patient_id': request.patient_id,
        'contact_email': request.contact_email,
        'visit_reason': request.visit_reason,
        'gender': request.gender,
        'age': request.age,
        'hypertension': request.hypertension,
        'heart_disease': request.heart_disease,
        'ever_married': request.ever_married,
        'work_type': request.work_type,
        'residence_type': request.residence_type,
        'avg_glucose_level': request.avg_glucose_level,
        'bmi': request.bmi,
        'smoking_status': request.smoking_status,
        'strokeRisk': response['strokeRisk'],
        'confidenceScore': response['confidenceScore'],
        'riskCategory': response['riskCategory'],
        'topFactor': response['topFactor'],
        'summary': response['summary'],
    }


def record_prediction(request: PredictionRequest, response: dict[str, Any]) -> None:
    try:
        record = build_patient_record(request, response)
        persist_registration(record)
        send_patient_summary_to_google_sheets(record)
    except Exception as exc:
        logger.warning('Failed to record platform activity: %s', exc)


def get_platform_metrics() -> dict[str, Any]:
    records = _read_records()
    total_predictions = len(records)
    risk_distribution = {'Low Risk': 0, 'Medium Risk': 0, 'High Risk': 0}
    total_risk_score = 0.0
    registration_count = sum(1 for record in records if record.get('patient_name') or record.get('patient_id') or record.get('contact_email'))

    for record in records:
        risk_category = record.get('riskCategory', 'Low Risk')
        risk_distribution[risk_category] = risk_distribution.get(risk_category, 0) + 1
        total_risk_score += float(record.get('strokeRisk', 0.0))

    average_risk = round(total_risk_score / total_predictions, 1) if total_predictions else 0.0
    high_risk_share = round((risk_distribution['High Risk'] / total_predictions) * 100, 1) if total_predictions else 0.0

    condition_counts = [
        {'condition': 'Hypertension', 'count': sum(1 for record in records if record.get('hypertension') == 1)},
        {'condition': 'Heart disease', 'count': sum(1 for record in records if record.get('heart_disease') == 1)},
        {'condition': 'Current smoker', 'count': sum(1 for record in records if record.get('smoking_status') == 'smokes')},
    ]
    condition_counts.sort(key=lambda item: item['count'], reverse=True)

    recent_patient_summaries = [
        {
            'patientName': record.get('patient_name', 'Anonymous'),
            'riskCategory': record.get('riskCategory', 'Low Risk'),
            'riskScore': float(record.get('strokeRisk', 0.0)),
            'registeredAt': record.get('timestamp', ''),
        }
        for record in records[-5:][::-1]
    ]

    return {
        'totalPredictions': total_predictions,
        'totalRegistrations': registration_count,
        'averageRisk': average_risk,
        'highRiskShare': high_risk_share,
        'riskDistribution': risk_distribution,
        'topConditions': condition_counts,
        'recentPatientSummaries': recent_patient_summaries,
    }
