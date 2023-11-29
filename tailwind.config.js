/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx", "./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        titleFont: ["Libre Franklin", "sans-serif"],
        subTitleFont: ["Montserrat", "sans-serif"],
        textFont: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [],
};
