/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yamaha-blue': '#075EAF',
        'yamaha-red': '#F0141D',
        'yamaha-dark': '#1D1819',
      },
      fontFamily: {
        sans: ['Futura', 'Futura PT', 'Futura Std', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
