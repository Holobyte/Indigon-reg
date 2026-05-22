/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnightIndigo: '#130A38',
        electricPurple: '#7C3AED',
        neonCyan: '#06B6D4',
        coralPink: '#F43F5E',
      },
    },
  },
  plugins: [],
}
