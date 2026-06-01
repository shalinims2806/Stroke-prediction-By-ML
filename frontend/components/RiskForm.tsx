'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { Loader2, Sparkles } from 'lucide-react'
import { PredictionRequest } from '@/lib/types'

type FieldOption = string | { value: number | string; label: string }

type FieldConfig = {
  name: keyof PredictionRequest
  label: string
  type: 'select' | 'number' | 'text'
  options?: FieldOption[]
  min?: number
  max?: number
  step?: number
}

const patientFields: FieldConfig[] = [
  { name: 'patient_name', label: 'Patient name', type: 'text' },
  { name: 'patient_id', label: 'Patient ID', type: 'text' },
  { name: 'contact_email', label: 'Contact email', type: 'text' },
  { name: 'visit_reason', label: 'Reason for visit', type: 'text' },
]

const clinicalFields: FieldConfig[] = [
  { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
  { name: 'age', label: 'Age', type: 'number', min: 18, max: 120 },
  { name: 'hypertension', label: 'Hypertension', type: 'select', options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Yes' },
    ] },
  { name: 'heart_disease', label: 'Heart disease', type: 'select', options: [
      { value: 0, label: 'No' },
      { value: 1, label: 'Yes' },
    ] },
  { name: 'ever_married', label: 'Ever married', type: 'select', options: ['Yes', 'No'] },
  { name: 'work_type', label: 'Work type', type: 'select', options: ['Private', 'Self-employed', 'Govt_job', 'Children', 'Never_worked'] },
  { name: 'residence_type', label: 'Residence type', type: 'select', options: ['Urban', 'Rural'] },
  { name: 'avg_glucose_level', label: 'Average glucose level', type: 'number', min: 50, max: 300, step: 0.1 },
  { name: 'bmi', label: 'BMI', type: 'number', min: 10, max: 60, step: 0.1 },
  { name: 'smoking_status', label: 'Smoking status', type: 'select', options: ['formerly smoked', 'never smoked', 'smokes', 'unknown'] },
]

const initialState: PredictionRequest = {
  patient_name: '',
  patient_id: '',
  contact_email: '',
  visit_reason: '',
  gender: 'Male',
  age: 45,
  hypertension: 0,
  heart_disease: 0,
  ever_married: 'Yes',
  work_type: 'Private',
  residence_type: 'Urban',
  avg_glucose_level: 100,
  bmi: 24.5,
  smoking_status: 'never smoked',
}

interface RiskFormProps {
  onSubmit: (payload: PredictionRequest) => Promise<void>
  loading: boolean
}

export function RiskForm({ onSubmit, loading }: RiskFormProps) {
  const [state, setState] = useState<PredictionRequest>(initialState)

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: FieldConfig) {
    const value = field.type === 'number' || field.name === 'hypertension' || field.name === 'heart_disease'
      ? Number(event.target.value)
      : event.target.value

    setState((current) => ({
      ...current,
      [field.name]: value,
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await onSubmit(state)
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_20px_70px_rgba(8,15,41,0.25)]">
      <div className="flex flex-col gap-3 rounded-3xl bg-slate-950/80 p-5 sm:flex-row sm:items-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-brand/10 text-brand">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-brand">Patient registration</p>
          <p className="text-sm text-slate-400">Capture patient metadata before generating personalized stroke risk insights.</p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {patientFields.map((field) => (
          <div key={field.name as string} className="space-y-2">
            <label htmlFor={field.name as string} className="block text-sm font-semibold text-slate-300">{field.label}</label>
            <input
              id={field.name as string}
              name={field.name as string}
              type={field.type}
              value={(state as any)[field.name] ?? ''}
              onChange={(event) => handleChange(event, field)}
              className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              placeholder={field.label}
            />
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6">
        <p className="text-sm uppercase tracking-[0.24em] text-brand">Clinical profile</p>
        <p className="mt-2 text-sm text-slate-400">Use the medical inputs to drive the risk prediction and platform analytics.</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {clinicalFields.map((field) => (
            <div key={field.name as string} className="space-y-2">
              <label htmlFor={field.name as string} className="block text-sm font-semibold text-slate-300">{field.label}</label>
              {field.type === 'select' ? (
                <select
                  id={field.name as string}
                  name={field.name as string}
                  value={(state as any)[field.name]}
                  onChange={(event) => handleChange(event, field)}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                >
                  {field.options?.map((option) => {
                    const optionValue = typeof option === 'string' ? option : option.value
                    const optionLabel = typeof option === 'string' ? option : option.label
                    return (
                      <option key={String(optionValue)} value={optionValue}>
                        {optionLabel}
                      </option>
                    )
                  })}
                </select>
              ) : (
                <input
                  id={field.name as string}
                  name={field.name as string}
                  type={field.type}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={(state as any)[field.name]}
                  onChange={(event) => handleChange(event, field)}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 inline-flex w-full items-center justify-center rounded-3xl bg-brand px-6 py-4 text-base font-semibold text-surface transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
        {loading ? 'Predicting risk...' : 'Generate prediction'}
      </button>
    </form>
  )
}
