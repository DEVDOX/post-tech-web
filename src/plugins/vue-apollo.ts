import { Context } from '@nuxt/types'

export default (
  { app }: Context,
  inject: (key: string, value: any) => void
) => {
  if (process.server) {
    if (app.apolloProvider === undefined || '$apollo' in app) {
      return false
    } else {
      inject('apollo', app.apolloProvider.defaultClient)
    }
  }
}
