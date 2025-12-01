import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sdg: {
          navy: "#012D5A",
          teal: "#0AA6A6",
          gold: "#F4B400",
          coral: "#F45B69",
        },
      },
    },
  },
  plugins: [],
};

export default config;

