/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef2fb',
          100: '#d5ddf3',
          200: '#adbce7',
          300: '#7f92d6',
          400: '#5468c0',
          500: '#3b4aa3',
          600: '#2c3780',
          700: '#212a63',
          800: '#161c45',
          900: '#0c1030',
          950: '#070a20',
        },
        electric: {
          50: '#eef4ff',
          100: '#dbeafe',
          DEFAULT: '#2563ff',
          400: '#4d7cff',
          500: '#2563ff',
          600: '#1a4de0',
          900: '#1e3a8a',
        },
        cyan: {
          DEFAULT: '#22d3ee',
          400: '#38dcf3',
          500: '#22d3ee',
        },
        violet: {
          DEFAULT: '#8b5cf6',
          400: '#a78bfa',
          500: '#8b5cf6',
        },
      },
      fontFamily: {
        fa: ['var(--font-vazirmatn)', 'system-ui', 'sans-serif'],
        en: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(37,99,255,0.25), 0 8px 40px -8px rgba(37,99,255,0.45)',
        'glow-cyan':
          '0 0 0 1px rgba(34,211,238,0.3), 0 8px 40px -8px rgba(34,211,238,0.5)',
        soft: '0 10px 40px -12px rgba(12,16,48,0.18)',
        'soft-dark': '0 10px 40px -8px rgba(0,0,0,0.6)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-slow': {
          '0%,100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-18px) translateX(6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '80%,100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        shimmer: 'shimmer 8s ease infinite',
        'pulse-ring': 'pulse-ring 2.5s cubic-bezier(0.4,0,0.2,1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;;
