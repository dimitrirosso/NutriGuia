
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        header: ['Poppins', 'sans-serif'],
      },
      colors: {
        nutriGreen: '#4CAF50',
        nutriOrange: '#FF9800',
        nutriBg: '#F4F6F8',
        nutriText: '#333333',
      }
    },
  },
  plugins: [],
}
