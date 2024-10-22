/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation : {
        'color-transition': 'color-change 1s ease-in-out infinite',
      },
      keyframes : {
        'color-change' : {
          '0% ,100%' : {
            backgroundColor : '#36454F'
          },
          '50%' :{
            backgroundColor: '#B2BEB5'
          }
        }
      }
    },
  },
  plugins: [],
};
