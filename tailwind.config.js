/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#253446',
        secondary: '#d9a441',
        tertiary: '#0f0f0f',
      },
     fontFamily: {
  DMSans: ['DM_Sans', 'sans-serif'],
}

    },
  },
  plugins: [],
}