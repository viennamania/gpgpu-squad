/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#fcfcff',
          200: '#8e9199',
          300: '#272b33',
          400: '#222326',
          500: '#222',
          600: '#171717',
          700: '#161617',
          800: '#141414',
          900: '#0a0f1a',
          1000: '#0a0a0a',
          1100: '#010101',
          1200: 'rgba(255, 255, 255, 0.01)',
        },
        dimgray: {
          100: '#707073',
          200: '#6b6e75',
          300: '#62656d',
          400: '#5f6166',
          500: '#605e66',
          600: '#5b5e66',
          700: '#545759',
          800: 'rgba(112, 112, 115, 0.09)',
        },
        darkslategray: {
          100: '#4a4b4d',
          200: '#44474d',
          300: '#41444a',
          400: '#323233',
        },
        darkgray: {
          100: '#a8adb8',
          200: '#a7a9ad',
          300: '#979899',
        },
        slategray: '#737780',
        lightsteelblue: '#b8c0cf',
        white: '#fff',
        silver: '#c3c8d2',
        firebrick: '#ae0000',
        royalblue: '#3676f8',
        gainsboro: '#e6e6e6',
      },
      spacing: {},

      /*
      fontFamily: {
        pretendard: "Pretendard",
      },
      */
      fontFamily: {
        pretendard: ['Pretendard'],
      },

      borderRadius: {
        '81xl': '100px',
        '8xs': '5px',
      },
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      xl: '20px',
      base: '16px',
      '5xl': '24px',
      lgi: '19px',
      '2xs': '11px',
      mini: '15px',
      inherit: 'inherit',
    },
    /*
    screens: {
      lg: {
        max: "1200px",
      },
      mq1050: {
        raw: "screen and (max-width: 1050px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
    */

    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px', // only need to control product grid mode in ultra 4k device
    },
  },
  plugins: [],
};
