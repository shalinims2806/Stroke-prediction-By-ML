'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, Database, Settings, Users, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface SkillEntry {
  name: string
  isAI?: boolean
  isNew?: boolean
}

interface SkillCategory {
  id: string
  label: string
  color: string
  skills: SkillEntry[]
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    label: 'Programming',
    color: '#00d4ff',
    skills: [
      { name: 'Python' },
      { name: 'Java' },
      { name: 'JavaScript' },
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'C' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    color: '#7c3aed',
    skills: [
      { name: 'MySQL' },
      { name: 'Oracle' },
    ],
  },
  {
    id: 'zoho',
    label: 'Zoho & AI',
    color: '#f97316',
    skills: [
      { name: 'Zoho Creator' },
      { name: 'Zoho CRM' },
      { name: 'Zoho Analytics' },
      { name: 'Zoho Books' },
      { name: 'Zoho Desk' },
      { name: 'Zoho Projects' },
      { name: 'Zoho Forms' },
      { name: 'Deluge' },
      { name: 'Zoho RPA', isAI: true, isNew: true },
      { name: 'Zoho MCP', isAI: true, isNew: true },
      { name: 'Zoho Agentic AI', isAI: true, isNew: true },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    color: '#22c55e',
    skills: [
      { name: 'Git' },
      { name: 'MS Excel' },
      { name: 'MS Word' },
    ],
  },
  {
    id: 'soft',
    label: 'Soft Skills',
    color: '#ec4899',
    skills: [
      { name: 'Problem-solving' },
      { name: 'Communication' },
      { name: 'Teamwork' },
      { name: 'Flexibility' },
    ],
  },
]

const categoryIconMap: Record<string, React.ElementType> = {
  programming: Code2,
  databases: Database,
  zoho: Zap,
  tools: Settings,
  soft: Users,
}

const allSkills = skillCategories.flatMap((cat) =>
  cat.skills.map((s) => ({ name: s.name, color: cat.color }))
)

/* ─── Neural Network SVG ─────────────────────────────────────────────────── */
const neuralNodes = [
  { cx: 80,  cy: 55  },
  { cx: 220, cy: 35  },
  { cx: 360, cy: 75  },
  { cx: 500, cy: 45  },
  { cx: 640, cy: 65  },
  { cx: 140, cy: 165 },
  { cx: 290, cy: 185 },
  { cx: 450, cy: 155 },
  { cx: 570, cy: 195 },
  { cx: 720, cy: 125 },
]

const neuralEdges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [1, 5], [1, 6], [2, 6],
  [2, 7], [3, 7], [3, 8], [4, 9],
  [5, 6], [6, 7], [7, 8], [8, 9],
]

function NeuralNetworkSVG() {
  return (
    <svg
      viewBox="0 0 800 240"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.06 }}
      aria-hidden
    >
      {neuralEdges.map(([a, b], i) => {
        const nodeA = neuralNodes[a]
        const nodeB = neuralNodes[b]
        const pathLen = Math.hypot(nodeB.cx - nodeA.cx, nodeB.cy - nodeA.cy)
        return (
          <motion.line
            key={i}
            x1={nodeA.cx}
            y1={nodeA.cy}
            x2={nodeB.cx}
            y2={nodeB.cy}
            stroke="#00d4ff"
            strokeWidth={1}
            strokeDasharray={pathLen}
            animate={{ strokeDashoffset: [pathLen, 0, -pathLen] }}
            transition={{
              duration: 3 + (i % 4) * 0.7,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.18,
            }}
          />
        )
      })}
      {neuralNodes.map((node, i) => (
        <motion.circle
          key={i}
          cx={node.cx}
          cy={node.cy}
          r={4}
          fill="#00d4ff"
          animate={{ r: [3, 5, 3], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2 + (i % 3) * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.28,
          }}
        />
      ))}
    </svg>
  )
}

/* ─── Skill Badge Card ───────────────────────────────────────────────────── */
function SkillBadge({ skill, color, index }: { skill: SkillEntry; color: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{
        scale: 1.08,
        y: -4,
        boxShadow: `0 0 22px ${color}55, 0 0 44px ${color}20`,
      }}
      className="relative flex items-center gap-2.5 px-4 py-3 rounded-xl cursor-default select-none group"
      style={{
        background: `${color}0e`,
        border: `1px solid ${color}30`,
        backdropFilter: 'blur(12px)',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
      }}
    >
      {/* Left accent dot */}
      <motion.span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
        transition={{
          duration: 2.2 + (index % 4) * 0.4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.15,
        }}
      />

      {/* Skill name */}
      <span
        className="font-semibold text-sm text-white leading-none"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {skill.name}
      </span>

      {/* AI badge */}
      {skill.isAI && (
        <span
          className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none"
          style={{
            background: 'rgba(249,115,22,0.18)',
            border: '1px solid rgba(249,115,22,0.5)',
            color: '#f97316',
          }}
        >
          AI
        </span>
      )}

      {/* NEW badge */}
      {skill.isNew && (
        <motion.span
          animate={{ opacity: [1, 0.35, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none"
          style={{
            background: 'rgba(236,72,153,0.18)',
            border: '1px solid rgba(236,72,153,0.5)',
            color: '#ec4899',
          }}
        >
          NEW
        </motion.span>
      )}

      {/* Hover glow sweep */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${color}12, transparent 60%)`,
          transition: 'opacity 0.25s ease',
        }}
      />
    </motion.div>
  )
}

/* ─── Tag Cloud ──────────────────────────────────────────────────────────── */
function TagCloud() {
  return (
    <div className="flex flex-wrap justify-center gap-2.5 mt-4">
      {allSkills.map((item, i) => (
        <motion.span
          key={`tag-${item.name}-${i}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.35, delay: i * 0.028 }}
          whileHover={{
            scale: 1.12,
            boxShadow: `0 0 16px ${item.color}70, 0 0 32px ${item.color}30`,
            y: -3,
          }}
          style={{
            background: `${item.color}12`,
            border: `1px solid ${item.color}35`,
            color: item.color,
            fontFamily: 'Inter, sans-serif',
          }}
          className="cursor-default px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm select-none transition-all duration-200"
        >
          {item.name}
        </motion.span>
      ))}
    </div>
  )
}

