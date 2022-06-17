/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      "blue-dark": "#2a2b36",
      "blue-light": "#7e73f2",
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
