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
      },
    },
  },
  variants: {},
  plugins: [
    require('tailwindcss-rfs')
  ],
}
