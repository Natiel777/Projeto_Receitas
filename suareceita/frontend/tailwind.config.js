/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/utils/ui.jsx", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#60A5FA",
          DEFAULT: "#2563EB",
          dark: "#1F2937",
        },
      },
      fontFamily: {
        sans: ["open sans", "ui-sans-serif", "sans-serif"],
      },
    },
  },
  plugins: [],
};