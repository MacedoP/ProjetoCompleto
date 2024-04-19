/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily:{
      'sans': ['Roboto', 'sns-serif']

    },
    extend: {
      backgroundImage: {
        "home": "url('../photo/bg.png')"
      }
    },
  },
  plugins: [],
}

