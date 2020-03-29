import { Context } from '@nuxt/types'

export default (
  { app }: Context,
  inject: (key: string, value: any) => void
) => {
  if (app.apolloProvider === undefined || '$apollo' in app) {
    return
  } else {
    /* inject('apollo', app.apolloProvider.defaultClient) */
  }
}
