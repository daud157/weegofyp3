/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customOrange: '#FFA500', // Add your custom color
      },
    },
  },
  plugins: [],
}

