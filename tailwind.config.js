/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',   // Check for files in the pages folder
    './src/**/*.{js,ts,jsx,tsx}',     // Check for files in the src folder
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFF8E6",
        secondary: "#E195AB",
        ternary: "#8D0B41",
      },
    },
  },
  plugins: [],
};
