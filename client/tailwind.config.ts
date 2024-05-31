import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "custom-linear":
          "linear-gradient(40deg, #24264499 10%, #030328 35%, #7F6CD5 75%, #7F6CD5 120%)",
      },
      colors: {
        primary: "#030328",
        secondary: "#F1C40F",
        accent: "#7F6CD5",
        neutral: "#F2F2F2",
      },
    },
  },
  plugins: [],
}
export default config
