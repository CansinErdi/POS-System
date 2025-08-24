/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf3f1',
          100: '#fae0db',
          200: '#f6c1b6',
          300: '#f0a392',
          400: '#e8856e',
          500: '#E07A5F', // Primary
          600: '#d05e42',
          700: '#b54932',
          800: '#9c3e2d',
          900: '#87392b',
          950: '#491b14',
        },
        secondary: {
          50: '#f3f7f5',
          100: '#dfeae5',
          200: '#c1d7ce',
          300: '#a2c2b3',
          400: '#81B29A', // Secondary
          500: '#5e9478',
          600: '#487860',
          700: '#3c614f',
          800: '#345043',
          900: '#2e433a',
          950: '#16241e',
        },
        accent: {
          50: '#fefbf3',
          100: '#fcf6e6',
          200: '#f9ecc9',
          300: '#F2CC8F', // Accent
          400: '#ebb352',
          500: '#e69d2f',
          600: '#d08121',
          700: '#ac611e',
          800: '#8c4e20',
          900: '#734220',
          950: '#3f200e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
};