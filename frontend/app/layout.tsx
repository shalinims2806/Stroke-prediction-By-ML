import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Early Stroke Risk Prediction | AI Healthcare Platform',
  description: 'Professional stroke risk prediction platform with explainability, analytics, and modern healthcare UI.',
  keywords: ['stroke prediction', 'healthcare AI', 'FastAPI', 'Next.js', 'machine learning', 'SHAP', 'medical analytics'],
  openGraph: {
    title: 'Early Stroke Risk Prediction Platform',
    description: 'Predict stroke risk with a production-ready AI healthcare platform built for portfolios and deployment.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Early Stroke Risk Prediction Platform',
    description: 'Predict stroke risk with explainable AI and interactive analytics.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-surface text-white antialiased selection:bg-brand/40 selection:text-white">
        {children}
      </body>
    </html>
  )
}
