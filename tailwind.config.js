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
        'xs': '13.5px',
        'sm': '0.9375rem',
        'md': '1.0625rem',
        'base': '16px',
        'lg': '1.1875rem',
        'xl': '1.3125rem',
        '2xl': '1.5625rem',
        '3xl': '1.9375rem',
        '4xl': '2.3125rem',
        '5xl': '3.0625rem',
      },
      fontFamily: {
        lora: ['Lora'],
        'cabinet-grotesk': ['Cabinet Grotesk', 'sans-serif'],
        grotesk: ['Cabinet Grotesk', 'sans-serif'],
      },
      keyframes: {
        fadeInOut: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in-out": "fadeInOut 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [
    heroui(),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
    require("tailwindcss-debug-screens"),
  ],
};
