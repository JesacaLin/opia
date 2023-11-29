/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx", "./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        titleFont: ["Montserrat", "sans-serif"],
        subTitleFont: ["Raleway", "sans-serif"],
        textFont: ["Libre Franklin", "sans-serif"],
      },
    },
  },
  plugins: [],
};
