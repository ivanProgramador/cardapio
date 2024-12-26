/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,css}"],
  theme: {
    extend: {
       backgroundImage:{
         "home":"url('/assets/bg.png')"
       }
    },
  },
  plugins: [],
}

