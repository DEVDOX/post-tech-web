import { Context } from '@nuxt/types'

export default ({ app }: Context) => {
  if (process.server) {
    global._$app = app
  } else {
    window._$app = app
    global._$app = app
  }
}
