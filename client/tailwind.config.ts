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
        "bg-linear":
          "linear-gradient(40deg, #24264499 10%, #332b55 35%, #332b55 75%, #030328 120%)",
        "mustsees-linear":
          "linear-gradient(40deg, #030328 10%, #19162b 35%, #332b55 95%, #6656aa 120%)",
      },
      colors: {
        primary: "#030328",
        secondary: "#F1C40F",
        accent: "#7F6CD5",
        neutral: "#F2F2F2",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}
export default config
