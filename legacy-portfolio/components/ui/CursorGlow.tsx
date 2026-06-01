'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'

export default function CursorGlow() {
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const { x, y } = useMousePosition()

  const springConfig = { stiffness: 80, damping: 20, mass: 0.5 }

  const glowX = useSpring(useMotionValue(0), springConfig)
  const glowY = useSpring(useMotionValue(0), springConfig)

  const cursorX = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 })
  const cursorY = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 })

  useEffect(() => {
    const isTouching =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    setIsTouchDevice(isTouching)
  }, [])

  useEffect(() => {
    if (x !== null && y !== null) {
      glowX.set(x - 150)
      glowY.set(y - 150)
      cursorX.set(x - 6)
      cursorY.set(y - 6)
    }
  }, [x, y, glowX, glowY, cursorX, cursorY])

  if (isTouchDevice) return null

  return (
    <>
      {/* Outer glow */}
      <motion.div
        style={{
          left: glowX,
          top: glowY,
          width: 300,
          height: 300,
          background:
            'radial-gradient(circle, rgba(0,212,255,0.25) 0%, transparent 70%)',
          opacity: 0.15,
          zIndex: 9999,
          pointerEvents: 'none',
          filter: 'blur(24px)',
          position: 'fixed',
          borderRadius: '50%',
          mixBlendMode: 'screen',
        }}
      />
      {/* Inner cursor dot */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          width: 12,
          height: 12,
          backgroundColor: '#00d4ff',
          borderRadius: '50%',
          position: 'fixed',
          zIndex: 9999,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
          boxShadow: '0 0 8px rgba(0,212,255,0.8)',
        }}
      />
    </>
  )
}
