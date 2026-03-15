/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#1a1a1a',
          500: '#ff6b35',
          600: '#e55a2b',
          700: '#cc4e21',
        },
        secondary: {
          500: '#00d4aa',
          600: '#00b894',
        },
        dark: {
          900: '#0a0a0a',
          800: '#1a1a1a',
          700: '#2a2a2a',
          600: '#3a3a3a',
          500: '#4a4a4a',
        },
        gray: {
          900: '#111111',
          800: '#1f1f1f',
          700: '#2d2d2d',
          600: '#404040',
          500: '#525252',
          400: '#737373',
          300: '#a3a3a3',
          200: '#d4d4d4',
          100: '#f5f5f5',
          50: '#fafafa',
        }
      },
      fontFamily: {
        arabic: ['Noto Sans Arabic', 'sans-serif'],
      },
      backgroundImage: {
        'gym-gradient': 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #00d4aa 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)',
      }
    },
  },
  plugins: [],
}