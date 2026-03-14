import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "hsl(var(--brand) / <alpha-value>)",
        "brand-foreground": "hsl(var(--brand-foreground) / <alpha-value>)",
        "dora-start": "var(--dora-start)",
        "dora-end": "var(--dora-end)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        destructive: "hsl(var(--destructive))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        muted: "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        /* Dashboard palette (theme-aware in app) */
        "dashboard-arrived": "hsl(var(--dashboard-arrived))",
        "dashboard-ready": "hsl(var(--dashboard-ready))",
        "dashboard-provider": "hsl(var(--dashboard-provider))",
        "chart-1": "hsl(var(--chart-1))",
        "chart-2": "hsl(var(--chart-2))",
        "chart-3": "hsl(var(--chart-3))",
        "chart-4": "hsl(var(--chart-4))",
        "chart-5": "hsl(var(--chart-5))",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        friendly: ["var(--font-friendly)", "var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        sm: "calc(var(--radius) - 2px)",
        lg: "calc(var(--radius) + 2px)",
        "2xl": "1rem",
      },
      backdropBlur: {
        glass: "12px",
        "glass-lg": "24px",
      },
      transitionDuration: {
        micro: "200ms",
        gentle: "300ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
