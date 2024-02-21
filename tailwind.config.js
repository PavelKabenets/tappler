/** @type {import('tailwindcss').Config} */
// import colors from './src/styles/colors'
// const  colors = require('./src/styles/colors')

module.exports = {
  content: ["./src/App.tsx", "./src/**/**/*.{jsx,tsx}", "./src/**/**/**/*.{jsx,tsx}", "./src/**/**/**/*.{jsx,tsx}"],
  theme: {
    extend: {
      // When adding fonts, it is necessary to include their names in renderFontFamily.ts and helpers.ts. (it`s important)
      fontFamily: {
        montserrat400: "Montserrat-Regular",
        montserrat500: "Montserrat-Medium",
        montserrat600: "Montserrat-SemiBold",
        montserrat700: "Montserrat-Bold",
        sans400: "TheSans-Regular",
        sans500: "TheSans-Regular",
        sans600: "TheSans-SemiBold",
        sans700: "TheSans-Bold",
      },
      colors: {
        black: "#000000",
        red: "#CC0000",
        white: "#FFFFFF",
        grey: "#6F7070",
        grey1: "#D9D9D9",
        grey2: "#707070",
        grey3: "#737385",
        greyPlaceholder: "#A8A8A8",
        grey4: "#00000029",
        grey5: "#DDDDDD",
        grey6: "#B7B7B7",
        grey7: "#E4E4E4",
        grey8: "#E8E8E8",
        grey9: "#B5B5B5",
        grey10: "#B5B6B8",
        grey11: "#A5A5A5",
      },
      fontSize: {
        '9': [9, { lineHeight: "11px" }],
        '10': [10, { lineHeight: "13px" }],
        '11': [11, { lineHeight: "14px" }],
        '12': [12, { lineHeight: "15px" }],
        '13': [13, { lineHeight: "22px" }],
        '14': [14, { lineHeight: "22px" }],
        '15': [15, { lineHeight: "24px" }],
        '16': [16, { lineHeight: "19px" }],
        '17': [17, { lineHeight: "20px" }],
        '18': [18, { lineHeight: "31px" }],
        '19': 19,
        '20': [20, { lineHeight: "24px" }],
        '22': 22,
        '23': 23,
        '24': [24, { lineHeight: "29.4px" }],
        '25': [25, { lineHeight: "30px" }],
        '26': 26,
        '30': 30,
        '36': [36, {lineHeight: "42.6px"}],
        '32': [32, { lineHeight: "36.2px" }],
        '48': [48, { lineHeight: '57.6px' }]
      },
      borderRadius: {
        '0': 0,
        '4': 4,
        '5': 5,
        '10': 10,
        '12': 12,
        '13': 13,
        '15': 15,
        '20': 20,
        '21': 21,
        '28': 28,
        '30': 30,
        '45': 45,
        '50': 50,
      },
      borderWidth: {
        "0.3": 0.3,
        "0.5": 0.5,
        "0.7": 0.7,
        "1": 1,
      }
    },


  },
  plugins: [],
}
