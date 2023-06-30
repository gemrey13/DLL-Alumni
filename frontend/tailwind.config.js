/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-mode="dark"]'],
  content: [
    './src/**/*.{js,jsx}',
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1a202c',
        'dark-text': '#f7fafc',
      },
    },
  },
  plugins: [
    require('tailwindcss-dark-mode')()
  ],
  variants: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd', ...]
}
