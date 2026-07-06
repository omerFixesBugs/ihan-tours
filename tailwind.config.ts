import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#f5f5f7",
        brand: {
          red: "#e8192c",
          redDark: "#c41524",
        },
        gold: {
          400: "#d4af37",
          500: "#c5a028",
        },
        luxury: {
          sky: "#d4e4ed",
          cream: "#f5f0e8",
        },
        ink: "#2d2926",
      },
      letterSpacing: {
        superwide: "0.25em",
        ultra: "0.4em",
        display: "0.12em",
      },
      fontFamily: {
        sans: ["var(--font-unbounded)", "system-ui", "sans-serif"],
        display: ["var(--font-unbounded)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-sm": ["clamp(2rem,5vw,3.5rem)", { lineHeight: "1", letterSpacing: "0.04em" }],
        "display-md": ["clamp(2.5rem,7vw,5rem)", { lineHeight: "0.95", letterSpacing: "0.03em" }],
        "display-lg": ["clamp(3rem,9vw,6.5rem)", { lineHeight: "0.9", letterSpacing: "0.02em" }],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
