/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        "gray-1": "#f8f9fa",
        "gray-2": "#f1f3f5",
        "gray-3": "#e9ecef",
        "gray-4": "#dee2e6",
        "gray-5": "#ced4da",
        "gray-6": "#adb5bd",
        "gray-7": "#868e96",
        "gray-8": "#495057",
        "gray-9": "#343a40",
        "gray-10": "#212529",
        green: "#2BAE66",
        ivory: "#FCF6F5",
      },
      fontSize: {
        "heading-1": ["3rem", { lineHeight: "150%" }],
        "heading-2": ["2.4rem", { lineHeight: "150%" }],
        "heading-3": ["2.2rem", { lineHeight: "150%" }],
        "heading-4": ["2rem", { lineHeight: "150%" }],
        "heading-5": ["1.8rem", { lineHeight: "150%" }],
        "heading-6": ["1.6rem", { lineHeight: "150%" }],
        "body-1": ["1.6rem", { lineHeight: "150%" }],
        "body-2": ["1.5rem", { lineHeight: "150%" }],
        "body-3": ["1.4rem", { lineHeight: "150%" }],
        "body-4": ["1.3rem", { lineHeight: "150%" }],
        "detail-1": ["1.2rem", { lineHeight: "150%" }],
        "detail-2": ["1.1rem", { lineHeight: "150%" }],
        "detail-3": ["1rem", { lineHeight: "150%" }],
        "detail-4": ["0.9rem", { lineHeight: "150%" }],
      },
      fontFamily: {
        serif: ["DM Serif Display", "sans-serif"],
      },
      screens: {
        pc: "800px",
        mobile: { min: "1px", max: "799px" },
      },
    },
  },
  plugins: [],
}
