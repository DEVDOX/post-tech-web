module.exports = {
  theme: {
    extend: {
      colors: {
        twitter: '#1da1f2',
        discord: '#7289DA',
        github: '#333333',
        gitlab: '#fca326',
        qiita: '#55c500',
        youtube: '#FF0000',
      },
      screens: {
        'xl': '1400px',
      },
      variants: {
        borderWidth: ['last'],
        textDecotation: ['group-hover'],
        width: ['responsive', 'hover', 'focus'],
      },
      spacing: {
        '14': '3.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      inset: {
        '25': '25vh',
      },
      filter: {
        'none': 'none',
        'darker': 'brightness(80%)'
      },
      borderWidth: {
        '3': '3px',
      },
      minHeight: {
        '512px': '512px',
      },
    },
  },
  variants: {
    borderWidth: ['responsive', 'hover', 'focus', 'last'],
    textDecotation: ['responsive', 'hover', 'focus', 'group-hover'],
    width: ['responsive', 'hover', 'focus'],
    height: ['responsive', 'hover', 'focus'],
    outline: ['focus', 'responsive', 'hover'],

    filter: ['responsive', 'hover'],
    backdropFilter: ['responsive'],
  },
  plugins: [
    require('tailwindcss-rfs'),
    require('tailwindcss-filters'),
  ],
}
