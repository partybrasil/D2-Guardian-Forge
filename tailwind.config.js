/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Destiny 2 Dark Theme
        'destiny-bg': '#0a0e27',
        'destiny-primary': '#f7931e',
        'destiny-arc': '#33c4ff',
        'destiny-solar': '#ff6600',
        'destiny-void': '#7d4fff',
        'destiny-stasis': '#33ccff',
        'destiny-strand': '#00ff88',
        'destiny-prismatic': '#d4af37',
      },
    },
  },
  plugins: [],
}
