'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  isLoading: boolean
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {/* Name with glitch-style animation */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(1.875rem, 6vw, 3.75rem)',
              fontWeight: 900,
              color: '#00d4ff',
              letterSpacing: '0.15em',
              textShadow:
                '0 0 20px rgba(0,212,255,0.8), 0 0 40px rgba(0,212,255,0.4)',
              position: 'relative',
              userSelect: 'none',
            }}
          >
            <motion.span
              animate={{
                textShadow: [
                  '0 0 20px rgba(0,212,255,0.8), 0 0 40px rgba(0,212,255,0.4)',
                  '2px 0 0 rgba(236,72,153,0.8), -2px 0 0 rgba(124,58,237,0.8)',
                  '0 0 20px rgba(0,212,255,0.8), 0 0 40px rgba(0,212,255,0.4)',
                ],
              }}
              transition={{
                duration: 0.15,
                repeat: Infinity,
                repeatDelay: 2.5,
              }}
            >
              SHALINI.M
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              color: '#94a3b8',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}
          >
            INITIALIZING...
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            style={{
              width: '240px',
              backgroundColor: '#1f2937',
              borderRadius: '9999px',
              height: '4px',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.5, duration: 2, ease: 'easeInOut' }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #00d4ff, #7c3aed)',
                borderRadius: '9999px',
                boxShadow: '0 0 8px rgba(0,212,255,0.6)',
              }}
            />
          </motion.div>

          {/* Animated dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
                style={{
                  width: '6px',
                  height: '6px',
                  backgroundColor: '#00d4ff',
                  borderRadius: '50%',
                  boxShadow: '0 0 6px rgba(0,212,255,0.8)',
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
