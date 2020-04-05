//import { serviceContainer } from '~/dependencyInjection/container'
import { Context } from '@nuxt/types'
import { serviceContainer } from '~/dependencyInjection/container'

export default (_context: Context, inject: (key: string, value: any) => void) => {
  inject('container', serviceContainer)
}
