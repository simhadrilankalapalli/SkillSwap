/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2rem)' }, // adjust to -1rem or -3rem if needed
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite', // you can adjust duration to make it slower
      },
    },
  },
  plugins: [],
};
