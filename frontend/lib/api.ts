import { PredictionRequest, PredictionResponse, PlatformMetrics } from './types'

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export async function predictStrokeRisk(payload: PredictionRequest): Promise<PredictionResponse> {
  const response = await fetch(`${baseUrl}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const payloadText = await response.text()
    throw new Error(`Prediction API error: ${response.status} ${payloadText}`)
  }

  return response.json()
}

export async function fetchPlatformMetrics(): Promise<PlatformMetrics> {
  const response = await fetch(`${baseUrl}/platform-metrics`)

  if (!response.ok) {
    const payloadText = await response.text()
    throw new Error(`Metrics API error: ${response.status} ${payloadText}`)
  }

  return response.json()
}
