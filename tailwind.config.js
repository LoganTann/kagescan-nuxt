/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [],
    theme: {
        extend: {},
        fontFamily: {
            sans: ["Lato", "Roboto", "Helvetica", "Arial", "sans-serif"],
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
