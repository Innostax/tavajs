/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  darkMode:'class',

  theme: {
    extend: {
      colors: {
        vueBlack: {
          DEFAULT: '#212529',
          lighter: '#323539',
          lightest: '#2c3034',
        },
      },
    },
  },
  plugins: [],
}
