/** @type {import('tailwindcss').Config} */
const {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  SECONDARY_COLOR_100,
  SECONDARY_COLOR_200,
  TERTIARY_COLOR,
  BLACK_COLOR,
  BLACK_COLOR_100,
  BLACK_COLOR_200,
  GRAY_COLOR,
} = require('./constants');

module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: PRIMARY_COLOR,
        secondary: {
          DEFAULT: SECONDARY_COLOR,
          100: SECONDARY_COLOR_100,
          200: SECONDARY_COLOR_200,
        },
        tertiary: TERTIARY_COLOR,
        black: {
          DEFAULT: BLACK_COLOR,
          100: BLACK_COLOR_100,
          200: BLACK_COLOR_200,
        },
        gray: {
          100: GRAY_COLOR,
        },
      },
      fontFamily: {
        pthin: ['Poppins-Thin', 'sans-serif'],
        pextralight: ['Poppins-ExtraLight', 'sans-serif'],
        plight: ['Poppins-Light', 'sans-serif'],
        pregular: ['Poppins-Regular', 'sans-serif'],
        pmedium: ['Poppins-Medium', 'sans-serif'],
        psemibold: ['Poppins-SemiBold', 'sans-serif'],
        pbold: ['Poppins-Bold', 'sans-serif'],
        pextrabold: ['Poppins-ExtraBold', 'sans-serif'],
        pblack: ['Poppins-Black', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
