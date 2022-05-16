module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      borderRadius:{
        md: '4 px',
      },
      colors: {
        brand: {
          300: '#996DFF',
          500: '#8257e6'
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')
  ],
}
