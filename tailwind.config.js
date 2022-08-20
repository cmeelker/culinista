/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#cc5945",
        secondary: "#26a69a",
        accent: "#d8804d",
        dark: "#2a3238",
        light: "#f4f1de",
        positive: "#81b29a",
        negative: "#c10015",
        info: "#31ccec",
        warning: "#f2c037",
        background: "#eeedec",
      },
    },
  },
  plugins: [],
};
