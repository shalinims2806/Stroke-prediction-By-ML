import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00d4ff',
          50: '#e0faff',
          100: '#b3f4ff',
          200: '#80edff',
          300: '#4de6ff',
          400: '#26dfff',
          500: '#00d4ff',
          600: '#00aed4',
          700: '#0088a8',
          800: '#00627c',
          900: '#003c50',
        },
        secondary: {
          DEFAULT: '#7c3aed',
          50: '#f0ebff',
          100: '#d4c5ff',
          200: '#b89fff',
          300: '#9c79ff',
          400: '#8a5af3',
          500: '#7c3aed',
          600: '#6620d4',
          700: '#5010ab',
          800: '#3a0882',
          900: '#240459',
        },
        accent: {
          DEFAULT: '#ec4899',
          50: '#fde8f3',
          100: '#fbbfe0',
          200: '#f896cc',
          300: '#f56cb8',
          400: '#f254a8',
          500: '#ec4899',
          600: '#d42e80',
          700: '#ab1a63',
          800: '#820d49',
          900: '#59052f',
        },
        dark: {
          DEFAULT: '#0a0a0f',
          50: '#1a1a2e',
          100: '#16213e',
          200: '#0f3460',
          300: '#0d1b2a',
          400: '#0a0a1a',
          500: '#0a0a0f',
          900: '#050508',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        scan: 'scan 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 40px #00d4ff',
          },
          '50%': {
            opacity: '0.7',
            boxShadow: '0 0 20px #00d4ff, 0 0 40px #00d4ff, 0 0 80px #00d4ff',
          },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)',
        'cyber-gradient':
          'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #0a0a0f 100%)',
      },
    },
  },
  plugins: [],
}

export default config
