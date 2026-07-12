/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // dark mode is default anyway, but good to have
  theme: {
    extend: {
      colors: {
        background: '#050505',
        panel: '#0d0d0d',
        'panel-border': '#1e1e1e',
        primary: {
          DEFAULT: '#3b82f6', // electric blue
          glow: '#00F0FF',
        },
        accent: {
          buy: '#10b981', // emerald green
          sell: '#ef4444', // red
          hold: '#f5a623', // gold / hold
          premium: '#d4af37', // gold premium
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(59, 130, 246, 0.15)',
        'glow-accent-buy': '0 0 20px rgba(16, 185, 129, 0.2)',
        'glow-accent-sell': '0 0 20px rgba(239, 68, 68, 0.2)',
        'glow-accent-hold': '0 0 20px rgba(245, 166, 35, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
