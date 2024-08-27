/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'new-amsterdam': ['"New Amsterdam"', 'sans-serif'],
        'Jersey': ['"Jersey 10"', 'sans-serif'],
        "Bebas-Neue": ["Bebas Neue", 'sans-serif']

      }
    },
  },
  plugins: [],
}

