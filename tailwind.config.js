/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/*.vue', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'success-medium': '#2EB774',
        main: '#A8A31B',
        'light-gray': '#DEE2EB',
        'font-black': '#212121',
        'notice-border-blue': '#2EA7FF',
        'notice-blue': '#F2FAFF',
        'red-medium': '#E83939'
      }
    }
  },
  plugins: []
}
