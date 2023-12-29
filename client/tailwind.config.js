/** @type {import('tailwindcss').Config} */

import hideScroll from 'tailwind-scrollbar-hide';
import scrollbar from 'tailwind-scrollbar'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [hideScroll , scrollbar],
}

