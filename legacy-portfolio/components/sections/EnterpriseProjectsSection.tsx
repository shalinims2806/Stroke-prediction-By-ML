'use client'

import { useState, useRef, MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Globe,
  Briefcase,
  ExternalLink,
  ChevronRight,
  Building2,
  BarChart3,
  Zap,
  Star,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import GlassCard from '@/components/ui/GlassCard'

const projects = [
  {
    id: 1,
    client: 'Perivision Company',
    country: 'Switzerland',
    flag: '🇨🇭',
    role: 'Data Analyst',
    color: '#00d4ff',
    glowColor: 'cyan',
    emoji: '📊',
    coords: { x: '52%', y: '28%' },
    description:
      'Worked on data analysis and reporting solutions to improve business insights and operational decision-making. Created interactive dashboards, analyzed complex datasets, and generated meaningful visual reports.',
    tech: ['Zoho Analytics', 'Excel', 'Data Visualization', 'Reporting'],
    impact: 'Improved decision-making speed by 40% through real-time dashboards',
  },
  {
    id: 2,
    client: 'Prvati Textiles',
    country: 'Brunei Darussalam',
    flag: '🇧🇳',
    role: 'Zoho Developer',
    color: '#f97316',
    glowColor: 'orange',
    emoji: '🏭',
    coords: { x: '72%', y: '52%' },
    description:
      'Developed and customized business workflow applications to streamline textile operations, automate approvals, and improve inventory and operational management processes.',
    tech: ['Zoho Creator', 'Deluge', 'Automation', 'CRM Integration'],
    impact: 'Automated 80% of manual approval workflows',
  },
  {
    id: 3,
    client: 'GJPMC Hospital',
    country: 'Singapore',
    flag: '🇸🇬',
    role: 'Healthcare Developer',
    color: '#ec4899',
    glowColor: 'pink',
    emoji: '🏥',
    coords: { x: '73%', y: '55%' },
    description:
      'Developed healthcare workflow management solutions for hospital operations including patient process tracking, automation systems, reporting dashboards, and role-based access management.',
    tech: ['Zoho Creator', 'Zoho Analytics', 'Deluge', 'Workflow Automation'],
    impact: 'Digitized patient workflow tracking across 5 departments',
  },
]

interface TiltState {
  rotateX: number
  rotateY: number
}

function EnterpriseCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const rotateY = (dx / (rect.width / 2)) * 10
    const rotateX = -(dy / (rect.height / 2)) * 10
    setTilt({ rotateX, rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 })
    setIsHovered(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: isHovered ? 'transform 0.1s ease' : 'transform 0.4s ease',
          borderColor: isHovered ? project.color + '60' : 'rgba(255,255,255,0.1)',
          boxShadow: isHovered
            ? `0 0 30px ${project.color}20, 0 0 60px ${project.color}10`
            : 'none',
        }}
        className="backdrop-blur-xl bg-white/5 border rounded-2xl overflow-hidden cursor-default h-full flex flex-col"
      >
        {/* Top gradient bar */}
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(to right, ${project.color}, transparent)`,
          }}
        />

        {/* Holographic header */}
        <div
          className="relative p-5 pb-4"
          style={{
            background: `linear-gradient(135deg, ${project.color}08, transparent 70%)`,
          }}
        >
          {/* Glow circle with emoji */}
          <div
            className="absolute top-4 left-5 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{
              background: `${project.color}15`,
              border: `1px solid ${project.color}30`,
              boxShadow: isHovered ? `0 0 20px ${project.color}30` : 'none',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            {project.emoji}
          </div>

          {/* Country flag + name top-right */}
          <div className="flex items-center gap-1.5 justify-end">
            <span className="text-lg">{project.flag}</span>
            <span
              className="text-xs font-medium"
              style={{ color: project.color, fontFamily: 'Orbitron, sans-serif' }}
            >
              {project.country}
            </span>
          </div>

          {/* Role badge */}
          <div className="mt-8">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
              style={{
                border: `1px solid ${project.color}40`,
                color: project.color,
                background: `${project.color}10`,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <Briefcase size={10} />
              {project.role}
            </span>
          </div>
        </div>

        {/* Content area */}
        <div className="p-5 pt-2 flex flex-col flex-1">
          {/* Client name */}
          <h3
            className="text-xl font-bold text-white"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            {project.client}
          </h3>

          {/* Location row */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <MapPin size={12} className="text-[#94a3b8]" />
            <span className="text-sm text-[#94a3b8]" style={{ fontFamily: 'Inter, sans-serif' }}>
              {project.country}
            </span>
          </div>

          {/* Description */}
          <p
            className="text-sm text-[#64748b] leading-relaxed mt-3 line-clamp-3 flex-1"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {project.description}
          </p>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-full text-xs"
                style={{
                  background: `${project.color}10`,
                  border: `1px solid ${project.color}25`,
                  color: project.color,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Impact metric */}
          <div
            className="mt-4 p-3 rounded-xl flex items-start gap-2"
            style={{
              border: `1px solid ${project.color}20`,
              background: `${project.color}05`,
            }}
          >
            <Zap size={14} style={{ color: project.color, flexShrink: 0, marginTop: 1 }} />
            <span
              className="text-xs leading-relaxed"
              style={{ color: project.color, fontFamily: 'Inter, sans-serif' }}
            >
              {project.impact}
            </span>
          </div>

          {/* ENTERPRISE badge bottom-right */}
          <div className="flex justify-end mt-3">
            <span
              className="text-[10px] tracking-widest text-[#64748b] opacity-50"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              ENTERPRISE
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function WorldMap() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        height: 280,
        background: 'rgba(5,10,26,0.5)',
        border: '1px solid rgba(0,212,255,0.1)',
      }}
    >
      {/* Corner decorations */}
      <div
        className="absolute top-3 left-3 w-5 h-5"
        style={{
          borderTop: '2px solid #00d4ff',
          borderLeft: '2px solid #00d4ff',
          opacity: 0.5,
        }}
      />
      <div
        className="absolute top-3 right-3 w-5 h-5"
        style={{
          borderTop: '2px solid #00d4ff',
          borderRight: '2px solid #00d4ff',
          opacity: 0.5,
        }}
      />
      <div
        className="absolute bottom-3 left-3 w-5 h-5"
        style={{
          borderBottom: '2px solid #00d4ff',
          borderLeft: '2px solid #00d4ff',
          opacity: 0.5,
        }}
      />
      <div
        className="absolute bottom-3 right-3 w-5 h-5"
        style={{
          borderBottom: '2px solid #00d4ff',
          borderRight: '2px solid #00d4ff',
          opacity: 0.5,
        }}
      />

      {/* GLOBAL REACH label */}
      <div
        className="absolute top-4 right-10 text-[10px] tracking-widest opacity-50"
        style={{ color: '#00d4ff', fontFamily: 'Orbitron, sans-serif' }}
      >
        GLOBAL REACH
      </div>

      {/* SVG world map */}
      <svg
        viewBox="0 0 1000 500"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid overlay */}
        {Array.from({ length: 10 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={i * 50}
            x2="1000"
            y2={i * 50}
            stroke="#00d4ff"
            strokeWidth="0.4"
            opacity="0.06"
          />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 50}
            y1="0"
            x2={i * 50}
            y2="500"
            stroke="#00d4ff"
            strokeWidth="0.4"
            opacity="0.06"
          />
        ))}

        {/* Americas */}
        <path
          d="M150,80 L200,70 L230,90 L240,130 L230,170 L220,210 L210,250 L200,290 L185,310 L170,290 L155,260 L145,230 L140,190 L138,150 L140,120 Z"
          fill="rgba(0,212,255,0.06)"
          stroke="rgba(0,212,255,0.15)"
          strokeWidth="0.8"
        />

        {/* Europe/Africa/Asia blob */}
        <path
          d="M350,80 L420,70 L480,85 L520,90 L580,100 L650,95 L700,110 L720,140 L710,180 L690,220 L650,260 L600,280 L560,300 L520,320 L490,340 L460,320 L430,290 L410,260 L390,230 L370,200 L360,170 L350,140 Z"
          fill="rgba(0,212,255,0.06)"
          stroke="rgba(0,212,255,0.15)"
          strokeWidth="0.8"
        />

        {/* Australia */}
        <path
          d="M720,300 L770,290 L800,310 L790,340 L760,350 L730,335 Z"
          fill="rgba(0,212,255,0.06)"
          stroke="rgba(0,212,255,0.15)"
          strokeWidth="0.8"
        />

        {/* Connecting lines between project dots */}
        {projects.map((p, i) =>
          projects.slice(i + 1).map((p2, j) => {
            const x1 = parseFloat(p.coords.x) * 10
            const y1 = parseFloat(p.coords.y) * 5
            const x2 = parseFloat(p2.coords.x) * 10
            const y2 = parseFloat(p2.coords.y) * 5
            return (
              <line
                key={`line-${i}-${j}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#00d4ff"
                strokeWidth="0.6"
                strokeDasharray="4 6"
                opacity="0.2"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="20"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </line>
            )
          })
        )}

        {/* Project location dots */}
        {projects.map((project) => {
          const cx = parseFloat(project.coords.x) * 10
          const cy = parseFloat(project.coords.y) * 5
          return (
            <g key={project.id}>
              {/* Outer pulsing ring */}
              <circle cx={cx} cy={cy} r="6" fill={project.color} opacity="0.15">
                <animate attributeName="r" from="6" to="18" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
              {/* Core dot */}
              <circle
                cx={cx}
                cy={cy}
                r="5"
                fill={project.color}
                opacity="0.9"
                style={{ cursor: 'pointer' }}
              />
              {/* Country label */}
              <text
                x={cx}
                y={cy - 14}
                textAnchor="middle"
                fill={project.color}
                fontSize="8"
                fontFamily="Orbitron, sans-serif"
                opacity="0.8"
              >
                {project.flag} {project.country}
              </text>
            </g>
          )
        })}
      </svg>
    </motion.div>
  )
}

