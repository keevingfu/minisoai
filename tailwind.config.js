/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          500: '#ec4899',
          600: '#db2777'
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
} 