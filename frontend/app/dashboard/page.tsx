'use client'

import { useEffect, useState } from 'react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import jsPDF from 'jspdf'
import { Download, Sparkles, ShieldCheck, HeartPulse } from 'lucide-react'
import { RiskForm } from '@/components/RiskForm'
import { fetchPlatformMetrics, predictStrokeRisk } from '@/lib/api'
import { PredictionRequest, PredictionResponse, PlatformMetrics } from '@/lib/types'
import { classNames, riskCategories } from '@/lib/utils'

const analyticsData = {
  ageRisk: [
    { age: '18-29', stroke: 1.4 },
    { age: '30-39', stroke: 2.8 },
    { age: '40-49', stroke: 7.5 },
    { age: '50-59', stroke: 13.1 },
    { age: '60+', stroke: 19.8 },
  ],
  bmiDistribution: [
    { category: 'Underweight', value: 9 },
    { category: 'Normal', value: 34 },
    { category: 'Overweight', value: 31 },
    { category: 'Obese', value: 26 },
  ],
  glucoseImpact: [
    { range: '< 90', stroke: 3.4 },
    { range: '90-120', stroke: 8.8 },
    { range: '120-150', stroke: 16.7 },
    { range: '150+', stroke: 28.3 },
  ],
  smokingImpact: [
    { status: 'Never', value: 11 },
    { status: 'Former', value: 18 },
    { status: 'Smokes', value: 24 },
  ],
}

const chartTooltipStyles = {
  background: 'rgba(15, 23, 42, 0.96)',
  border: '1px solid rgba(148, 163, 184, 0.15)',
  color: '#f8fafc',
}

type PredictionResult = PredictionResponse & Partial<PredictionRequest>

