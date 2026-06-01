'use client'

import { useState, useRef, MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Brain, ShoppingCart, Settings, Hotel, Filter, Code2, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'
import GlassCard from '@/components/ui/GlassCard'

interface Project {
  id: number
  title: string
  subtitle: string
  category: string
  emoji: string
  description: string
  tech: string[]
  color: string
  gradient: string
  github: string
  live: string | null
}

interface TiltState {
  rotateX: number
  rotateY: number
}

interface ProjectCardProps {
  project: Project
  index: number
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Early Stroke Prediction',
    subtitle: 'Using Machine Learning',
    category: 'Machine Learning',
    emoji: '🧠',
    description:
      'Built a predictive healthcare ML system using patient health data. Improved accuracy through feature selection, data pre-processing, and model optimization to detect stroke risk early.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'ML', 'Data Processing'],
    color: '#00d4ff',
    gradient: 'from-[#00d4ff]/20 to-[#0a0f2e]',
    github: 'https://github.com/shalinim1228/Stroke-prediction',
    live: null,
  },
  {
    id: 2,
    title: 'Online Grocery Store',
    subtitle: 'Full Stack Application',
    category: 'Full Stack',
    emoji: '🛒',
    description:
      'Developed a complete e-commerce web app with product catalogue, cart management, and order tracking. Features secure authentication, role-based access control, and transaction handling.',
    tech: ['Java', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
    color: '#7c3aed',
    gradient: 'from-[#7c3aed]/20 to-[#0a0f2e]',
    github: 'https://github.com/shalinim1228/Online-grocery-store',
    live: null,
  },
  {
    id: 3,
    title: 'Procurement Management',
    subtitle: 'Automation Application',
    category: 'Zoho App',
    emoji: '⚙️',
    description:
      'Built a procurement workflow system to manage supplier orders and inventory. Automated purchase requests, approval chains, and stock updates. Streamlined vendor communication.',
    tech: ['Zoho Creator', 'Deluge', 'Automation', 'Workflows'],
    color: '#f97316',
    gradient: 'from-[#f97316]/20 to-[#0a0f2e]',
    github: 'https://github.com/shalinim1228',
    live: null,
  },
  {
    id: 4,
    title: 'Hotel Asset Tracker',
    subtitle: 'Real-time Management',
    category: 'Zoho App',
    emoji: '🏨',
    description:
      'Developed a hotel asset management platform for tracking assets across rooms, housekeeping, maintenance, and F&B departments. Features real-time tracking, lifecycle management, and dashboards.',
    tech: ['Zoho Creator', 'Zoho Analytics', 'Deluge', 'Dashboards'],
    color: '#ec4899',
    gradient: 'from-[#ec4899]/20 to-[#0a0f2e]',
    github: 'https://github.com/shalinim1228',
    live: null,
  },
]

const categories = ['All', 'Machine Learning', 'Full Stack', 'Zoho App']

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 })
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    const rotateY = (mouseX / (rect.width / 2)) * 10
    const rotateX = -(mouseY / (rect.height / 2)) * 10
    setTilt({ rotateX, rotateY })
  }

  function handleMouseLeave() {
    setTilt({ rotateX: 0, rotateY: 0 })
    setIsHovered(false)
  }

  function handleMouseEnter() {
    setIsHovered(true)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
          boxShadow: isHovered
            ? `0 0 40px ${project.color}40, 0 0 80px ${project.color}20, 0 20px 60px rgba(0,0,0,0.5)`
            : '0 4px 24px rgba(0,0,0,0.4)',
          borderColor: isHovered ? `${project.color}60` : undefined,
        }}
        className={cn(
          'relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/5 border transition-colors duration-300',
          isHovered ? '' : 'border-white/10'
        )}
      >
        {/* Top gradient bar */}
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(to right, ${project.color}, transparent)`,
          }}
        />

        <div className="p-6 flex flex-col gap-4">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              {/* Category badge */}
              <span
                className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border w-fit"
                style={{
                  color: project.color,
                  borderColor: `${project.color}40`,
                  backgroundColor: `${project.color}10`,
                }}
              >
                <Tag className="w-3 h-3" />
                {project.category}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold text-white leading-tight mt-1">
                {project.title}
              </h3>

              {/* Subtitle */}
              <p className="text-[#94a3b8] text-sm">{project.subtitle}</p>
            </div>

            {/* Emoji badge */}
            <div
              className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{
                backgroundColor: `${project.color}15`,
                border: `1px solid ${project.color}30`,
              }}
            >
              {project.emoji}
            </div>
          </div>

          {/* Description */}
          <p className="text-[#64748b] text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[#94a3b8]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 mt-auto pt-2 border-t border-white/5">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 hover:scale-105"
              style={{
                color: project.color,
                borderColor: `${project.color}40`,
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = `${project.color}15`
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'
              }}
            >
              <Github className="w-4 h-4" />
              View Code
            </a>

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:brightness-110"
                style={{
                  backgroundColor: project.color,
                }}
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

interface ProjectsSectionProps {
  id?: string
}

export default function ProjectsSection({ id = 'projects' }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  const activeCategoryColor =
    activeCategory === 'All'
      ? '#00d4ff'
      : projects.find((p) => p.category === activeCategory)?.color ?? '#00d4ff'

  return (
    <section id={id} className="py-24 bg-[#000000] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#7c3aed]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#00d4ff]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[#00d4ff] text-sm font-medium uppercase tracking-widest mb-3 flex items-center justify-center gap-2"
          >
            <Code2 className="w-4 h-4" />
            What I&apos;ve Built
          </motion.p>

          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            Projects
          </h2>

          {/* Animated underline */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 rounded-full mx-auto"
            style={{ background: 'linear-gradient(to right, #00d4ff, #7c3aed)' }}
          />

          <p className="text-[#94a3b8] text-base mt-6 max-w-xl mx-auto">
            A selection of projects spanning machine learning, full stack development, and Zoho application development.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <Filter className="w-4 h-4 text-[#64748b]" />
          {categories.map((cat) => {
            const catColor =
              cat === 'All'
                ? '#00d4ff'
                : projects.find((p) => p.category === cat)?.color ?? '#00d4ff'
            const isActive = activeCategory === cat

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-105'
                )}
                style={
                  isActive
                    ? {
                        backgroundColor: catColor,
                        borderColor: catColor,
                        color: '#000000',
                        boxShadow: `0 0 16px ${catColor}60`,
                      }
                    : {
                        backgroundColor: 'transparent',
                        borderColor: `${catColor}40`,
                        color: catColor,
                      }
                }
              >
                {cat}
              </button>
            )
          })}
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-14"
        >
          <a
            href="https://github.com/shalinim1228"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10 hover:border-[#00d4ff]/60 transition-all duration-200 hover:scale-105"
          >
            <Github className="w-4 h-4" />
            View All Projects on GitHub
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
