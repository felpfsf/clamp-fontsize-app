/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Poppins']
      },
      colors: {
        clampColors: {
          clrFont: 'hsl(208, 100%, 97%)',
          clrHover: 'hsl(271, 76%, 53%)',
          clrNeon: '#bc13fe',
        }
      }
    }
  },
  plugins: []
}
