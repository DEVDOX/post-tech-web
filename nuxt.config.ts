import { Configuration } from '@nuxt/types'

const fileName = `.env.${process.env.NODE_ENV || 'local'}`
require('dotenv').config({ path: fileName })

const config: Configuration = {
  srcDir: 'src/',
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
    host: '0.0.0.0'
  },

  loading: { color: '#fff' },

  css: [
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  plugins: [
    '~/plugins/tailwind-vue',
<<<<<<< HEAD
=======
    { src: '@/plugins/vue-mavon-editor', ssr: false },
>>>>>>> e4090c0093ca9a76fb8e10708aceada7ab1577d1
    '~/plugins/vue-apollo',
    '~/plugins/serviceContainer',
    '~/plugins/inject'
  ],

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
<<<<<<< HEAD
    'cookie-universal-nuxt'
=======
>>>>>>> e4090c0093ca9a76fb8e10708aceada7ab1577d1
  ],

  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    'nuxt-webfontloader',
    '@nuxtjs/proxy',
    '@nuxtjs/apollo',
    ['nuxt-i18n', {
      locales: [
        {
          code: 'en',
          file: 'en-US.js'
        },
        {
          code: 'ja',
          file: 'ja-JP.js'
        }
      ],
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        alwaysRedirect: false,
        fallbackLocale: 'ja'
      },
      lazy: true,
      langDir: 'lang/',
      defaultLocale: 'jp',
      strategy: 'no_prefix'
    }],
    ['@nuxt/typescript-build', {
      typeCheck: {
        memoryLimit: 4096,
        workers: 2
      },
      ignoreNotFoundWarnings: false
    }],
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],

  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.ts'
    }
  },

  auth: {
    redirect: {
      login: '/',
      logout: '/logout',
      callback: '/auth/callback',
<<<<<<< HEAD
      home: '/'
=======
      home: '/',
>>>>>>> e4090c0093ca9a76fb8e10708aceada7ab1577d1
    },
    strategies: {
      github: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
<<<<<<< HEAD
        scope: ['read:user', 'email']
      }
    },
    watchLoggedIn: true,
    plugins: ['~/plugins/auth.js']
=======
        scope: ['read:user']
      }
    },
    watchLoggedIn: true,
    plugins: [ '~/plugins/auth.js' ]
>>>>>>> e4090c0093ca9a76fb8e10708aceada7ab1577d1
  },

  proxy: {
    '/api/': 'http://localhost:4000'
  },

  webfontloader: {
    google: {
      families: [
        'Source+Sans+Pro:400,700',
        'Noto+Sans+JP:wght@400;700',
      ]
    }
  },

  dotenv: {
    filename: fileName,
    path: process.cwd()
  },

  build: {
    extend(_config, _ctx) {}
  },

  render: {
    bundleRenderer: {
      runInNewContext: false
    }
<<<<<<< HEAD
  },
=======
  }
>>>>>>> e4090c0093ca9a76fb8e10708aceada7ab1577d1
}

export default config
