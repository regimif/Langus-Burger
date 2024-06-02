/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        header: "url('/assets/bg.png')",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".overflow-hidden": {
          overflow: "hidden",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};

