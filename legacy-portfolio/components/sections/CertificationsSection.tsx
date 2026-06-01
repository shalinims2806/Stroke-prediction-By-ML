'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, CheckCircle, Shield } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import { cn } from '@/lib/utils'

interface Certification {
  title: string
  issuer: string
  location: string
  period: string
  emoji: string
  color: string
  description: string
}

interface CertificationsSectionProps {
  id?: string
}

const certifications: Certification[] = [
  {
    title: 'Java Full Stack Development',
    issuer: 'Tap Academy',
    location: 'Bangalore, India',
    period: 'Mar 2025 - Aug 2025',
    emoji: '☕',
    color: '#f97316',
    description:
      'Comprehensive training in Java, Spring Boot, React, and full-stack application development.',
  },
  {
    title: 'Zoho CRM Certification',
    issuer: 'Zoho',
    location: 'India',
    period: 'Aug 2025 - Oct 2025',
    emoji: '🔷',
    color: '#00d4ff',
    description:
      'Official Zoho CRM certification covering sales automation, workflows, and CRM customization.',
  },
  {
    title: 'Database Management System',
    issuer: 'NPTEL',
    location: 'India',
    period: 'Mar 2024 - Apr 2024',
    emoji: '🗄️',
    color: '#7c3aed',
    description:
      'NPTEL certified course on database design, SQL, transactions, and DBMS concepts.',
  },
  {
    title: 'Python Certification',
    issuer: 'Aroma Academy',
    location: 'India',
    period: 'Aug 2022 - Mar 2023',
    emoji: '🐍',
    color: '#22c55e',
    description:
      'Python programming fundamentals, data structures, OOP, and application development.',
  },
]

function colorToGlowVariant(color: string): 'cyan' | 'purple' | 'pink' | 'orange' | 'green' {
  if (color === '#f97316') return 'orange'
  if (color === '#00d4ff') return 'cyan'
  if (color === '#7c3aed') return 'purple'
  if (color === '#22c55e') return 'green'
  if (color === '#ec4899') return 'pink'
  return 'cyan'
}

const floatKeyframes = `
@keyframes floatA {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
@keyframes floatB {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-14px); }
}
@keyframes floatC {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
@keyframes floatD {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}
`

const floatAnimations = [
  'floatA 4s ease-in-out infinite',
  'floatB 5s ease-in-out infinite 0.5s',
  'floatC 3.5s ease-in-out infinite 1s',
  'floatD 4.5s ease-in-out infinite 1.5s',
]

export default function CertificationsSection({ id = 'certifications' }: CertificationsSectionProps) {
  return (
    <section id={id} className="py-24 bg-[#050a1a] relative overflow-hidden">
      <style>{floatKeyframes}</style>

      {/* Background decorative blobs */}
      <div
        className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00d4ff, transparent)' }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Certifications
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#00d4ff]" />
            <div className="h-1 w-24 rounded-full bg-gradient-to-r from-[#00d4ff] via-[#7c3aed] to-[#ec4899]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#ec4899]" />
          </div>
          <p className="mt-4 text-[#94a3b8] text-base max-w-xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Verified credentials and professional qualifications earned through dedicated learning.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => {
            const glowVariant = colorToGlowVariant(cert.color)
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
                style={{ animation: floatAnimations[index] }}
              >
                <GlassCard
                  glowColor={glowVariant}
                  hover
                  className="relative p-6 h-full flex flex-col gap-4 overflow-hidden"
                >
                  {/* Top colored stripe */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 opacity-60"
                    style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
                  />

                  {/* Emoji circle */}
                  <div className="flex items-start gap-4">
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                      style={{
                        background: `${cert.color}18`,
                        border: `1.5px solid ${cert.color}40`,
                        boxShadow: `0 0 16px ${cert.color}30`,
                      }}
                    >
                      {cert.emoji}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-lg font-bold text-white leading-tight"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        {cert.title}
                      </h3>

                      {/* Issuer */}
                      <div className="flex items-center gap-1.5 mt-1">
                        <Shield size={13} style={{ color: cert.color }} />
                        <span
                          className="text-sm font-semibold"
                          style={{ color: cert.color, fontFamily: 'Inter, sans-serif' }}
                        >
                          {cert.issuer}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 text-[#94a3b8]">
                      <MapPin size={13} className="flex-shrink-0 text-[#64748b]" />
                      <span className="text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {cert.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#94a3b8]">
                      <Calendar size={13} className="flex-shrink-0 text-[#64748b]" />
                      <span className="text-xs" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {cert.period}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="text-sm text-[#94a3b8] leading-relaxed flex-1"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {cert.description}
                  </p>

                  {/* Verified badge */}
                  <div className="flex justify-end mt-auto pt-2">
                    <div
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{
                        background: `${cert.color}15`,
                        border: `1px solid ${cert.color}40`,
                        color: cert.color,
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      <CheckCircle size={12} />
                      Verified
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
