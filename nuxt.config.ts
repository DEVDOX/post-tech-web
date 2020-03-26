import { Configuration } from '@nuxt/types'


const config: Configuration = {
  mode: 'universal',

  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  server: {
    port: 8000,
    host: '0.0.0.0',
  },

  loading: { color: '#fff' },

  css: [],

  plugins: [
    '~/plugins/tailwind-vue'
  ],

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss'
  ],

  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    'nuxt-webfontloader',
    ['nuxt-i18n',
      {
        locales: [
          {
            code: 'en',
            file: 'en-US.js'
          },
          {
            code: 'ja',
            file: 'ja-JP.js'
          },
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'jp'
      }
    ],

    ['@nuxt/typescript-build', {
      typeCheck: {
        memoryLimit: 4096,
        workers: 2
      },
      ignoreNotFoundWarnings: false
    }]

  ],

  webfontloader: {
    google: {
      families: ['Source+Sans+Pro:400,700']
    }
  },


  build: {
    extend(config, ctx) {}
  }
}

export default config
