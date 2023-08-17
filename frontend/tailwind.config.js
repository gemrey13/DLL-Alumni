/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        'black-1': '#302F39'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}