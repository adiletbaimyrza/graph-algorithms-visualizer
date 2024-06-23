/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        drawLine: {
          to: {
            strokeDashoffset: '0',
          },
        },
      },
    },
  },
  plugins: [],
}
