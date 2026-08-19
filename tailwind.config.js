/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './index.html',
        './en/index.html',
        './404.html',
        './assets/js/**/*.js',
    ],
    theme: {
        extend: {
            colors: {
                earth: '#8B7355',
                river: '#4A90A4',
                mountain: '#5F8575',
                gold: '#D4AF37',
                sand: '#E8D5B7',
                night: '#12100E',
                nightSoft: '#1E1B18',
            },
            fontFamily: {
                sans: ['Vazirmatn', 'Vazirmatn Static', 'Tahoma', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
