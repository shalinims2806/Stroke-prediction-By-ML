# API Documentation

## GET /health

Returns the backend health status.

### Response

```json
{
  "status": "ok",
  "version": "1.0.0"
}
```

## GET /metrics

Returns the trained model performance metrics.

### Response

```json
{
  "accuracy": 0.91,
  "precision": 0.86,
  "recall": 0.84,
  "f1_score": 0.85,
  "roc_auc": 0.92
}
```

## GET /model-info

Returns model details and selected features.

### Response

```json
{
  "algorithm": "Logistic Regression",
  "selected_features": ["gender", "ever_married", "work_type", "residence_type", "smoking_status", "age", "hypertension", "heart_disease", "avg_glucose_level", "bmi"],
  "version": "1.0.0",
  "trained_on": "stroke_data_sample.csv",
  "metrics": {
    "accuracy": 0.91,
    "precision": 0.86,
    "recall": 0.84,
    "f1_score": 0.85,
    "roc_auc": 0.92
  }
}
```

## GET /platform-metrics

Returns platform analytics and registration insights.

### Response

```json
{
  "totalPredictions": 12,
  "totalRegistrations": 11,
  "averageRisk": 42.3,
  "highRiskShare": 16.7,
  "riskDistribution": { "Low Risk": 6, "Medium Risk": 4, "High Risk": 2 },
  "topConditions": [
    { "condition": "Hypertension", "count": 5 },
    { "condition": "Heart disease", "count": 3 },
    { "condition": "Current smoker", "count": 2 }
  ],
  "recentPatientSummaries": [
    { "patientName": "Emma Johnson", "riskCategory": "Medium Risk", "riskScore": 48.2, "registeredAt": "2026-05-31T14:28:00Z" }
  ]
}
```

## POST /predict

Request body example:

```json
{
  "gender": "Male",
  "age": 58,
  "hypertension": 0,
  "heart_disease": 1,
  "ever_married": "Yes",
  "work_type": "Private",
  "residence_type": "Urban",
  "avg_glucose_level": 145.2,
  "bmi": 28.5,
  "smoking_status": "formerly smoked",
  "patient_name": "Emma Johnson",
  "patient_id": "PAT-101",
  "contact_email": "emma.johnson@example.com",
  "visit_reason": "Routine cardiovascular risk assessment"
}
```

### Response example

```json
{
  "strokeRisk": 57.4,
  "confidenceScore": 67.4,
  "riskCategory": "Medium Risk",
  "topFactor": "Age",
  "summary": "The model estimates a 57% stroke risk, which corresponds to Medium Risk. Review these insights in a clinical context.",
  "featureContributions": [
    { "feature": "Age", "contribution": 16.0, "impact": "Age is a leading factor in calculated stroke risk." },
    { "feature": "Glucose", "contribution": 13.7, "impact": "Elevated glucose is associated with increased risk." },
    { "feature": "BMI", "contribution": 9.1, "impact": "BMI influences metabolic stress and cardiovascular load." },
    { "feature": "Smoking", "contribution": 10.5, "impact": "Smoking history is a strong modifiable risk factor." }
  ]
}
```
