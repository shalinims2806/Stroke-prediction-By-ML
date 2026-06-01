'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, Download, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Enterprise', href: '#enterprise' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

interface NavigationProps {
  className?: string
}

export default function Navigation({ className }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(scrollTop > 20)
      setScrollPercent(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace('#', ''))
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-[2px] bg-gradient-to-r from-[#00d4ff] via-[#7c3aed] to-[#ec4899] transition-all duration-150"
        style={{ width: `${scrollPercent}%` }}
      />

      {/* Main navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#050a1a]/90 backdrop-blur-xl border-b border-[#00d4ff]/10 shadow-lg shadow-black/20'
            : 'bg-transparent',
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                {/* Glow ring animation */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-[#00d4ff]/40"
                  style={{ width: 44, height: 44, margin: 'auto' }}
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border border-dashed border-[#7c3aed]/30"
                  style={{ width: 52, height: 52, margin: 'auto' }}
                />
                <button
                  onClick={() => handleNavClick('#hero')}
                  className="relative z-10 w-10 h-10 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center hover:bg-[#00d4ff]/20 transition-colors"
                >
                  <span
                    className="font-bold text-sm text-[#00d4ff] tracking-wider"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    S.M
                  </span>
                </button>
              </div>
            </div>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace('#', '')
                const isActive = activeSection === sectionId
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      'relative px-3 py-2 text-sm font-medium transition-colors duration-200 group',
                      isActive
                        ? 'text-[#00d4ff]'
                        : 'text-[#94a3b8] hover:text-[#00d4ff]'
                    )}
                  >
                    {link.label}
                    {/* Active bottom border */}
                    <span
                      className={cn(
                        'absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-[#00d4ff] transition-all duration-300',
                        isActive ? 'w-4/5 opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-50'
                      )}
                    />
                  </button>
                )
              })}
            </div>

            {/* Resume button + mobile toggle */}
            <div className="flex items-center gap-3">
              <a
                href="/SHALINI Resume.pdf"
                download
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff] text-sm font-medium hover:bg-[#00d4ff]/20 transition-colors duration-200"
              >
                <Download size={15} />
                Resume
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-[#94a3b8] hover:text-[#00d4ff] hover:border-[#00d4ff]/30 transition-colors"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X size={18} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu size={18} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-0 top-16 z-40 md:hidden bg-[#050a1a]/95 backdrop-blur-xl border-b border-[#00d4ff]/10"
          >
            <div className="flex flex-col">
              {NAV_LINKS.map((link, index) => {
                const sectionId = link.href.replace('#', '')
                const isActive = activeSection === sectionId
                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      'w-full text-left px-6 py-4 text-base font-medium border-b border-white/5 transition-colors duration-200',
                      isActive
                        ? 'text-[#00d4ff] bg-[#00d4ff]/5'
                        : 'text-[#94a3b8] hover:text-[#00d4ff] hover:bg-white/5'
                    )}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <span className="flex items-center gap-3">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shrink-0" />
                      )}
                      {!isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-transparent shrink-0" />
                      )}
                      {link.label}
                    </span>
                  </motion.button>
                )
              })}

              {/* Mobile resume button */}
              <div className="px-6 py-4">
                <a
                  href="/SHALINI Resume.pdf"
                  download
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[#00d4ff] text-sm font-medium hover:bg-[#00d4ff]/20 transition-colors duration-200"
                >
                  <Download size={16} />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
