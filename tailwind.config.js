/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#000000',
          light: '#121212'
        },
        primary: {
          light: '#60A5FA',
          DEFAULT: '#3B82F6',
          dark: '#2563EB'
        },
        secondary: {
          light: '#93C5FD',
          DEFAULT: '#60A5FA',
          dark: '#3B82F6'
        },
        accent: {
          light: '#38BDF8',
          DEFAULT: '#0EA5E9',
          dark: '#0284C7'
        },
        success: {
          light: '#4ADE80',
          DEFAULT: '#22C55E',
          dark: '#16A34A'
        },
        warning: {
          light: '#FCD34D',
          DEFAULT: '#F59E0B',
          dark: '#D97706'
        },
        error: {
          light: '#FB7185',
          DEFAULT: '#EF4444',
          dark: '#DC2626'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Orbitron', 'sans-serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'rotate-slow': 'rotate 15s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'wave': 'wave 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': {
            textShadow: '0 0 5px rgba(255,255,255,0.5), 0 0 10px rgba(255,255,255,0.4)',
          },
          '100%': {
            textShadow:
              '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.4)',
          }
        },
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(15deg)' },
          '75%': { transform: 'rotate(-15deg)' }
        }
      },
      boxShadow: {
        'glow': '0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)',
        'glow-blue': '0 0 15px rgba(59, 130, 246, 0.5), 0 0 30px rgba(37, 99, 235, 0.3)',
        'glow-rainbow': '0 0 15px #f472b6, 0 0 25px #60a5fa, 0 0 35px #a78bfa',
      }
    },
  },
  plugins: [],
};
