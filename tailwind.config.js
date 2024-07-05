import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx}"],
  theme: {
    extend: {
      height: {
        600: "600px",
        710: "710px",
      },
      width: {
        35: "35%",
      },
      textColor: {
        logo: "#14134f",
      },
    },
  },
  plugins: [daisyui],
};
