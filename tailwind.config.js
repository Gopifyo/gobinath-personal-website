/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./index.tsx",
        "./App.tsx",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'bounce-x': 'bounce-x 1s infinite',
            },
            keyframes: {
                'bounce-x': {
                    '0%, 100%': { transform: 'translateX(0)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
                    '50%': { transform: 'translateX(25%)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
                }
            }
        },
    },
    plugins: [
        require("tailwindcss-animate"),
    ],
}
