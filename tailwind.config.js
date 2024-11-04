/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        timmy: ['Timmy', 'sans-serif'],
      },
      screens: {
        sm: "350px",
        md: "500px"
      },
      colors:{
           activeHead: "#17171c",
           inactiveHead:"#9299a6",
           sell:"#31353c",
           selectTokenbg:"#5932f3",
           borderLine:"#f1f2f4",

      },
    },
  },
  plugins: [],
}

