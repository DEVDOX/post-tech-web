module.exports = {
  purge: [
    './src/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        // http://scg.ar-ch.org/
        twitter: {
          default: '#1da1f2',
          darker: '#0c85d0' // 10% darker
        },
        discord: {
          default: '#7289DA',
        },
        github: {
          default: '#333333',
          darker: '#1a1a1a', // 10% darker
        },
        gitlab: {
          default: '#fca326',
        },
        qiita: {
          default: '#55c500',
        },
        youtube: {
          default: '#FF0000',
        },
      },
      screens: {
        //'lg': '1400px',
        'xl': '1400px',
      },
      variants: {
        borderWidth: ['last'],
        textDecotation: ['group-hover'],
        width: ['responsive', 'hover', 'focus'],
      },
      spacing: {
        '14': '3.5rem',
        '28': '7rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '108': '27rem',
        '120': '30rem',
      },
      inset: {
        '25': '25vh',
      },
      transitionDuration: {
        '50': '50ms',
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
