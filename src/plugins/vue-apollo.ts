import { Context } from '@nuxt/types'

export default function({ store }: Context) {
  return {
    httpEndpoint: `${process.env.DOMAIN_NAME}/api/graphql`,
    getAuth: () => {
      console.log(store.getters.getAuthUser)
      if (store.getters.getAuthUser) {
        return `Bearer ${store.getters.getToken}`
      }
    }
  }
}