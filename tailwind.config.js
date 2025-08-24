const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      height: {
        screen: '100dvh',
      },
      borderWidth: {
        1: '1px',
      },
      colors: {
        primary: {
          DEFAULT: '#FF6F00',  // Bright Orange
          dark: '#EA580C',     // Darker Orange
          light: '#FDBA74',    // Soft Orange
        },
        black: {
          DEFAULT: '#0F0F0F',  // Deep Black
        },
        white: {
          DEFAULT: '#FFFFFF',  // Pure White
        },
        gray: {
          light: '#F3F4F6',     // Light Gray (for backgrounds)
          text: '#1F2937',      // Charcoal (text base)
          border: '#D1D5DB',    // Subtle border gray
        },
        input: {
          DEFAULT: '#F97316',
          focus: '#EA580C'
        },
        "danger": "#CB1A14",
        "gray-200": "#f6f6f6",
        'error-400': '#D42620',
        'error-500': '#CB1A14',

        "blue": "#005FCF",
        "success": "#019712",
      },
      fontSize: {
        'xs': '13px',
        'sm': '0.875rem',
        'md': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      fontFamily: {
        lora: ['Lora'],
      },
    },
  },
  plugins: [
    heroui(),
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar"),
    require("tailwindcss-debug-screens"),
  ],
};
