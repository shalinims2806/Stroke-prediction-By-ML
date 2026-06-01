'use client'

import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState, useRef } from 'react'
import { Code2, Database, Zap, Award, Briefcase, GraduationCap, Globe, Cpu, MapPin, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import GlassCard from '@/components/ui/GlassCard'

interface AboutSectionProps {
  id?: string
}

const stats = [
  { value: 7, suffix: '+', label: 'Projects Completed', icon: Code2, color: '#00d4ff' },
  { value: 20, suffix: '+', label: 'Technologies Known', icon: Cpu, color: '#7c3aed' },
  { value: 4, suffix: '', label: 'Certifications', icon: Award, color: '#ec4899' },
  { value: 3, suffix: '+', label: 'Countries Served', icon: Globe, color: '#f97316' },
]

const services = [
  {
    icon: Code2,
    title: 'Zoho Development',
    desc: 'Building powerful business applications with Zoho Creator, CRM, Analytics, RPA, and Agentic AI solutions across the full Zoho ecosystem.',
    color: '#00d4ff',
    glowColor: 'cyan' as const,
  },
  {
    icon: Database,
    title: 'Full Stack Dev',
    desc: 'Creating end-to-end web applications with Java Spring Boot, Python, React, and modern databases for scalable enterprise solutions.',
    color: '#7c3aed',
    glowColor: 'purple' as const,
  },
  {
    icon: Zap,
    title: 'AI & Automation',
    desc: 'Designing intelligent workflows, Zoho Agentic AI, RPA systems, and data-driven dashboards to automate international business operations.',
    color: '#ec4899',
    glowColor: 'pink' as const,
  },
]

const floatingBadges = [
  { label: 'Zoho', top: '8%', left: '-12%', color: '#00d4ff' },
  { label: 'AI', top: '8%', right: '-12%', color: '#7c3aed' },
  { label: 'Python', bottom: '18%', left: '-14%', color: '#ec4899' },
  { label: 'Full Stack', bottom: '18%', right: '-14%', color: '#f97316' },
]

interface CounterProps {
  target: number
  suffix: string
  color: string
  inView: boolean
}

function AnimatedCounter({ target, suffix, color, inView }: CounterProps) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true
    const duration = 1500
    const steps = 40
    const increment = target / steps
    const interval = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, interval)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span
      className="text-4xl font-black font-['Orbitron',sans-serif]"
      style={{ color }}
    >
      {count}
      {suffix}
    </span>
  )
}

