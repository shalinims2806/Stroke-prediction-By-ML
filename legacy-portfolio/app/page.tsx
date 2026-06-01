'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import SkillsSection from '@/components/sections/SkillsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import EnterpriseProjectsSection from '@/components/sections/EnterpriseProjectsSection'
import CertificationsSection from '@/components/sections/CertificationsSection'
import EducationSection from '@/components/sections/EducationSection'
import ContactSection from '@/components/sections/ContactSection'

const CursorGlow = dynamic(() => import('@/components/ui/CursorGlow'), { ssr: false })
const ParticleBackground = dynamic(() => import('@/components/ui/ParticleBackground'), { ssr: false })
const LoadingScreen = dynamic(() => import('@/components/ui/LoadingScreen'), { ssr: false })

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      {!isLoading && (
        <main className="relative min-h-screen bg-[#000000] overflow-x-hidden">
          <CursorGlow />
          <ParticleBackground />
          <Navigation />
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <EnterpriseProjectsSection />
          <CertificationsSection />
          <EducationSection />
          <ContactSection />
          <Footer />
        </main>
      )}
    </>
  )
}
