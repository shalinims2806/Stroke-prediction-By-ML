'use client'

import { motion, useInView } from 'framer-motion'
import { MapPin, Calendar, Briefcase, ChevronRight, Building2, Star, Code2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import GlassCard from '@/components/ui/GlassCard'
import { useRef } from 'react'

interface Experience {
  id: string
  role: string
  company: string
  companyFull: string
  location: string
  duration: string
  type: string
  current: boolean
  color: string
  responsibilities: string[]
  technologies: string[]
}

interface ExperienceSectionProps {
  id?: string
}

const experiences: Experience[] = [
  {
    id: 'zoho-dev-tekydoct',
    role: 'Zoho Developer',
    company: 'TekyDoct',
    companyFull: 'TekyDoct (Zoho Authorized Partner)',
    location: 'Brunei Darussalam',
    duration: 'Nov 2025 - Present',
    type: 'Full-time',
    current: true,
    color: '#00d4ff',
    responsibilities: [
      'Designed and customized business applications using Zoho Creator with forms, workflows, and Deluge scripts',
      'Developed and optimized dashboards and reports using Zoho Analytics for business intelligence',
      'Implemented Zoho Books and Zoho CRM customizations for finance, sales, and operations workflows',
      'Delivered multiple client projects: requirements gathering, Zoho implementation, data migration, and support',
      'Built third-party integrations to automate end-to-end business processes',
    ],
    technologies: ['Zoho Creator', 'Zoho CRM', 'Zoho Analytics', 'Zoho Books', 'Deluge'],
  },
  {
    id: 'java-intern-tap',
    role: 'Java Full Stack Development Intern',
    company: 'Tap Academy',
    companyFull: 'Tap Academy',
    location: 'Bangalore, India',
    duration: 'Mar 2025 - Sep 2025',
    type: 'Internship',
    current: false,
    color: '#f97316',
    responsibilities: [
      'Worked on full-stack application development using Java technologies and Spring Boot framework',
      'Built responsive frontend interfaces and RESTful backend APIs for real-world application modules',
      'Worked with MySQL databases, authentication systems, and complete CRUD operations',
      'Collaborated with development teams on live projects, improving debugging and problem-solving skills',
      'Gained hands-on experience with the full software development lifecycle',
    ],
    technologies: ['Java', 'Spring Boot', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
  },
  {
    id: 'zoho-intern-race2cloud',
    role: 'Zoho Application Developer Intern',
    company: 'Race2Cloud Technologies',
    companyFull: 'Race2Cloud Technologies (Zoho Premium Partner)',
    location: 'Trichy, Tamil Nadu',
    duration: 'Mar 2025 - Jul 2025',
    type: 'Internship',
    current: false,
    color: '#7c3aed',
    responsibilities: [
      'Gained hands-on exposure to Zoho application monitoring, workflows, and dashboard management',
      'Collaborated with senior developers to resolve complex application-related issues',
      'Assisted in requirement gathering and solution design for client projects',
      'Implemented secure data handling practices and ensured data integrity',
    ],
    technologies: ['Zoho Creator', 'Zoho Analytics', 'Zoho CRM'],
  },
]

function getGlowColor(color: string): string {
  if (color === '#00d4ff') return 'cyan'
  if (color === '#f97316') return 'orange'
  if (color === '#7c3aed') return 'purple'
  if (color === '#ec4899') return 'pink'
  if (color === '#22c55e') return 'green'
  return 'cyan'
}

function TimelineNode({ color, current }: { color: string; current: boolean }) {
  return (
    <div className="relative flex items-center justify-center">
      {current && (
        <span
          className="absolute inline-flex h-6 w-6 rounded-full animate-ping opacity-60"
          style={{ backgroundColor: color }}
        />
      )}
      <div
        className="relative z-10 h-4 w-4 rounded-full border-2 border-[#050a1a]"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 12px 4px ${color}88`,
        }}
      />
    </div>
  )
}

function ExperienceCard({
  exp,
  index,
}: {
  exp: Experience
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -60 : 60 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
      className={cn(
        'w-full md:w-[calc(50%-2rem)]',
        isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
      )}
    >
      <GlassCard glowColor={getGlowColor(exp.color) as any} className="p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
        {/* Role Title + Current badge */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <h3
            className="text-lg font-bold leading-tight"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              color: exp.color,
            }}
          >
            {exp.role}
          </h3>
          {exp.current && (
            <span className="flex items-center gap-1.5 bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-xs font-semibold px-2.5 py-1 rounded-full shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
              Current
            </span>
          )}
        </div>

        {/* Duration + Type badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-[#94a3b8] text-xs px-2.5 py-1 rounded-full">
            <Calendar className="h-3 w-3" />
            {exp.duration}
          </span>
          <span
            className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border"
            style={{
              color: exp.color,
              borderColor: `${exp.color}44`,
              backgroundColor: `${exp.color}11`,
            }}
          >
            <Briefcase className="h-3 w-3" />
            {exp.type}
          </span>
        </div>

        {/* Company + Location */}
        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
            <Building2 className="h-4 w-4 shrink-0" style={{ color: exp.color }} />
            <span style={{ fontFamily: 'Inter, sans-serif' }}>{exp.companyFull}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#64748b]">
            <MapPin className="h-4 w-4 shrink-0" />
            <span style={{ fontFamily: 'Inter, sans-serif' }}>{exp.location}</span>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-4 opacity-20"
          style={{ background: `linear-gradient(to right, ${exp.color}, transparent)` }}
        />

        {/* Responsibilities */}
        <ul className="space-y-2 mb-4">
          {exp.responsibilities.map((resp, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-[#94a3b8]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <ChevronRight className="h-4 w-4 shrink-0 mt-0.5" style={{ color: exp.color }} />
              <span>{resp}</span>
            </li>
          ))}
        </ul>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {exp.technologies.map((tech) => (
            <span
              key={tech}
              className="flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full border"
              style={{
                color: exp.color,
                borderColor: `${exp.color}44`,
                backgroundColor: `${exp.color}11`,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default function ExperienceSection({ id = 'experience' }: ExperienceSectionProps) {
  const lineRef = useRef<HTMLDivElement>(null)
  const lineInView = useInView(lineRef, { once: true, margin: '-50px' })

  return (
    <section
      id={id}
      className="py-24 bg-[#050a1a] relative overflow-hidden"
    >
      {/* Ambient glow blobs */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute top-[40%] right-[10%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6"
          >
            <Star className="h-4 w-4 text-[#00d4ff]" />
            <span className="text-[#94a3b8] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              Professional Journey
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Experience
          </motion.h2>

          {/* Gradient underline */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1 w-24 mx-auto rounded-full mb-6"
            style={{
              background: 'linear-gradient(to right, #00d4ff, #7c3aed, #ec4899)',
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-[#64748b] text-base max-w-xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            A timeline of roles, internships, and real-world impact across Zoho ecosystems and full-stack development.
          </motion.p>
        </div>

        {/* Timeline */}
        <div ref={lineRef} className="relative max-w-4xl mx-auto">
          {/* Central vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/5 overflow-hidden" style={{ transform: 'translateX(-50%)' }}>
            <motion.div
              initial={{ scaleY: 0 }}
              animate={lineInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute inset-0 origin-top"
              style={{
                background: 'linear-gradient(to bottom, #00d4ff44, #7c3aed44, #ec489944)',
              }}
            />
          </div>

          {/* Experience entries */}
          <div className="flex flex-col gap-12">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative flex items-start gap-6 md:gap-0">
                {/* Timeline node */}
                <div className="absolute left-4 md:left-1/2 top-6 z-10" style={{ transform: 'translateX(-50%)' }}>
                  <TimelineNode color={exp.color} current={exp.current} />
                </div>

                {/* Card offset for mobile left line, alternate sides on desktop */}
                <div className="w-full pl-12 md:pl-0">
                  <ExperienceCard exp={exp} index={index} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
