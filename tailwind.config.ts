import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./config/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        yuj: {
          purple: "#3b1368",
          plum: "#5f2a86",
          lavender: "#d9c8ff",
          lilac: "#f3edff",
          cream: "#fff8ec",
          gold: "#c59a46",
          ink: "#21152d",
          mist: "#fbf8ff",
          peach: "#ffe1cf"
        }
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        sans: ["var(--font-body)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 80px rgba(95, 42, 134, 0.18)",
        gold: "0 18px 44px rgba(197, 154, 70, 0.24)"
      }
    }
  },
  plugins: []
};

export default config;
