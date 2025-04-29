import { transform } from "typescript";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // screens: {
    //   sm: '640px',
    //   md: '768px',
    //   lg: '1024px',
    //   xl: '1280px',
    // },
    // screens: {
    //   'sm': '576px',
    //   'md': '960px',
    //   'lg': '1440px',
    // },
    extend: {
      fontFamily:{
        sans: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        black: "#000000F7",
        "fade-black": "#353537",
        grey: "#8c8c8c",
        "fade-grey": "#706B66",
        "grey-400": "#888888",
        "grey-500": "#6d6d6d",
        secondary: "#2C5F2D",
        "strong-secondary": "#4F7743",
        "fade-secondary": "#D9F2E7",
        camarone: "#4A9D4C",
        white: "#FCFCFC",
        "fade-white": "#F5F5F5",
        brown: "#664E4E",
        "fade-blue": "#4F7FB2",
        "darkish-blue": "#024756",
      },
      
      boxShadow: {
        'custom-x': '0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
        'custom-y': '0px 1px 4px 0px rgba(0, 0, 0, 0.1)',
      },

      keyframes: {
        swing: {
          '0%, 100%': { transform: 'rotate(-40deg)' },
          '50%': { transform: 'rotate(40deg)' },
        },
        inputslideUp: {
          '0%':
           {opacity: 0,
            transform: 'translateY(23px)'
          },
          '100%' : {
            opacity: 1,
            transform: 'translateY(0)'
          }

        },
        progressPulse : {
          "0%, 100%": { transform: "scale(0)", opacity: "0.5" },
          "50%": { transform: "scale(1)", opacity: "1" },
        }
      },
      animation: {
        swing: 'swing 2s infinite ease-in-out',
        'swing-fast': 'swing 0.3s infinite ease-in-out',

        inputslideUp:'inputslideUp 0.5s ease-in-out',

        progressPulse: "progressPulse 0.9s ease-in-out infinite",

      },


    },
  },
  plugins: [],
};
