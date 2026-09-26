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
        background: "var(--background)",
        foreground: "var(--foreground)",
        status: {
          success: {
            DEFAULT: "#15803d",
            light: "#f0fdf4",
            border: "#bbf7d0",
          },
          warning: {
            DEFAULT: "#b45309",
            light: "#fffbeb",
            border: "#fde68a",
          },
          info: {
            DEFAULT: "#0369a1",
            light: "#f0f9ff",
            border: "#bae6fd",
          },
          danger: {
            DEFAULT: "#b91c1c",
            light: "#fef2f2",
            border: "#fecaca",
          },
        },
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)",
        floating: "0 10px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
