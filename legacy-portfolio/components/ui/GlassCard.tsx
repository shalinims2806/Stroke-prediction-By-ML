'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glowColor?: 'cyan' | 'purple' | 'pink' | 'orange' | 'green'
  onClick?: () => void
  style?: React.CSSProperties
}

const glowColorMap: Record<NonNullable<GlassCardProps['glowColor']>, string> = {
  cyan: 'rgba(0,212,255,0.3)',
  purple: 'rgba(124,58,237,0.3)',
  pink: 'rgba(236,72,153,0.3)',
  orange: 'rgba(249,115,22,0.3)',
  green: 'rgba(34,197,94,0.3)',
}

const glowBorderMap: Record<NonNullable<GlassCardProps['glowColor']>, string> = {
  cyan: 'rgba(0,212,255,0.4)',
  purple: 'rgba(124,58,237,0.4)',
  pink: 'rgba(236,72,153,0.4)',
  orange: 'rgba(249,115,22,0.4)',
  green: 'rgba(34,197,94,0.4)',
}

export default function GlassCard({
  children,
  className,
  hover = true,
  glowColor = 'cyan',
  onClick,
  style,
}: GlassCardProps) {
  const resolvedGlow = glowColorMap[glowColor]
  const resolvedBorder = glowBorderMap[glowColor]

  const hoverProps = hover
    ? {
        whileHover: {
          y: -4,
          boxShadow: `0 0 30px ${resolvedGlow}, 0 0 60px ${resolvedGlow.replace('0.3', '0.15')}`,
          borderColor: resolvedBorder,
        },
      }
    : {}

  return (
    <motion.div
      {...hoverProps}
      onClick={onClick}
      style={style}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      initial={{
        boxShadow: '0 0 0px transparent',
        borderColor: 'rgba(255,255,255,0.1)',
      }}
      className={cn(
        'backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
