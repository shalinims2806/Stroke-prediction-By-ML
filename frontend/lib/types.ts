export interface PredictionRequest {
  gender: 'Male' | 'Female' | 'Other'
  age: number
  hypertension: 0 | 1
  heart_disease: 0 | 1
  ever_married: 'Yes' | 'No'
  work_type: 'Private' | 'Self-employed' | 'Govt_job' | 'Children' | 'Never_worked'
  residence_type: 'Urban' | 'Rural'
  avg_glucose_level: number
  bmi: number
  smoking_status: 'formerly smoked' | 'never smoked' | 'smokes' | 'unknown'
  patient_name?: string
  patient_id?: string
  contact_email?: string
  visit_reason?: string
}

export interface FeatureContribution {
  feature: string
  contribution: number
  impact: string
}

export interface PredictionResponse {
  strokeRisk: number
  confidenceScore: number
  riskCategory: string
  topFactor: string
  summary: string
  featureContributions: FeatureContribution[]
}

export interface ConditionCount {
  condition: string
  count: number
}

export interface RecentPatientSummary {
  patientName: string
  riskCategory: string
  riskScore: number
  registeredAt: string
}

export interface PlatformMetrics {
  totalPredictions: number
  totalRegistrations: number
  averageRisk: number
  highRiskShare: number
  riskDistribution: { 'Low Risk': number; 'Medium Risk': number; 'High Risk': number }
  topConditions: ConditionCount[]
  recentPatientSummaries: RecentPatientSummary[]
}
