from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field, conint, confloat


class Gender(str, Enum):
    male = 'Male'
    female = 'Female'
    other = 'Other'


class MarriedStatus(str, Enum):
    yes = 'Yes'
    no = 'No'


class WorkType(str, Enum):
    private = 'Private'
    self_employed = 'Self-employed'
    govt_job = 'Govt_job'
    children = 'Children'
    never_worked = 'Never_worked'


class ResidenceType(str, Enum):
    urban = 'Urban'
    rural = 'Rural'


class SmokingStatus(str, Enum):
    formerly_smoked = 'formerly smoked'
    never_smoked = 'never smoked'
    smokes = 'smokes'
    unknown = 'unknown'


class PredictionRequest(BaseModel):
    gender: Gender
    age: conint(ge=18, le=120)
    hypertension: conint(ge=0, le=1)
    heart_disease: conint(ge=0, le=1)
    ever_married: MarriedStatus
    work_type: WorkType
    residence_type: ResidenceType
    avg_glucose_level: confloat(ge=40.0, le=300.0)
    bmi: confloat(ge=10.0, le=60.0)
    smoking_status: SmokingStatus
    patient_name: Optional[str] = None
    patient_id: Optional[str] = None
    contact_email: Optional[str] = None
    visit_reason: Optional[str] = None


class FeatureContribution(BaseModel):
    feature: str
    contribution: float
    impact: str


class PredictionResponse(BaseModel):
    strokeRisk: float = Field(..., description='Predicted stroke risk percentage')
    confidenceScore: float = Field(..., description='Confidence score as percentage')
    riskCategory: str = Field(..., description='Risk category label')
    topFactor: str = Field(..., description='Top contributing factor')
    summary: str = Field(..., description='Human readable explanation')
    featureContributions: list[FeatureContribution]


class HealthResponse(BaseModel):
    status: str
    version: str


class ModelInfoResponse(BaseModel):
    algorithm: str
    selected_features: list[str]
    version: str
    trained_on: str
    metrics: dict[str, float]


class ConditionCount(BaseModel):
    condition: str
    count: int


class RecentPatientSummary(BaseModel):
    patientName: str
    riskCategory: str
    riskScore: float
    registeredAt: str


class PlatformMetricsResponse(BaseModel):
    totalPredictions: int
    totalRegistrations: int
    averageRisk: float
    highRiskShare: float
    riskDistribution: dict[str, int]
    topConditions: list[ConditionCount]
    recentPatientSummaries: list[RecentPatientSummary]
