'use client'

import { motion, useAnimation } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp, Heart, Code2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NeuralNode {
  cx: number
  cy: number
  r: number
  delay: number
}

interface NeuralEdge {
  x1: number
  y1: number
  x2: number
  y2: number
  delay: number
}

interface NavLink {
  label: string
  href: string
}

interface SocialLink {
  icon: React.ReactNode
  href: string
  label: string
}

const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const NEURAL_NODES: NeuralNode[] = [
  { cx: 8, cy: 15, r: 2, delay: 0 },
  { cx: 22, cy: 40, r: 1.5, delay: 0.3 },
  { cx: 45, cy: 10, r: 2.5, delay: 0.6 },
  { cx: 60, cy: 55, r: 1.8, delay: 0.2 },
  { cx: 78, cy: 20, r: 2, delay: 0.8 },
  { cx: 90, cy: 65, r: 1.5, delay: 0.4 },
  { cx: 35, cy: 75, r: 2.2, delay: 0.7 },
  { cx: 15, cy: 85, r: 1.6, delay: 0.1 },
  { cx: 70, cy: 85, r: 2, delay: 0.5 },
  { cx: 50, cy: 35, r: 1.4, delay: 0.9 },
  { cx: 5, cy: 55, r: 1.8, delay: 0.35 },
  { cx: 95, cy: 40, r: 1.5, delay: 0.65 },
]

const NEURAL_EDGES: NeuralEdge[] = [
  { x1: 8, y1: 15, x2: 22, y2: 40, delay: 0.1 },
  { x1: 8, y1: 15, x2: 45, y2: 10, delay: 0.2 },
  { x1: 22, y1: 40, x2: 60, y2: 55, delay: 0.3 },
  { x1: 45, y1: 10, x2: 78, y2: 20, delay: 0.4 },
  { x1: 60, y1: 55, x2: 90, y2: 65, delay: 0.5 },
  { x1: 78, y1: 20, x2: 90, y2: 65, delay: 0.6 },
  { x1: 22, y1: 40, x2: 35, y2: 75, delay: 0.15 },
  { x1: 35, y1: 75, x2: 15, y2: 85, delay: 0.25 },
  { x1: 35, y1: 75, x2: 70, y2: 85, delay: 0.35 },
  { x1: 60, y1: 55, x2: 70, y2: 85, delay: 0.45 },
  { x1: 50, y1: 35, x2: 45, y2: 10, delay: 0.55 },
  { x1: 50, y1: 35, x2: 60, y2: 55, delay: 0.65 },
  { x1: 5, y1: 55, x2: 22, y2: 40, delay: 0.2 },
  { x1: 90, y1: 65, x2: 95, y2: 40, delay: 0.4 },
  { x1: 78, y1: 20, x2: 95, y2: 40, delay: 0.6 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const socialLinks: SocialLink[] = [
    {
      icon: <Github size={18} />,
      href: 'https://github.com/shalinim1228',
      label: 'GitHub',
    },
    {
      icon: <Linkedin size={18} />,
      href: 'https://linkedin.com/in/shalinim1228',
      label: 'LinkedIn',
    },
    {
      icon: <Mail size={18} />,
      href: 'mailto:shalinims2806@gmail.com',
      label: 'Email',
    },
  ]

  return (
    <footer
      className={cn(
        'relative overflow-hidden',
        'bg-[#050a1a] border-t border-[#00d4ff]/10',
        'pt-16 pb-8'
      )}
    >
      {/* Neural Network SVG Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.05 }}
        >
          {NEURAL_EDGES.map((edge, i) => (
            <motion.line
              key={`edge-${i}`}
              x1={`${edge.x1}%`}
              y1={`${edge.y1}%`}
              x2={`${edge.x2}%`}
              y2={`${edge.y2}%`}
              stroke="#00d4ff"
              strokeWidth="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.8,
                delay: edge.delay,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'reverse',
                repeatDelay: 3,
              }}
            />
          ))}
          {NEURAL_NODES.map((node, i) => (
            <motion.circle
              key={`node-${i}`}
              cx={`${node.cx}%`}
              cy={`${node.cy}%`}
              r={node.r}
              fill="#00d4ff"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 2.5,
                delay: node.delay,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Top Section */}
        <motion.div
          className="flex flex-col lg:flex-row justify-between gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Left: Brand + Bio */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4 max-w-sm">
            <div className="flex items-center gap-2">
              <Code2 size={22} className="text-[#00d4ff]" />
              <span
                className="font-bold text-2xl text-[#00d4ff] tracking-widest"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  textShadow:
                    '0 0 12px rgba(0,212,255,0.7), 0 0 28px rgba(0,212,255,0.35)',
                }}
              >
                SHALINI.M
              </span>
            </div>

            <p
              className="text-sm text-[#00d4ff]/70 tracking-wide leading-relaxed"
              style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.7rem' }}
            >
              Zoho Developer | Full Stack Enthusiast | AI &amp; Automation Explorer
            </p>

            <p className="text-sm text-[#94a3b8] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              Building intelligent solutions with Zoho, code, and creativity.
            </p>

            {/* Decorative accent line */}
            <div className="flex items-center gap-2 mt-1">
              <div className="h-px w-10 bg-gradient-to-r from-[#00d4ff] to-transparent" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#7c3aed]" />
              <div className="h-px w-6 bg-gradient-to-r from-[#7c3aed] to-transparent" />
            </div>
          </motion.div>

          {/* Right: Quick Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <h3
              className="text-xs font-semibold text-[#00d4ff]/60 tracking-[0.2em] uppercase mb-1"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    'text-left text-sm text-[#94a3b8] transition-all duration-200',
                    'hover:text-[#00d4ff] hover:translate-x-1',
                    'relative group w-fit'
                  )}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                  whileHover={{ x: 4 }}
                >
                  <span className="relative">
                    <span
                      className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#00d4ff] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    />
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        </motion.div>

        {/* Social Links Row */}
        <motion.div
          className="flex justify-center gap-4 mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={social.label}
              variants={itemVariants}
              className={cn(
                'flex items-center justify-center',
                'w-11 h-11 rounded-full',
                'bg-white/5 border border-white/10',
                'text-[#94a3b8]',
                'transition-all duration-250',
                'hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/50 hover:text-[#00d4ff]',
                'focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/40'
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Gradient Divider */}
        <motion.div
          className="h-px w-full mb-8"
          style={{
            background:
              'linear-gradient(to right, transparent, #00d4ff55, #7c3aed55, transparent)',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        {/* Bottom Bar */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Copyright */}
          <p
            className="flex items-center gap-1.5 text-sm text-[#64748b]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span>&copy; 2025 Shalini M. Crafted with</span>
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart size={14} className="text-[#ec4899] fill-[#ec4899]" />
            </motion.span>
            <span>and</span>
            <Code2 size={14} className="text-[#00d4ff]" />
            <span>code</span>
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            className={cn(
              'flex items-center gap-2 text-sm text-[#94a3b8]',
              'hover:text-[#00d4ff] transition-colors duration-200',
              'group focus:outline-none focus:ring-2 focus:ring-[#00d4ff]/40 rounded-md px-1'
            )}
            style={{ fontFamily: 'Inter, sans-serif' }}
            whileHover={{ y: -1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <span>Back to top</span>
            <motion.span
              className={cn(
                'flex items-center justify-center w-7 h-7 rounded-full',
                'bg-white/5 border border-white/10',
                'group-hover:bg-[#00d4ff]/20 group-hover:border-[#00d4ff]/50',
                'transition-all duration-200'
              )}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowUp size={13} />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  )
}
