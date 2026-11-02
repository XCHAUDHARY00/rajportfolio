/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        warm: {
          bg: '#FAF7F2',          // Warm ivory/cream canvas
          card: '#FFFFFF',        // Pure white card
          pill: '#EFEBE3',        // Soft beige pill
          pillHover: '#E5DFD3',   // Soft beige pill hover
          border: '#EDE7DD',      // Subtle warm border
          borderDark: '#DFD7CA',  // Slightly darker warm border
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
      },
      boxShadow: {
        'warm-card': '0 2px 14px -2px rgba(44, 40, 36, 0.04)',
        'warm-card-hover': '0 10px 28px -4px rgba(44, 40, 36, 0.07)',
      },
    },
  },
  plugins: [],
}
