/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    colors: {
      container: "#052E16",
      innerC: "white",
      textB: "black",
      textW: "white",
      buttonHover: "#BBF7D0",
      buttonTxtHov: "052E16",
      tableTopText: "#3F6212",
      cancel: "red",
      error: "#991B1B",
    },
    screens: {
      sm: { max: "639px" },
    },
    extend: {},
  },
  plugins: [],
};
