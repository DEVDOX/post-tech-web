import { Context } from '@nuxt/types'

export default function({ store }: Context) {
  const getApiUrl = () => {
    /* small fix for development mode */
    if(process.server) {
      return `${process.env.SSR_API_URL}/api/graphql`
    }
    return `${process.env.BASE_URL}/api/graphql`
  }

  return {
    httpEndpoint: getApiUrl(),
    getAuth: () => {
      if (store.getters.getAuthUser) {
        return `Bearer ${store.getters.getToken}`
      }
    }
  }
}
