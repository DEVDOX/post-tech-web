import { Context } from '@nuxt/types'

export default function({ store }: Context) {
  return {
    httpEndpoint: 'http://192.168.2.104:8000/api/graphql',
    getAuth: () => {
      console.log(store.getters.getAuthUser)
      if (store.getters.getAuthUser) {
        return `Bearer ${store.getters.getToken}`
      }
    }
  }
}