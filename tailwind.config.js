/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        primaryBlue: 'rgb(17, 157, 164)',
      },
      fontFamily:{
        title: 'Montserrat',
        body: 'IBM+Plex+Sans'
      }
    },
  },
  plugins: [],
}

