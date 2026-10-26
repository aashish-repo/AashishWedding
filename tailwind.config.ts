import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "var(--parchment)",
        stone: "var(--stone)",
        saffron: "var(--saffron)",
        maroon: "var(--maroon)",
        ink: "var(--ink)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        deva: ["var(--font-deva)", "Noto Sans Devanagari", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
