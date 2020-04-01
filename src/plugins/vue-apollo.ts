import { Context } from '@nuxt/types'

export default function(context: Context) {
  return {
    httpEndpoint: 'http://192.168.2.104:8000/api/graphql',
    getAuth: () => {
      return `Bearer ${context.store.getters.getAuthUser.token}`
    }
  }
}
