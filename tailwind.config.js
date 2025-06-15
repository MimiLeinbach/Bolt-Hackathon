/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Adventure-themed color palette with sophisticated greens
        adventure: {
          50: '#f0fdf4',   // Lightest mint
          100: '#dcfce7',  // Light mint
          200: '#bbf7d0',  // Soft mint
          300: '#86efac',  // Fresh mint
          400: '#4ade80',  // Vibrant green
          500: '#22c55e',  // Main adventure green
          600: '#16a34a',  // Deep forest
          700: '#15803d',  // Dark forest
          800: '#166534',  // Deep woods
          900: '#14532d',  // Darkest forest
        },
        // Complementary warm tones
        sunset: {
          50: '#fff7ed',   // Light cream
          100: '#ffedd5',  // Warm cream
          200: '#fed7aa',  // Light peach
          300: '#fdba74',  // Soft orange
          400: '#fb923c',  // Warm orange
          500: '#f97316',  // Vibrant orange
          600: '#ea580c',  // Deep orange
          700: '#c2410c',  // Burnt orange
          800: '#9a3412',  // Dark burnt
          900: '#7c2d12',  // Darkest burnt
        },
        // Sky blues for contrast
        sky: {
          50: '#f0f9ff',   // Lightest sky
          100: '#e0f2fe',  // Light sky
          200: '#bae6fd',  // Soft blue
          300: '#7dd3fc',  // Fresh blue
          400: '#38bdf8',  // Bright blue
          500: '#0ea5e9',  // Main sky blue
          600: '#0284c7',  // Deep blue
          700: '#0369a1',  // Dark blue
          800: '#075985',  // Deep ocean
          900: '#0c4a6e',  // Darkest blue
        },
        // Earthy browns
        earth: {
          50: '#fafaf9',   // Light sand
          100: '#f5f5f4',  // Warm white
          200: '#e7e5e4',  // Light stone
          300: '#d6d3d1',  // Soft stone
          400: '#a8a29e',  // Medium stone
          500: '#78716c',  // Dark stone
          600: '#57534e',  // Deep earth
          700: '#44403c',  // Rich earth
          800: '#292524',  // Dark earth
          900: '#1c1917',  // Darkest earth
        },
        // Updated primary to use adventure green
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Sophisticated grays with warm undertones
        gray: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(34, 197, 94, 0.07), 0 10px 20px -2px rgba(34, 197, 94, 0.04)',
        'medium': '0 4px 25px -5px rgba(34, 197, 94, 0.1), 0 10px 10px -5px rgba(34, 197, 94, 0.04)',
        'adventure': '0 4px 20px -2px rgba(34, 197, 94, 0.15), 0 8px 16px -4px rgba(249, 115, 22, 0.1)',
        'whimsical': '0 8px 32px -8px rgba(34, 197, 94, 0.2), 0 0 0 1px rgba(34, 197, 94, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      backgroundImage: {
        'adventure-gradient': 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 25%, #bbf7d0 50%, #86efac 75%, #4ade80 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 25%, #fed7aa 50%, #fdba74 75%, #fb923c 100%)',
        'sky-gradient': 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #bae6fd 50%, #7dd3fc 75%, #38bdf8 100%)',
        'whimsical-gradient': 'linear-gradient(135deg, #f0fdf4 0%, #fff7ed 25%, #f0f9ff 50%, #dcfce7 75%, #e0f2fe 100%)',
      },
    },
  },
  plugins: [],
}