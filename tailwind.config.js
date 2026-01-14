/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Our World in Data inspired color palette
        'owid-blue': '#3B5998',
        'owid-red': '#D73847',
        'owid-orange': '#E56E5A',
        'owid-yellow': '#F6B900',
        'owid-green': '#6BAB3E',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
