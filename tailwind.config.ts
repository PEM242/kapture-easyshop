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
        store: {
          retail: "hsl(var(--store-retail))",
          restaurant: "hsl(var(--store-restaurant))",
          artisan: "hsl(var(--store-artisan))",
        },
        themes: {
          retail: {
            1: {
              primary: "#000000",
              secondary: "#808080",
              background: "#ffffff",
              footer: "#000000",
              footerText: "#808080",
              buttonBg: "#808080",
              buttonText: "#000000",
              buttonHover: "#666666",
            },
            2: {
              primary: "#0000FF",
              secondary: "#ADD8E6",
              background: "#ffffff",
              footer: "#ADD8E6",
              footerText: "#0000FF",
              buttonBg: "#ADD8E6",
              buttonText: "#ffffff",
              buttonHover: "#0000CC",
            },
            3: {
              primary: "#32CD32",
              secondary: "#98FB98",
              background: "#ffffff",
              footer: "#98FB98",
              footerText: "#32CD32",
              buttonBg: "#98FB98",
              buttonText: "#ffffff",
              buttonHover: "#2AB02A",
            },
          },
          restaurant: {
            1: {
              primary: "#000000",
              secondary: "#A9A9A9",
              background: "#ffffff",
              footer: "#A9A9A9",
              footerText: "#000000",
              buttonBg: "#000000",
              buttonText: "#ffffff",
              buttonHover: "#333333",
            },
            2: {
              primary: "#FF4500",
              secondary: "#FFA07A",
              background: "#ffffff",
              footer: "#FFA07A",
              footerText: "#FF4500",
              buttonBg: "#FFA07A",
              buttonText: "#ffffff",
              buttonHover: "#CC3700",
            },
            3: {
              primary: "#808000",
              secondary: "#F5F5DC",
              background: "#ffffff",
              footer: "#F5F5DC",
              footerText: "#808000",
              buttonBg: "#F5F5DC",
              buttonText: "#808000",
              buttonHover: "#666600",
            },
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
