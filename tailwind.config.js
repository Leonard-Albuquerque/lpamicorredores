/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        graphite: "#07090c",
        steel: "#b8bec8",
        midnight: "#08172d",
        navy: "#0d2747"
      },
      boxShadow: {
        metal: "0 24px 80px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
      }
    }
  },
  plugins: []
};
