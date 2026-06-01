'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { TypeAnimation } from 'react-type-animation'
import { Github, Linkedin, Download, ChevronDown, Sparkles, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const ThreeCanvas = dynamic(() => import('@/components/ui/HeroCanvas'), {
  ssr: false,
  loading: () => null,
})

interface HeroSectionProps {
  id?: string
}

const nameLetters = 'SHALINI M'.split('')

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 200, damping: 20 },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut', delay },
  }),
}

export default function HeroSection({ id = 'hero' }: HeroSectionProps) {
  const [canvasReady, setCanvasReady] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setCanvasReady(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const scrollTo = (targetId: string) => {
    const el = document.getElementById(targetId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#000000]"
    >
      {/* Background radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(0,212,255,0.05) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(124,58,237,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.08) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Animated corner glow orbs */}
      <motion.div
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[45%] w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Three.js Canvas — right half, desktop only */}
      <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block pointer-events-none z-10">
        {canvasReady && <ThreeCanvas />}
      </div>

      {/* Main content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 lg:py-0">
        <div className="max-w-2xl">

          {/* Availability badge */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 mb-8"
          >
            <div className="flex items-center gap-2 bg-white/5 border border-[#22c55e]/30 backdrop-blur-xl px-4 py-2 rounded-full">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22c55e]" />
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#22c55e]" />
              <span className="text-[#22c55e] text-xs font-semibold tracking-wider uppercase">
                Available for Opportunities
              </span>
            </div>
          </motion.div>

          {/* Name with letter-by-letter stagger */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-x-0 gap-y-1 mb-4"
            aria-label="SHALINI M"
          >
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                className={cn(
                  'font-black leading-none tracking-widest',
                  'text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
                  'bg-gradient-to-r from-[#00d4ff] via-[#7c3aed] to-[#ec4899]',
                  'bg-clip-text text-transparent',
                  letter === ' ' ? 'w-6 sm:w-8 lg:w-10' : ''
                )}
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {letter === ' ' ? ' ' : letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Typing animation subtitle */}
          <motion.div
            custom={0.55}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-3 mb-5 h-10"
          >
            <Zap className="w-5 h-5 text-[#00d4ff] flex-shrink-0" />
            <TypeAnimation
              sequence={[
                'Zoho Developer',
                2000,
                'Full Stack Enthusiast',
                2000,
                'AI & Automation Explorer',
                2000,
                'Problem Solver',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-xl sm:text-2xl text-[#94a3b8] font-medium"
            />
          </motion.div>

          {/* Bio */}
          <motion.p
            custom={0.7}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-[#64748b] text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
          >
            Crafting intelligent digital experiences at the intersection of{' '}
            <span className="text-[#00d4ff]/80">Zoho ecosystems</span>,{' '}
            <span className="text-[#7c3aed]/80">full-stack engineering</span>, and{' '}
            <span className="text-[#ec4899]/80">AI-powered automation</span> — from TamilNadu, India.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            custom={0.85}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-3 mb-10"
          >
            {/* View Projects */}
            <motion.button
              onClick={() => scrollTo('projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-full font-semibold text-sm text-black bg-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.35)] hover:shadow-[0_0_30px_rgba(0,212,255,0.55)] transition-shadow duration-300"
            >
              View Projects
            </motion.button>

            {/* Contact Me */}
            <motion.button
              onClick={() => scrollTo('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-full font-semibold text-sm text-[#00d4ff] border border-[#00d4ff]/50 bg-white/5 backdrop-blur-sm hover:bg-[#00d4ff]/10 transition-colors duration-300"
            >
              Contact Me
            </motion.button>

            {/* Download Resume */}
            <motion.a
              href="/SHALINI Resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm text-[#7c3aed] border border-[#7c3aed]/50 bg-white/5 backdrop-blur-sm hover:bg-[#7c3aed]/10 transition-colors duration-300"
            >
              <Download className="w-4 h-4" />
              Resume
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            custom={1.0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-4"
          >
            <span className="text-[#64748b] text-xs uppercase tracking-wider">Find me on</span>
            <div className="flex gap-3">
              <motion.a
                href="https://github.com/shalinim1228"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  'bg-white/5 border border-white/10 backdrop-blur-sm',
                  'text-[#94a3b8] hover:text-[#00d4ff] hover:border-[#00d4ff]/40',
                  'transition-colors duration-300'
                )}
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/shalinim1228"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center',
                  'bg-white/5 border border-white/10 backdrop-blur-sm',
                  'text-[#94a3b8] hover:text-[#00d4ff] hover:border-[#00d4ff]/40',
                  'transition-colors duration-300'
                )}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 cursor-pointer"
        onClick={() => scrollTo('about')}
      >
        <span className="text-[#94a3b8] text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-[#94a3b8]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
