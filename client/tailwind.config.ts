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
        "login-linear":
          "linear-gradient(210deg, #292244 10%, #3d3466 45%, #524588 60%, #6656aa 120%)",
        "bg-linear":
          "linear-gradient(40deg, #24264499 10%, #332b55 35%, #332b55 75%, #030328 120%)",
        "mustsees-linear":
          "linear-gradient(40deg, #030328 10%, #19162b 35%, #332b55 95%, #6656aa 120%)",
        "subscription-linear":
          "linear-gradient(40deg, #19162b 5%, #332b55 15%, #4c4180 65%, #332b55 80%, #19162b 110%)",
        "paymentype-linear":
          "linear-gradient(40deg, #604e06 5%, #302703 15%, #030328 45%, #332b55 120%)",
        "newbooks-linear":
          "linear-gradient(100deg, #19162b 5%, #332b55 15%, #4c4180 25%, #6656aa 80%, #4c4180 90%, #19162b 100%)",
      },
      colors: {
        primary: "#030328",
        secondary: "#F1C40F",
        accent: "#7F6CD5",
        neutral: "#F2F2F2",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
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
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
    },
  },
  plugins: [],
}
export default config
