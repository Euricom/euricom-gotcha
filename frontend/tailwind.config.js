module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'rumraisin': ['Rum Raisin', 'system-ui'],
      'roboto': ['Roboto', 'Georgia']
     },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      height: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '48px',
        screenNav: 'calc(100vh - 64px)'
       },
       animation: {
        'spin-slow': 'spin 3s linear infinite',
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
