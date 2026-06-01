export function classNames(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(' ')
}

export const riskCategories = [
  { label: 'Low Risk', description: 'Most likely no imminent stroke event in the short term.' },
  { label: 'Medium Risk', description: 'Monitor clinical risk factors and consider lifestyle interventions.' },
  { label: 'High Risk', description: 'Recommend urgent evaluation and specialist referral.' },
]

export function getRiskCategory(score: number) {
  if (score >= 65) return 'High Risk'
  if (score >= 35) return 'Medium Risk'
  return 'Low Risk'
}
