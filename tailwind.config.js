/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      colors: {
        background: '#0f172a',
        surface: '#1e293b',
        primary: '#38bdf8',
        success: '#4ade80',
        error: '#f87171',
        dim: '#64748b',
      }
    },
  },
  plugins: [],
}