export default function DashboardPage() {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [platformMetrics, setPlatformMetrics] = useState<PlatformMetrics | null>(null)
  const [metricsError, setMetricsError] = useState('')

  useEffect(() => {
    loadMetrics()
  }, [])

  async function loadMetrics() {
    try {
      const metrics = await fetchPlatformMetrics()
      setPlatformMetrics(metrics)
      setMetricsError('')
    } catch (err) {
      setMetricsError('Unable to load analytics metrics. Backend or network may be unavailable.')
    }
  }

  async function handlePredict(payload: PredictionRequest) {
    setLoading(true)
    setError('')
    try {
      const result = await predictStrokeRisk(payload)
      setPrediction({ ...result, ...payload })
      await loadMetrics()
    } catch (err) {
      setError('Unable to fetch prediction. Please verify the backend endpoint and try again.')
    } finally {
      setLoading(false)
    }
  }

  function downloadDetailReport() {
    if (!prediction) return

    const doc = new jsPDF({ unit: 'pt', format: 'letter' })
    const createdAt = new Date().toLocaleString()
    doc.setFontSize(22)
    doc.text('Stroke Risk Prediction Report', 40, 50)
    doc.setFontSize(11)
    doc.text(`Generated: ${createdAt}`, 40, 80)
    doc.text(`Patient: ${prediction.patient_name ?? 'Anonymous'}`, 40, 100)
    if (prediction.patient_id) doc.text(`Patient ID: ${prediction.patient_id}`, 40, 116)
    if (prediction.contact_email) doc.text(`Contact: ${prediction.contact_email}`, 40, 132)
    if (prediction.visit_reason) doc.text(`Reason: ${prediction.visit_reason}`, 40, 148)
    doc.setFontSize(13)
    doc.text(`Risk category: ${prediction.riskCategory} (${prediction.strokeRisk}%)`, 40, 180)
    doc.text(`Confidence score: ${prediction.confidenceScore}%`, 40, 198)
    doc.text(`Top factor: ${prediction.topFactor}`, 40, 216)
    doc.setFontSize(11)
    doc.text('Summary:', 40, 246)
    doc.text(prediction.summary, 40, 262, { maxWidth: 520 })
    let y = 320
    prediction.featureContributions.forEach((item) => {
      doc.text(`- ${item.feature}: ${item.contribution}% — ${item.impact}`, 40, y, { maxWidth: 520 })
      y += 18
    })
    doc.save(`stroke-risk-report-${Date.now()}.pdf`)
  }

  return (
    <main className="min-h-screen bg-surface px-6 py-10 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand">Risk prediction dashboard</p>
              <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Predict stroke risk with confidence and explainability</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Complete the clinical profile and review a risk score, confidence rating, and SHAP-style feature contribution summary. Export a report after every prediction.</p>
            </div>
            <div className="inline-flex items-center rounded-3xl border border-white/10 bg-white/10 px-5 py-3 text-sm text-slate-200">
              <ShieldCheck className="mr-2 h-5 w-5 text-brand" />
              HIPAA-style secure risk assessment
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[0.95fr_0.65fr]">
          <div className="space-y-8">
            <RiskForm onSubmit={handlePredict} loading={loading} />

            {error ? (
              <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-red-100">{error}</div>
            ) : null}

            {prediction ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.3)]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-brand">Prediction result</p>
                    <h2 className="mt-3 text-3xl font-semibold text-white">{prediction.riskCategory} risk</h2>
                    <p className="mt-2 text-base leading-7 text-slate-300">{prediction.summary}</p>
                  </div>
                  <div className={classNames('rounded-3xl px-5 py-4 text-sm font-semibold', prediction.riskCategory === 'High Risk' ? 'bg-red-500/15 text-red-200' : prediction.riskCategory === 'Medium Risk' ? 'bg-yellow-400/10 text-amber-200' : 'bg-emerald-500/10 text-emerald-200')}>
                    {prediction.riskCategory}
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Stroke risk</p>
                    <p className="mt-3 text-4xl font-semibold text-white">{prediction.strokeRisk}%</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Confidence</p>
                    <p className="mt-3 text-4xl font-semibold text-white">{prediction.confidenceScore}%</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Top factor</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{prediction.topFactor}</p>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Patient</p>
                    <p className="mt-3 text-xl font-semibold text-white">{prediction.patient_name || 'Anonymous'}</p>
                    {prediction.contact_email ? <p className="mt-2 text-sm text-slate-400">{prediction.contact_email}</p> : null}
                    {prediction.visit_reason ? <p className="mt-2 text-sm text-slate-400">{prediction.visit_reason}</p> : null}
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Clinical profile</p>
                    <p className="mt-3 text-sm text-slate-200">Age: {prediction.age}</p>
                    <p className="mt-1 text-sm text-slate-200">BMI: {prediction.bmi}</p>
                    <p className="mt-1 text-sm text-slate-200">Glucose: {prediction.avg_glucose_level}</p>
                  </div>
                </div>

                <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-brand">Feature contribution</p>
                      <p className="mt-2 text-sm text-slate-400">Understand the clinical signals that drove the output.</p>
                    </div>
                    <button
                      type="button"
                      onClick={downloadDetailReport}
                      className="inline-flex items-center gap-2 rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-surface transition hover:bg-brand-600"
                    >
                      <Download className="h-4 w-4" />
                      Download report
                    </button>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {prediction.featureContributions.map((item) => (
                      <div key={item.feature} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                        <p className="text-sm text-slate-400">{item.feature}</p>
                        <p className="mt-2 text-xl font-semibold text-white">{item.contribution}%</p>
                        <p className="mt-1 text-sm text-slate-400">{item.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <aside className="space-y-8">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow">
              <div className="flex items-center gap-3">
                <HeartPulse className="h-6 w-6 text-brand" />
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-brand">Platform analytics</p>
                  <p className="mt-2 text-xl font-semibold text-white">Usage metrics</p>
                </div>
              </div>

              {metricsError ? (
                <div className="mt-6 rounded-3xl border border-orange-500/20 bg-orange-500/10 p-4 text-sm text-orange-100">{metricsError}</div>
              ) : null}

              {platformMetrics ? (
                <div className="mt-6 space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                      <p className="text-sm text-slate-400">Predictions processed</p>
                      <p className="mt-3 text-2xl font-semibold text-white">{platformMetrics.totalPredictions}</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                      <p className="text-sm text-slate-400">Registered patients</p>
                      <p className="mt-3 text-2xl font-semibold text-white">{platformMetrics.totalRegistrations}</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                      <p className="text-sm text-slate-400">Average risk</p>
                      <p className="mt-3 text-2xl font-semibold text-white">{platformMetrics.averageRisk}%</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                      <p className="text-sm text-slate-400">High-risk share</p>
                      <p className="mt-3 text-2xl font-semibold text-white">{platformMetrics.highRiskShare}%</p>
                    </div>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                    <p className="text-sm text-slate-400">Top condition signals</p>
                    <div className="mt-3 space-y-2">
                      {platformMetrics.topConditions.map((condition) => (
                        <div key={condition.condition} className="flex items-center justify-between text-sm text-slate-200">
                          <span>{condition.condition}</span>
                          <span className="font-semibold text-white">{condition.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-300">Loading metrics…</div>
              )}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow">
              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-brand" />
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-brand">Recent platform activity</p>
                  <p className="mt-2 text-xl font-semibold text-white">Patient risk history</p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {platformMetrics?.recentPatientSummaries.length ? (
                  platformMetrics.recentPatientSummaries.map((item) => (
                    <div key={`${item.patientName}-${item.registeredAt}`} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                      <p className="font-semibold text-white">{item.patientName}</p>
                      <p className="mt-1 text-sm text-slate-400">{item.riskCategory} — {item.riskScore}%</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{new Date(item.registeredAt).toLocaleString()}</p>
                    </div>
                  ))
                ) : (
                  <p className="mt-4 text-sm text-slate-400">No recent patient records available yet.</p>
                )}
              </div>
            </div>
          </aside>
        </div>

        <section className="grid gap-8 xl:grid-cols-2 xl:gap-10">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-brand">Age analysis</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Age vs. stroke probability</h2>
              </div>
              <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand">Insight</span>
            </div>
            <div className="mt-8 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData.ageRisk} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="age" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={chartTooltipStyles} labelStyle={{ color: '#94a3b8' }} />
                  <Line type="monotone" dataKey="stroke" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-brand">BMI distribution</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Risk by BMI category</h2>
              </div>
              <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-200">Pattern</span>
            </div>
            <div className="mt-8 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.bmiDistribution} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="category" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={chartTooltipStyles} labelStyle={{ color: '#94a3b8' }} />
                  <Bar dataKey="value" fill="#60a5fa" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="grid gap-8 xl:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow">
            <p className="text-sm uppercase tracking-[0.24em] text-brand">Blood glucose</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Glucose impact on risk</h2>
            <div className="mt-8 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData.glucoseImpact} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="range" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={chartTooltipStyles} labelStyle={{ color: '#94a3b8' }} />
                  <Area type="monotone" dataKey="stroke" stroke="#f59e0b" fill="rgba(245,158,11,0.2)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow">
            <p className="text-sm uppercase tracking-[0.24em] text-brand">Smoking behavior</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Impact of smoking status</h2>
            <div className="mt-8 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip contentStyle={chartTooltipStyles} labelStyle={{ color: '#94a3b8' }} />
                  <Pie
                    data={analyticsData.smokingImpact}
                    dataKey="value"
                    nameKey="status"
                    innerRadius={56}
                    outerRadius={96}
                    paddingAngle={4}
                    stroke="rgba(255,255,255,0.08)"
                  >
                    {analyticsData.smokingImpact.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#22c55e', '#f59e0b', '#ef4444'][index % 3]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
