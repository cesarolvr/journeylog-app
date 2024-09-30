const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/**/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      defaultTheme: "dark",
      defaultExtendTheme: "dark",
      themes: {
        light: {
          colors: {
            background: "#ffffff"
          }, // light theme colors
        },
        dark: {
          colors: {
            background: "#171717",
          }, // dark theme colors
        },
      },
    }),
  ],
};
