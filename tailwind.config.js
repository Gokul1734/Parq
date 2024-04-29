// tailwind.config.js

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./Screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      grid: {
        gridrow: "flex flex-row gap-5 justify-center items-center",
      },
      colors: {
        primary: "#15171B",
        secondary: "#258EA6",
        box: "#21242A",
        text: "#ADADAD",
        backdrop: "#15171B"
      },
    },
  },
  plugins: [],
};
