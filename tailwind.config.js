/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#e15489',
        main1: '#e13d7c',
        main2: '#ef6d85',
        dark: '#36314f',
        cdp: '#392ca0',
        clp: '#f2f0fb',
        cgray: '#f7f7f7',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
