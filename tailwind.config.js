const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': {
          'font-size': '1.875rem',
          'line-height': '2.25rem',
          '@media screen and (min-width: 768px)': {
            'font-size': '3rem',
            'line-height': '1',
          },
          '@media screen and (min-width: 1280px)': {
            'font-size': '4.5rem',
          }
        },
        'h2': {
          'font-size': '1.5rem',
          'line-height': '2rem',
          '@media screen and (min-width: 768px)': {
            'font-size': '2.25rem',
            'line-height': '2.5rem',
          },
          '@media screen and (min-width: 1280px)': {
            'font-size': '3.75rem',
            'line-height': '1',
          }
        },
        'h3': {
          'font-size': '1.25rem',
          'line-height': '1.75rem',
          '@media screen and (min-width: 768px)': {
            'font-size': '1.875rem',
            'line-height': '2.25rem',
          },
          '@media screen and (min-width: 1280px)': {
            'font-size': '3rem',
            'line-height': '1',
          }
        },
        'h4': {
          'font-size': '1.125rem',
          'line-height': '1.75rem',
          '@media screen and (min-width: 768px)': {
            'font-size': '1.5rem',
            'line-height': '2rem',
          },
          '@media screen and (min-width: 1280px)': {
            'font-size': '2.25rem',
            'line-height': '2.5rem',
          }
        },
        'h5': {
          'font-size': '1rem',
          'line-height': '1.5rem',
          '@media screen and (min-width: 768px)': {
            'font-size': '1.25rem',
            'line-height': '1.75rem',
          },
          '@media screen and (min-width: 1280px)': {
            'font-size': '1.875rem',
            'line-height': '2.25rem',
          }
        },
        'p': {
          'font-size': '0.75rem',
          'line-height': '1rem',
          '@media screen and (min-width: 768px)': {
            'font-size': '0.875rem',
            'line-height': '1.25rem',
          },
          '@media screen and (min-width: 1280px)': {
            'font-size': '1rem',
            'line-height': '1.5rem',
          }
        },
      })
    })
  ],
}
