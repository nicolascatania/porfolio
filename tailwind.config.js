/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease': 'ease',
      },
      colors:{
        primaryBlue: 'rgb(17, 157, 164)',
      },
      fontFamily:{
        title: 'Montserrat',
        body: 'IBM+Plex+Sans'
      },
    },
  },
  plugins: [],
}

