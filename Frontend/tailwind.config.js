/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html","./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: { brand: { 600: "#1e40af" } },
      fontFamily: { mono: ["JetBrains Mono","ui-monospace","SFMono-Regular"] },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
