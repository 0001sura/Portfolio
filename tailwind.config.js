/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        paper: "#f7f1e8",
        sand: "#e8d9c5",
        ember: "#c84c2f",
        moss: "#5f6a54",
        stone: "#6f665d",
        line: "rgba(17, 17, 17, 0.12)",
      },
      fontFamily: {
        sans: ['"Aptos"', '"Segoe UI Variable"', '"Segoe UI"', "sans-serif"],
        display: ['"Georgia"', '"Times New Roman"', "serif"],
      },
      boxShadow: {
        card: "0 24px 60px rgba(17, 17, 17, 0.08)",
        soft: "0 16px 30px rgba(17, 17, 17, 0.06)",
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 20% 20%, rgba(200, 76, 47, 0.10), transparent 26%), radial-gradient(circle at 80% 0%, rgba(95, 106, 84, 0.12), transparent 24%), linear-gradient(135deg, rgba(247, 241, 232, 0.96), rgba(232, 217, 197, 0.85))",
      },
      maxWidth: {
        copy: "68ch",
      },
    },
  },
  plugins: [],
};
