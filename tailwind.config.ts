import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Theme 1: Élégance Minimaliste
        theme1: {
          bg: "#F5F5F5",
          text: "#000000",
          textAlt: "#333333",
          button: "#D3D3D3",
          buttonBorder: "#000000",
        },
        // Theme 2: Vibrant et Dynamique
        theme2: {
          bg: "#E5E5E5",
          text: "#000000",
          textAlt: "#007BFF",
          button: "#FF6347",
          buttonHover: "#007BFF",
        },
        // Theme 3: Nature et Harmonie
        theme3: {
          bg: "#E0E7E9",
          text: "#004D40",
          textAlt: "#4E342E",
          button: "#8BC34A",
          buttonHover: "#795548",
        },
      },
      fontFamily: {
        helvetica: ["Helvetica", "Arial", "sans-serif"],
        serif: ["Times New Roman", "Georgia", "serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;