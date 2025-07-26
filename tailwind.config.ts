import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        // Custom screen size after 2xl (96rem/1536px)
        '3xl': '105rem', // 1680px
      },
      colors: {
        // Design system colors for Biduk-Biduk
        primary: {
          DEFAULT: '#027DB9',
          50: '#F0F9FF',
          100: '#E0F2FE', 
          500: '#027DB9',
          600: '#0369A1',
          700: '#0284C7',
        },
        secondary: {
          DEFAULT: '#1EA7CB',
          500: '#1EA7CB',
        },
        accent: {
          DEFAULT: '#F29D00',
          500: '#F29D00',
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        // Default font - Open Sans
        sans: ['var(--font-open-sans)', 'system-ui', 'sans-serif'],
        // Custom font for headers - Plant
        plant: ['var(--font-plant)', 'Plant', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
