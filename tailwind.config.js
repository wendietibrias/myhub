/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '991px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '760px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '576px'},
      // => @media (max-width: 639px) { ... }
      'xs' : { 'max':'460px' }
      // => @media (max-width:420px) { ... }
    }
  },
  plugins: [],
}