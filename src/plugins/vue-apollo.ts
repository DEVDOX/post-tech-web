import { Context } from '@nuxt/types'

export default function({ store }: Context) {
  const getApiUrl = () => {
    /* small fix for development mode */
    if(process.server) {
      console.log(process.env.SSR_API_URL)
      return `${process.env.SSR_API_URL}/api/graphql`
    }
    console.log(process.env.BASE_URL)
    return `${process.env.BASE_URL}/api/graphql`
  }

  return {
    httpEndpoint: getApiUrl(),
    getAuth: () => {
      console.log(store.getters.getAuthUser)
      if (store.getters.getAuthUser) {
        return `Bearer ${store.getters.getToken}`
      }
    }
  }
}
