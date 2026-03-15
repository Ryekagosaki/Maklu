import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        arabic: ["'Amiri'", "serif"],
      },
      colors: {
        neon: {
          green:  "#00ff88",
          cyan:   "#00d4ff",
          purple: "#bf00ff",
          pink:   "#ff0080",
          gold:   "#ffd700",
          orange: "#ff6b00",
        },
        cyber: {
          50:  "#f0fdf4",
          100: "#00ff8815",
          200: "#00ff8830",
          300: "#00ff8850",
          400: "#00ff88",
          500: "#00cc6a",
          600: "#009950",
          700: "#006635",
          800: "#003319",
          900: "#001a0d",
        },
        dark: {
          50:  "#f8f9fa",
          100: "#0a0a12",
          200: "#08080f",
          300: "#06060c",
          400: "#040409",
          500: "#020206",
        },
        gold: {
          300: "#fde68a",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
      },
      backgroundImage: {
        "cyber-gradient": "linear-gradient(135deg, #020206 0%, #0a0a1f 50%, #020206 100%)",
        "neon-gradient":  "linear-gradient(135deg, #00ff88 0%, #00d4ff 50%, #bf00ff 100%)",
        "gold-gradient":  "linear-gradient(135deg, #ffd700 0%, #f59e0b 50%, #d97706 100%)",
        "card-cyber":     "linear-gradient(135deg, rgba(0,255,136,0.05) 0%, rgba(2,2,6,0.9) 100%)",
      },
      boxShadow: {
        neon:       "0 0 20px rgba(0,255,136,0.4), 0 0 60px rgba(0,255,136,0.15)",
        "neon-sm":  "0 0 10px rgba(0,255,136,0.3)",
        "neon-lg":  "0 0 40px rgba(0,255,136,0.5), 0 0 80px rgba(0,255,136,0.2)",
        cyan:       "0 0 20px rgba(0,212,255,0.4), 0 0 40px rgba(0,212,255,0.15)",
        gold:       "0 0 20px rgba(245,158,11,0.4), 0 0 40px rgba(245,158,11,0.15)",
        purple:     "0 0 20px rgba(191,0,255,0.4)",
        glass:      "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(0,255,136,0.05)",
      },
      animation: {
        "matrix":      "matrix 20s linear infinite",
        "pulse-neon":  "pulseNeon 2s ease-in-out infinite",
        "float":       "float 6s ease-in-out infinite",
        "glitch":      "glitch 3s infinite",
        "scan":        "scan 4s linear infinite",
        "spin-slow":   "spin 15s linear infinite",
        "morph":       "morph 8s ease-in-out infinite",
        "flicker":     "flicker 4s linear infinite",
      },
      keyframes: {
        pulseNeon: {
          "0%,100%": { boxShadow: "0 0 10px rgba(0,255,136,0.3)" },
          "50%":     { boxShadow: "0 0 40px rgba(0,255,136,0.8), 0 0 80px rgba(0,255,136,0.3)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-20px)" },
        },
        glitch: {
          "0%,100%":  { transform: "translate(0)" },
          "20%":      { transform: "translate(-2px, 2px)" },
          "40%":      { transform: "translate(-2px, -2px)" },
          "60%":      { transform: "translate(2px, 2px)" },
          "80%":      { transform: "translate(2px, -2px)" },
        },
        scan: {
          "0%":   { top: "0%" },
          "100%": { top: "100%" },
        },
        morph: {
          "0%,100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%":     { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
        flicker: {
          "0%,19%,21%,23%,25%,54%,56%,100%": { opacity: "1" },
          "20%,24%,55%":                       { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
