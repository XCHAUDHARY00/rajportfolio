/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: '#EFECE6',       // Rishi-style warm off-white
          dark: '#121212',        // Rishi-style deep charcoal dark mode
          cardLight: '#FDFBF7',
          cardDark: '#18181A',
        },
        door: {
          navy: '#1E2B3E',        // Door 1: Deep Navy
          plum: '#3D2636',        // Door 2: Deep Wine / Plum
          sage: '#4D5D4E',        // Door 3: Sage Green
          terracotta: '#9E5B3E',  // Door 4: Terracotta Orange
        },
        brass: {
          light: '#ECC880',
          mid: '#BFA054',
          dark: '#7D5F1E',
          text: '#261C08',
        },
        warm: {
          bg: '#EFECE6',          // Warm ivory/cream canvas
          card: '#FFFFFF',        // Pure white card
          pill: '#E6E1D8',        // Soft beige pill
          pillHover: '#DDD6CA',   // Soft beige pill hover
          border: '#DCD4C7',      // Subtle warm border
          borderDark: '#CDC3B3',  // Slightly darker warm border
          title: '#1C1A18',       // Espresso charcoal heading
          body: '#5E5A53',        // Warm body text
          muted: '#8C877D',       // Subdued details / meta
          badge: '#EAF3EB',       // Sage green badge bg
          badgeText: '#2A5E3A',   // Sage green text
          badgeBorder: '#D1E6D6', // Sage green border
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'warm-card': '0 2px 14px -2px rgba(44, 40, 36, 0.04)',
        'warm-card-hover': '0 10px 28px -4px rgba(44, 40, 36, 0.07)',
        'door-deep': '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        'brass': '0 2px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
      },
    },
  },
  plugins: [],
}
