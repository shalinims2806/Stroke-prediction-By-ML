import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shalini M | Zoho Developer & Full Stack Engineer',
  description: 'Motivated software professional specializing in Zoho development, full-stack applications, and AI-powered automation solutions. Based in TamilNadu, India.',
  keywords: ['Zoho Developer', 'Full Stack Developer', 'React', 'TypeScript', 'Portfolio', 'Shalini M', 'Zoho Creator', 'Python', 'Java'],
  authors: [{ name: 'Shalini M', url: 'https://linkedin.com/in/shalinim1228' }],
  creator: 'Shalini M',
  openGraph: {
    title: 'Shalini M | Zoho Developer & Full Stack Engineer',
    description: 'Motivated software professional specializing in Zoho development and full-stack applications.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shalini M | Zoho Developer & Full Stack Engineer',
    description: 'Motivated software professional specializing in Zoho development and full-stack applications.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="bg-[#000000] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
