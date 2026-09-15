/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'Outfit', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#C6A15B',
          light: '#D8BE84',
          dark: '#A8843F',
        },
        forest: {
          DEFAULT: '#14392B',
          light: '#1E5140',
          dark: '#0D271D',
        },
        cream: '#F5F1E8',
      },
      letterSpacing: {
        'widest-xl': '0.25em',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.32, 0.72, 0, 1)',
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'scroll-bob': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.6' },
          '50%': { transform: 'translateY(6px)', opacity: '1' },
        },
      },
      animation: {
        'scroll-bob': 'scroll-bob 2s cubic-bezier(0.45, 0, 0.55, 1) infinite',
      },
    },
  },
  plugins: [],
}