const stats = [
  {
    number: '3',
    label: 'Countries',
    icon: <Globe size={20} className="text-[#00d4ff]" />,
  },
  {
    number: '3+',
    label: 'Enterprise Clients',
    icon: <Building2 size={20} className="text-[#7c3aed]" />,
  },
  {
    number: 'Global',
    label: 'International Experience',
    icon: <Star size={20} className="text-[#ec4899]" />,
  },
]

export default function EnterpriseProjectsSection({ id = 'enterprise' }: { id?: string }) {
  return (
    <section
      id={id}
      className="py-24 bg-[#000000] overflow-hidden relative"
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,212,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.25)',
            }}
          >
            <Globe size={14} className="text-[#00d4ff]" />
            <span
              className="text-xs font-semibold tracking-widest text-[#00d4ff]"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Enterprise Projects
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            <span className="text-white">Client</span>{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #00d4ff, #7c3aed, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Projects
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className="text-[#94a3b8] text-lg max-w-xl mx-auto mb-6"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Real-world solutions delivered across international borders
          </p>

          {/* Animated gradient underline */}
          <motion.div
            className="h-0.5 mx-auto rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, #00d4ff, #7c3aed, #ec4899, transparent)',
              maxWidth: 240,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
          />
        </motion.div>

        {/* World Map */}
        <div className="mb-12">
          <WorldMap />
        </div>

        {/* Enterprise Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {projects.map((project, index) => (
            <EnterpriseCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {stats.map((stat, i) => (
            <div key={i} className="relative">
              {/* Divider between stats (desktop) */}
              {i > 0 && (
                <div
                  className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                />
              )}
              <div
                className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl text-center"
                style={{
                  backdropFilter: 'blur(16px)',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="mb-1">{stat.icon}</div>
                <div
                  className="text-3xl font-bold text-white"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {stat.number}
                </div>
                <div
                  className="text-sm text-[#94a3b8]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
