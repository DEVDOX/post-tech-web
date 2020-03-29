import { serviceContainer } from '~/dependencyInjection/container'
import { Context } from '@nuxt/types'

export default (_context: Context, inject: (key: string, value: any) => void) => {
  inject('container', serviceContainer)
}
