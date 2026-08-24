/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,jsx,mdx}",
        "./src/components/**/*.{js,jsx}",
        "./src/content/**/*.mdx",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("@tailwindcss/typography")],
};