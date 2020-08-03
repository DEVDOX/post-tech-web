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

  loading: { color: '#fff' },

  css: [
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  plugins: [
//    '~/plugins/tailwind-vue',
    '~/plugins/vue-apollo',
    '~/plugins/serviceContainer',
    '~/plugins/inject',
    '~/plugins/i18n',
    { src: '~/plugins/vue-infinite-loading', ssr: false },
  ],

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
    'cookie-universal-nuxt',
  ],

  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
    '@nuxtjs/apollo',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    // 'nuxt-validate',
    'nuxt-webfontloader',
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
  ],

  apollo: {
    clientConfigs: {
      default: '~/plugins/vue-apollo'
    }
  },

  auth: {
    redirect: {
      login: '/',
      logout: '/logout',
      callback: '/auth/callback',
      home: '/'
    },
    strategies: {
      github: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        scope: ['read:user', 'email']
      }
    },
    watchLoggedIn: true,
    plugins: ['~/plugins/auth.js']
  },

  // nuxtValidate: {
  //   nuxti18n: true
  // },

  proxy: {
    '/api/': process.env.SSR_API_URL
  },

  webfontloader: {
    google: {
      families: [
        'Source+Sans+Pro:400,600,700',
        'Noto+Sans+JP:wght@300;700',
      ]
    }
  },

  dotenv: {
    filename: fileName,
    path: process.cwd()
  },

  build: {
    transpile: [
      "vee-validate/dist/rules"
    ],
    extend(_config, _ctx) {}
  },

  render: {
    bundleRenderer: {
      runInNewContext: false
    }
  },
}

export default config
