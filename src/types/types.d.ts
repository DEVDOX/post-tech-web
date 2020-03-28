import { NuxtApp } from '@nuxt/types/app'

// fix a error
export {}

declare global {
  namespace App {
    interface EnvInterface {
      /* URL */
      BASE_URL: string
      BASE_API_URL: string
      FULL_API_URL: string
      FULL_API_GRAPHQL_URL: string

      /* Locales */
      DEFAULT_LOCALE: string
      FALLBACK_LOCALE: string
      LOCALES: any[]
      NUXT_HOST: string
      NUXT_PORT: string
      BROWSERS_SUPPORT: any[]
      NODE_SUPPORT: string
    }
  }

  namespace NodeJS {
    interface Process {
      browser: boolean
      server: boolean
    }
    interface Global {
      appEnv: App.EnvInterface
      _$app: any
    }
  }

  interface Window {
    onNuxtReady: any
    $nuxt: NuxtApp
    _$app: any
  }
}