export default function AboutSection({ id = 'about' }: AboutSectionProps) {
  const [imgError, setImgError] = useState(false)

  const { ref: sectionRef, inView: sectionInView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.2, triggerOnce: true })

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  }

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  }

  const fadeLeftVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  }

  const fadeRightVariant = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  }

  const descWords = 'Passionate software developer specializing in Full Stack Development, Zoho Ecosystem solutions, AI automation, enterprise application development, and data analytics. Experienced in delivering scalable business solutions, workflow automation systems, and interactive user experiences across international projects.'.split(' ')

  return (
    <section
      id={id}
      className="relative py-24 bg-[#050a1a] overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00d4ff]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#7c3aed]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="text-4xl sm:text-5xl font-black tracking-widest uppercase"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              background: 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            About Me
          </h2>
          <motion.div
            className="mt-3 mx-auto h-1 rounded-full"
            style={{ background: 'linear-gradient(90deg, #00d4ff, #7c3aed, #ec4899)' }}
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
          />
          <motion.p
            className="mt-4 text-[#94a3b8] text-base tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            International developer. AI automation architect. Enterprise solution builder.
          </motion.p>
        </motion.div>

        {/* Two-column layout */}
        <div ref={sectionRef} className="grid md:grid-cols-2 gap-12 mt-16 items-center">

          {/* LEFT — Avatar & profile */}
          <motion.div
            className="flex flex-col items-center gap-6"
            variants={fadeLeftVariant}
            initial="hidden"
            animate={sectionInView ? 'visible' : 'hidden'}
          >
            {/* Avatar container */}
            <div className="relative" style={{ width: 300, height: 300 }}>
              {/* Rotating gradient border */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #00d4ff, #7c3aed, #ec4899, #f97316, #00d4ff)',
                  padding: 3,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-full h-full rounded-full bg-[#050a1a]" />
              </motion.div>

              {/* Inner circle with image */}
              <div
                className="absolute rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  inset: 5,
                  background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.2))',
                }}
              >
                {!imgError ? (
                  <img
                    src="/profile.jpg"
                    alt="Shalini M"
                    className="w-full h-full object-cover rounded-full"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <span
                    className="text-4xl font-black select-none"
                    style={{
                      fontFamily: "'Orbitron', sans-serif",
                      color: '#00d4ff',
                      textShadow: '0 0 20px rgba(0,212,255,0.6)',
                    }}
                  >
                    S.M
                  </span>
                )}
              </div>

              {/* Floating skill badges */}
              {floatingBadges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  className="absolute px-3 py-1 rounded-full text-xs font-bold backdrop-blur-xl border"
                  style={{
                    top: badge.top,
                    left: (badge as any).left,
                    right: (badge as any).right,
                    bottom: badge.bottom,
                    color: badge.color,
                    borderColor: badge.color + '44',
                    background: badge.color + '18',
                    fontFamily: "'Orbitron', sans-serif",
                    boxShadow: `0 0 12px ${badge.color}33`,
                    whiteSpace: 'nowrap',
                  }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.12 }}
                >
                  {badge.label}
                </motion.div>
              ))}
            </div>

            {/* Name & title below avatar */}
            <div className="text-center">
              <h3
                className="text-2xl font-black tracking-wider"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  background: 'linear-gradient(90deg, #00d4ff, #7c3aed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Shalini M
              </h3>
              <p className="mt-1 text-sm text-[#94a3b8] tracking-wide">
                Zoho Developer · Full Stack Enthusiast · AI Explorer
              </p>
            </div>
          </motion.div>

          {/* RIGHT — Text content */}
          <motion.div
            className="flex flex-col gap-6"
            variants={fadeRightVariant}
            initial="hidden"
            animate={sectionInView ? 'visible' : 'hidden'}
          >
            {/* Animated description */}
            <div className="text-[#94a3b8] leading-relaxed text-base">
              <motion.p
                variants={containerVariants}
                initial="hidden"
                animate={sectionInView ? 'visible' : 'hidden'}
              >
                {descWords.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: i * 0.018 } },
                    }}
                    className="inline-block mr-1"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </div>

            {/* Location & email */}
            <div className="flex flex-col gap-3 mt-2">
              <motion.div
                className="flex items-center gap-3 text-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={sectionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <MapPin size={16} className="text-[#00d4ff] shrink-0" />
                <span className="text-[#94a3b8]">TamilNadu, India</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 text-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={sectionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.05 }}
              >
                <Mail size={16} className="text-[#7c3aed] shrink-0" />
                <a
                  href="mailto:shalinims2806@gmail.com"
                  className="text-[#94a3b8] hover:text-[#00d4ff] transition-colors duration-200"
                >
                  shalinims2806@gmail.com
                </a>
              </motion.div>
            </div>

            {/* Mini quick facts */}
            <motion.div
              className="flex flex-wrap gap-2 mt-2"
              initial={{ opacity: 0 }}
              animate={sectionInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {['Open to Opportunities', 'Team Player', 'Fast Learner', 'Problem Solver', 'Global Projects'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium border"
                  style={{
                    color: '#00d4ff',
                    borderColor: 'rgba(0,212,255,0.25)',
                    background: 'rgba(0,212,255,0.08)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Stats row */}
        <div ref={statsRef} className="mt-20">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate={statsInView ? 'visible' : 'hidden'}
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.6, delay: i * 0.12 },
                    },
                  }}
                >
                  <GlassCard
                    glowColor={
                      stat.color === '#00d4ff'
                        ? 'cyan'
                        : stat.color === '#7c3aed'
                        ? 'purple'
                        : stat.color === '#ec4899'
                        ? 'pink'
                        : 'orange'
                    }
                    className="p-6 relative"
                  >
                    {/* Icon top-right */}
                    <div
                      className="absolute top-4 right-4 p-2 rounded-lg"
                      style={{ background: stat.color + '18' }}
                    >
                      <Icon size={16} style={{ color: stat.color }} />
                    </div>

                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      color={stat.color}
                      inView={statsInView}
                    />
                    <p className="mt-2 text-xs text-[#64748b] tracking-wide leading-snug">
                      {stat.label}
                    </p>
                    {/* Bottom accent line */}
                    <div
                      className="mt-4 h-0.5 rounded-full w-full opacity-40"
                      style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }}
                    />
                  </GlassCard>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* What I Do section */}
        <div className="mt-20">
          <motion.h3
            className="text-center text-2xl font-black tracking-widest uppercase mb-10"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              background: 'linear-gradient(90deg, #00d4ff, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
          >
            What I Do
          </motion.h3>

          <div className="grid sm:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.65, delay: i * 0.15 }}
                  whileHover={{ scale: 1.04 }}
                >
                  <GlassCard
                    glowColor={service.glowColor}
                    className="p-6 h-full flex flex-col gap-4 group transition-all duration-300"
                  >
                    {/* Icon with glow */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: service.color + '1a',
                        boxShadow: `0 0 0 1px ${service.color}30`,
                      }}
                    >
                      <Icon
                        size={22}
                        style={{
                          color: service.color,
                          filter: `drop-shadow(0 0 6px ${service.color}88)`,
                        }}
                      />
                    </div>

                    <h4
                      className="text-base font-bold tracking-wider"
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        color: service.color,
                      }}
                    >
                      {service.title}
                    </h4>

                    <p className="text-sm text-[#94a3b8] leading-relaxed flex-1">
                      {service.desc}
                    </p>

                    {/* Bottom glow bar */}
                    <div
                      className="h-0.5 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                      style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
                    />
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
