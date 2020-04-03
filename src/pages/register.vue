<template>
  <p>callback</p>
</template>


<script lang="ts">
import { Component, Vue} from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { serviceContainer } from '~/dependencyInjection/container'
import { TYPES } from '~/dependencyInjection/types'
import { UserRepositoryInterface } from '~/dependencyInjection/interfaces'
import { UserInterface } from '~/apollo/schemas/user'

const UserRepo = serviceContainer.get<UserRepositoryInterface>(
  TYPES.UserRepositoryInterface
)

@Component
export default class Callback extends Vue {
  async asyncData({ app, redirect, req }: Context) {
    const { user: userState } = await app.$auth.$state

    console.log(userState)
    if (userState) {
      // check if the user exists
      //      const { strategy, id } = userState
      //      console.log(userState)
      //
      //      const dbUser: UserInterface = await UserRepo.getAuthUser(strategy, id)
      const userExist = false

      if (!userExist) {
        return redirect('/register')
      } else {
        return redirect('/')
      }
    }
  }
}
</script>
