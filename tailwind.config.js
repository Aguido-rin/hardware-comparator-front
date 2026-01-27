/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bone: {
          50: "#f9f6f0",
          100: "#eaddcf",
          200: "#dbc1a0",
        },
        warm: {
          500: "#ea580c",
          600: "#c2410c",
          900: "#431407",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
