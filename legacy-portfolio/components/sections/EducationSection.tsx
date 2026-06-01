'use client'

import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import { cn } from '@/lib/utils'

interface EducationEntry {
  degree: string
  short: string
  institution: string
  location: string
  period: string
  focus: string
  color: string
  emoji: string
}

interface EducationSectionProps {
  id?: string
}

const education: EducationEntry[] = [
  {
    degree: 'Master of Computer Applications',
    short: 'MCA',
    institution: 'Vivekanandha Institute of Information and Management Studies',
    location: 'TamilNadu, India',
    period: 'June 2023 - August 2025',
    focus: 'Software Development, Databases, Application Design, Machine Learning',
    color: '#00d4ff',
    emoji: '🎓',
  },
  {
    degree: 'Bachelor of Mathematics',
    short: 'B.Sc Mathematics',
    institution: 'Vivekanandha College of Arts and Science for Women',
    location: 'TamilNadu, India',
    period: 'June 2019 - June 2022',
    focus: 'Pure Mathematics, Statistics, Analytical Thinking, Problem Solving',
    color: '#7c3aed',
    emoji: '📐',
  },
]

function colorToGlowVariant(color: string): 'cyan' | 'purple' | 'pink' | 'orange' | 'green' {
  if (color === '#00d4ff') return 'cyan'
  if (color === '#7c3aed') return 'purple'
  if (color === '#ec4899') return 'pink'
  if (color === '#f97316') return 'orange'
  if (color === '#22c55e') return 'green'
  return 'cyan'
}

export default function EducationSection({ id = 'education' }: EducationSectionProps) {
  return (
    <section id={id} className="py-24 bg-[#000000] relative overflow-hidden">
      {/* Background decorative blobs */}
      <div
        className="absolute top-10 right-0 w-80 h-80 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00d4ff, transparent)' }}
      />
      <div
        className="absolute bottom-10 left-0 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
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
            Education
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#00d4ff]" />
            <div className="h-1 w-24 rounded-full bg-gradient-to-r from-[#00d4ff] via-[#7c3aed] to-[#ec4899]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#ec4899]" />
          </div>
          <p
            className="mt-4 text-[#94a3b8] text-base max-w-xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Academic foundations that shaped a passion for technology, logic, and innovation.
          </p>
        </motion.div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, index) => {
            const glowVariant = colorToGlowVariant(edu.color)
            const focusTags = edu.focus.split(',').map((t) => t.trim())

            return (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: index === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
              >
                <GlassCard
                  glowColor={glowVariant}
                  hover
                  className={cn(
                    'relative p-6 h-full flex flex-col gap-5 overflow-hidden',
                    'border-l-4'
                  )}
                  style={
                    {
                      borderLeftColor: edu.color,
                    } as React.CSSProperties
                  }
                >
                  {/* Top colored stripe */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 opacity-50"
                    style={{
                      background: `linear-gradient(90deg, ${edu.color}, transparent)`,
                    }}
                  />

                  {/* Header: emoji + short degree */}
                  <div className="flex items-center gap-4">
                    <div
                      className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                      style={{
                        background: `${edu.color}15`,
                        border: `1.5px solid ${edu.color}40`,
                        boxShadow: `0 0 20px ${edu.color}25`,
                      }}
                    >
                      {edu.emoji}
                    </div>
                    <div>
                      <span
                        className="text-2xl font-black tracking-wider"
                        style={{
                          fontFamily: 'Orbitron, sans-serif',
                          color: edu.color,
                          textShadow: `0 0 12px ${edu.color}60`,
                        }}
                      >
                        {edu.short}
                      </span>
                      <p
                        className="text-[#64748b] text-xs mt-0.5"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Degree Program
                      </p>
                    </div>
                  </div>

                  {/* Full degree name */}
                  <h3
                    className="text-lg font-bold text-white leading-snug"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {edu.degree}
                  </h3>

                  {/* Institution */}
                  <div className="flex items-start gap-2">
                    <GraduationCap
                      size={15}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: edu.color }}
                    />
                    <span
                      className="text-sm text-[#94a3b8] leading-snug"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {edu.institution}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="flex-shrink-0 text-[#64748b]" />
                    <span
                      className="text-xs text-[#94a3b8]"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {edu.location}
                    </span>
                  </div>

                  {/* Period */}
                  <div className="flex items-center gap-2">
                    <Calendar size={13} className="flex-shrink-0 text-[#64748b]" />
                    <span
                      className="text-xs text-[#94a3b8]"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {edu.period}
                    </span>
                  </div>

                  {/* Focus areas */}
                  <div className="mt-auto">
                    <div className="flex items-center gap-1.5 mb-2">
                      <BookOpen size={13} style={{ color: edu.color }} />
                      <span
                        className="text-xs font-semibold"
                        style={{ color: edu.color, fontFamily: 'Inter, sans-serif' }}
                      >
                        Focus Areas
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {focusTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{
                            background: `${edu.color}12`,
                            border: `1px solid ${edu.color}30`,
                            color: edu.color,
                            fontFamily: 'Inter, sans-serif',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
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
