export default {
  darkMode: 'class', // Enable dark mode via class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Ensure Tailwind scans all relevant files
  ],
  theme: {
    extend: {
      fontFamily: {
        'new-amsterdam': ['"New Amsterdam"', 'sans-serif'],
        'Jersey': ['"Jersey 10"', 'sans-serif'],
        "Bebas-Neue": ["Bebas Neue", 'sans-serif'],
        'Rubik': ["Rubik", 'sans-serif']
      },
      colors: {
        light: {
          background: '#F9FAFB',
          text: '#1F2937',
          primary: '#0D9488',
        },
        dark: {
          background: '#111827',
          text: '#fff',
          primary: '#10B981',
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          'scrollbar-width': 'none', // Firefox
          '-ms-overflow-style': 'none', // IE and Edge
        },
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none', // Chrome, Safari, and Edge
        },
      });
    },
  ],
};
