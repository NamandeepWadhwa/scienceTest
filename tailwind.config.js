/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navbar: "#A1D6B2",
        background: "#F1F3C2",
        reguarlText: "#333",
        headingColor: "#CEDF9F",
        button: "#E8B86D",
        buttonHover: "#CEDF9F",
        footer: "#CEDF9F",
        footerText: "#A1D6B2",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
