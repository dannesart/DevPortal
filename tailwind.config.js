module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        slidein: "slidein 0.5s ease-in-out 1",
        console: "console 0.5s ease-in-out 1",
      },
      keyframes: {
        slidein: {
          "0%": {
            transform: "translateY(100px)",
          },
          "80%": {
            transform: "translateY(-20px)",
          },
          "100%": {
            transform: "translateY(0px)",
          },
        },
        console: {
          "0%": {
            transform: "translateX(-100px)",
            opacity: "0",
          },
          "80%": {
            opacity: "1",
            transform: "translateX(40px)",
          },
          "100%": {
            transform: "translateX(0px)",
          },
        },
      },
    },
  },
  plugins: [],
};
