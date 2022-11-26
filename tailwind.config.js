/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#1E293B',
        main1: '#1E293B',
        main2: '#3a4455',
        dark: '#36314f',
        cdp: '#392ca0',
        clp: '#F7F7FF',
        cgray: '#F7F7FF',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
