/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,astro}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Instrument Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', '"Instrument Sans"', 'sans-serif'],
      },
      colors: {
        navy: {
          DEFAULT: '#0c2340',
          light: '#163860',
          dark: '#08172b',
        },
        forest: {
          DEFAULT: '#0c2340',
          light: '#163860',
          dark: '#08172b',
        },
        gold: {
          DEFAULT: '#C6A15B',
          light: '#D8BE84',
          dark: '#A8843F',
        },
        cream: '#f0f4f8',
        ice: '#e8eef5',
      },
      backgroundImage: {
        'cool-gradient': 'linear-gradient(160deg, #f0f4f8 0%, #e8eef5 55%, #f0f4f8 100%)',
        'navy-gradient': 'linear-gradient(160deg, #0c2340 0%, #08172b 100%)',
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
