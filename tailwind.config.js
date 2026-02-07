/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Editorial "Works in Progress" palette
        canvas: '#FDFBF7',
        ink: '#1A1A1A',
        accent: '#F2C94C',
        grid: '#E5E5E5',
        // Muted AQI severity palette
        'severity-good': '#7A9A6D',
        'severity-moderate': '#C9A84C',
        'severity-unhealthy': '#B87333',
        'severity-hazardous': '#A0522D',
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        'editorial': '-0.02em',
      },
    },
  },
  plugins: [],
}
