/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2F63AF',
        secondary: '#7A8FC8',
        backgroundPrime: '#F9F9FF'
      }
    },
    fontFamily: {
      montserratBold: 'montserratBold',
      montserratSemiBold: 'montserratSemiBold',
      montserratRegular: 'montserratRegular',
      montserratMedium: 'montserratMedium',
      montserratLight: 'montserratLight',
    }
  },
  plugins: [],
}