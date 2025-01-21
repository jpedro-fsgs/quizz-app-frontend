const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "#E6B3B7",
        input: "#E6B3B7",
        ring: "#CC2D3A",
        background: "#FFFAF0",
        foreground: "#4D1A1F",
        primary: {
          DEFAULT: "#CC2D3A",
          foreground: "#FFFAF0",
        },
        secondary: {
          DEFAULT: "#FFF5E6",
          foreground: "#4D1A1F",
        },
        destructive: {
          DEFAULT: "#E63946",
          foreground: "#FFFAF0",
        },
        muted: {
          DEFAULT: "#F2D9DB",
          foreground: "#A65D66",
        },
        accent: {
          DEFAULT: "#8a0000",
          foreground: "#FFFAF0",
        },
        popover: {
          DEFAULT: "#FFFDF8",
          foreground: "#4D1A1F",
        },
        card: {
          DEFAULT: "#FFFDF8",
          foreground: "#4D1A1F",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--background': theme('colors.background'),
          '--foreground': theme('colors.foreground'),
          '--card': theme('colors.card.DEFAULT'),
          '--card-foreground': theme('colors.card.foreground'),
          '--popover': theme('colors.popover.DEFAULT'),
          '--popover-foreground': theme('colors.popover.foreground'),
          '--primary': theme('colors.primary.DEFAULT'),
          '--primary-foreground': theme('colors.primary.foreground'),
          '--secondary': theme('colors.secondary.DEFAULT'),
          '--secondary-foreground': theme('colors.secondary.foreground'),
          '--muted': theme('colors.muted.DEFAULT'),
          '--muted-foreground': theme('colors.muted.foreground'),
          '--accent': theme('colors.accent.DEFAULT'),
          '--accent-foreground': theme('colors.accent.foreground'),
          '--destructive': theme('colors.destructive.DEFAULT'),
          '--destructive-foreground': theme('colors.destructive.foreground'),
          '--border': theme('colors.border'),
          '--input': theme('colors.input'),
          '--ring': theme('colors.ring'),
          '--radius': theme('borderRadius.lg'),
        },
        '.dark': {
          '--background': '#1A1D24',
          '--foreground': '#FFFAF0',
          '--card': '#24282F',
          '--card-foreground': '#FFFAF0',
          '--popover': '#24282F',
          '--popover-foreground': '#FFFAF0',
          '--primary': '#E64D59',
          '--primary-foreground': '#FFFAF0',
          '--secondary': '#2F333A',
          '--secondary-foreground': '#FFFAF0',
          '--muted': '#3A3F47',
          '--muted-foreground': '#B3B8C2',
          '--accent': '#8C2A32',
          '--accent-foreground': '#FFFAF0',
          '--destructive': '#E63946',
          '--destructive-foreground': '#FFFAF0',
          '--border': '#3A3F47',
          '--input': '#3A3F47',
          '--ring': '#E64D59',
        },
      });
    },
  ],
}

