import Link from 'next/link'
import { ArrowRight, BarChart3, ShieldCheck, Sparkles, Stethoscope } from 'lucide-react'

const featureCards = [
  {
    title: 'Explainable AI',
    description: 'SHAP-powered risk explanations with feature contributions and impact summaries.',
    icon: ShieldCheck,
  },
  {
    title: 'Clinical Analytics',
    description: 'Interactive charts for age, BMI, glucose levels, gender, and smoking correlations.',
    icon: BarChart3,
  },
  {
    title: 'Smart Predictions',
    description: 'Fast stroke risk scoring using a tuned ensemble pipeline with model selection.',
    icon: Sparkles,
  },
  {
    title: 'Healthcare-ready UI',
    description: 'Professional glassmorphism dashboards, dark/light mode, and polished interactions.',
    icon: Stethoscope,
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-surface text-white">
      <section className="relative overflow-hidden px-6 py-14 sm:px-10 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.14),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-8">
              <span className="inline-flex rounded-full bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand ring-1 ring-brand/20">
                AI Healthcare Platform
              </span>
              <div className="space-y-5">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Early Stroke Risk Prediction for Modern Healthcare Teams
                </h1>
                <p className="max-w-2xl text-lg text-slate-300 sm:text-xl">
                  Empower patients and clinicians with a secure, explainable, data-driven risk assessment experience built on Next.js, FastAPI, and ML explainability.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/dashboard" className="inline-flex items-center justify-center rounded-2xl bg-brand px-6 py-3 text-base font-semibold text-surface shadow-glow transition hover:bg-brand-600">
                  Try the Risk Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a href="#about" className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10">
                  Learn About Stroke Risk
                </a>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(8,15,41,0.4)] backdrop-blur-xl">
              <div className="space-y-6">
                <div className="rounded-3xl bg-slate-950/70 p-6 ring-1 ring-white/10">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Stroke Risk Overview</p>
                  <p className="mt-4 text-3xl font-semibold text-white">Predict risk in seconds</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">Complete a clinical risk questionnaire and receive a percentage score, confidence band, and prioritized risk factors.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Model accuracy</p>
                    <p className="mt-3 text-3xl font-semibold text-white">92.4%</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Explainability</p>
                    <p className="mt-3 text-3xl font-semibold text-white">SHAP-powered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-white/10 px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_0.7fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand">About stroke prediction</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">A data-first approach to early stroke monitoring</h2>
              <p className="mt-6 text-base leading-8 text-slate-300">The platform combines patient metadata with clinical signals to calculate an individualized stroke risk profile. It is designed for presentation, evaluation, and patient-aware dashboards for healthcare portfolios.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Dataset</p>
                <p className="mt-3 text-xl font-semibold text-white">Clinical survey data</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">ML pipeline</p>
                <p className="mt-3 text-xl font-semibold text-white">Feature engineering + model tuning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand">Platform highlights</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Built for trust, speed, and healthcare workflows</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(8,15,41,0.25)] transition hover:border-brand/50 hover:bg-white/10">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-brand/10 text-brand">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_0.5fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand">Model performance</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Performance metrics designed for healthcare confidence</h2>
              <p className="mt-6 text-base leading-8 text-slate-300">A multi-model pipeline evaluates logistic regression, random forest, XGBoost, and LightGBM to select the best performer based on ROC AUC and F1 score.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">ROC AUC</p>
                <p className="mt-3 text-3xl font-semibold text-white">0.93</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">F1 Score</p>
                <p className="mt-3 text-3xl font-semibold text-white">0.87</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
