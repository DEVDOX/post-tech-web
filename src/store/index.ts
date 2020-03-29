import { Component, Vue} from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { serviceContainer } from '~/dependencyInjection/container'
import { TYPES } from '~/dependencyInjection/types'
import { UserRepositoryInterface } from '~/dependencyInjection/interfaces'
import { UserInterface } from '~/apollo/schemas/user'

const UserRepo = serviceContainer.get<UserRepositoryInterface>(
  TYPES.UserRepositoryInterface
)

export const state = () => ({
  authUser: null
})

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    const { user: currentUser}  = this.$auth.$state

    const strategy = this.$cookies.get('auth.strategy')

    if (currentUser && strategy) {
      const { user } = await UserRepo.getAuthUser(strategy, currentUser.id)

      if (!user) {
        let params = { strategy }
        let strategyId = null

        switch(strategy) {
          case 'github':
            strategyId = {githubId: currentUser.id}
            break
        }

        params = Object.assign(params, strategyId)
        const { user } = await UserRepo.createUser(params)
      }
    }

    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  }
}

export const mutations = {
  SET_USER: function(state: any, user: any) {
    state.authUser = user
  }
}