/* ─── Main Section ───────────────────────────────────────────────────────── */
export default function SkillsSection({ id = 'skills' }: { id?: string }) {
  const [activeTab, setActiveTab] = useState<string>('programming')

  const activeCategory = skillCategories.find((c) => c.id === activeTab)!

  return (
    <section id={id} className="relative py-24 bg-[#000000] overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.035) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden
      />

      {/* Ambient glow orbs */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)', filter: 'blur(50px)' }}
        aria-hidden
      />
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)', filter: 'blur(50px)' }}
        aria-hidden
      />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
        <span
          className="font-black tracking-widest text-white"
          style={{ fontFamily: 'Orbitron,sans-serif', fontSize: 'clamp(4rem, 18vw, 14rem)', opacity: 0.03, lineHeight: 1 }}
        >
          SKILLS
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4"
            style={{ fontFamily: 'Orbitron,sans-serif' }}
          >
            Skills &{' '}
            <span style={{ color: '#00d4ff' }}>Technologies</span>
          </h2>

          <div className="flex justify-center mt-4">
            <motion.div
              className="h-1 rounded-full"
              style={{ background: 'linear-gradient(90deg, #00d4ff, #7c3aed, #ec4899)' }}
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 200, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
            />
          </div>

          <p
            className="mt-6 text-[#94a3b8] text-base max-w-xl mx-auto"
            style={{ fontFamily: 'Inter,sans-serif' }}
          >
            A spectrum of technical and interpersonal capabilities powering every project.
          </p>
        </motion.div>

        {/* ── Category tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {skillCategories.map((cat) => {
            const Icon = categoryIconMap[cat.id]
            const isActive = activeTab === cat.id
            return (
              <motion.button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className={cn(
                  'relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-colors duration-300 focus:outline-none',
                  !isActive && 'text-[#94a3b8] border-white/10 hover:text-white hover:border-white/20'
                )}
                style={{
                  fontFamily: 'Inter,sans-serif',
                  background: isActive ? `${cat.color}18` : 'rgba(255,255,255,0.03)',
                  borderColor: isActive ? `${cat.color}55` : undefined,
                  color: isActive ? cat.color : undefined,
                  boxShadow: isActive ? `0 0 18px ${cat.color}35, 0 0 6px ${cat.color}15` : undefined,
                }}
              >
                <Icon size={15} style={{ color: isActive ? cat.color : undefined }} />
                {cat.label}
              </motion.button>
            )
          })}
        </motion.div>

        {/* ── Tab content ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.42, ease: 'easeOut' }}
          >
            {/* Card wrapper with neural net background */}
            <div
              className="relative rounded-2xl overflow-hidden p-6 sm:p-8"
              style={{
                background: 'rgba(10,20,50,0.55)',
                border: `1px solid ${activeCategory.color}20`,
                backdropFilter: 'blur(20px)',
                boxShadow: `0 0 40px ${activeCategory.color}08`,
              }}
            >
              {/* Neural network overlay */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <NeuralNetworkSVG />
              </div>

              {/* Category heading row */}
              <div className="relative z-10 flex items-center gap-3 mb-8">
                {(() => {
                  const Icon = categoryIconMap[activeCategory.id]
                  return (
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.2 }}
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: `${activeCategory.color}1a`,
                        border: `1px solid ${activeCategory.color}55`,
                        boxShadow: `0 0 14px ${activeCategory.color}30`,
                      }}
                    >
                      <Icon size={18} style={{ color: activeCategory.color }} />
                    </motion.div>
                  )
                })()}
                <span
                  className="text-lg font-bold"
                  style={{ fontFamily: 'Orbitron,sans-serif', color: activeCategory.color }}
                >
                  {activeCategory.label}
                </span>
                <span
                  className="ml-auto text-xs font-mono text-[#64748b]"
                  style={{ fontFamily: 'Inter,sans-serif' }}
                >
                  {activeCategory.skills.length} skill
                  {activeCategory.skills.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Skills badge grid */}
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {activeCategory.skills.map((skill, i) => (
                  <SkillBadge
                    key={skill.name}
                    skill={skill}
                    color={activeCategory.color}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Tag cloud ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16"
        >
          <p
            className="text-center text-[10px] text-[#64748b] uppercase tracking-[0.25em] font-semibold mb-5"
            style={{ fontFamily: 'Orbitron,sans-serif' }}
          >
            All Technologies
          </p>
          <TagCloud />
        </motion.div>
      </div>
    </section>
  )
}
