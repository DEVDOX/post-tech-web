import { ActionContext, ActionTree, MutationTree } from 'vuex'
import { serviceContainer } from '~/dependencyInjection/container'
import { TYPES } from '~/dependencyInjection/types'
import { UserRepositoryInterface } from '~/dependencyInjection/interfaces'
/* import { UserInterface } from '~/apollo/schemas/user' */

const UserRepo = serviceContainer.get<UserRepositoryInterface>(
  TYPES.UserRepositoryInterface
)

export const state = () => ({
  authUser: null
})

export type RootState = ReturnType<typeof state>

export interface Actions<S, R> extends ActionTree<S, R> {
  nuxtServerInit(context: ActionContext<S, R>): void
}

export const actions: Actions<RootState, RootState> = {
  async nuxtServerInit({ commit }: ActionContext<RootState, RootState>) {
    // @ts-ignore
    const { user: currentUser } = this.$auth.$state

    // @ts-ignore
    const strategy = this.$cookies.get('auth.strategy')

    // @ts-ignore
    let token: string | undefined = this.$cookies.get('auth._token.' + strategy)

    if (token !== null && token !== undefined) {
      token = token.split(' ').slice(1)[0]
    } else {
      // raise error
    }

    try {
      if (currentUser && strategy) {
        console.log("hello?")

        const { id, email, avatar_url, login } = currentUser

        const { successful, result } = await UserRepo.getOrCreate({
          strategy,
          strategyId: id.toString(),
          strategyToken: token,
          email,
          avatar: avatar_url,
          displayName: login,
          uniqueName: login
        })

        console.log(successful)

        if (successful) {
          return commit('SET_USER', result)
        } else {
          // raise error
        }
      }
    } catch (e) {
      // raise error
      console.log(e)
    }
  }
}

export const mutations: MutationTree<RootState> = {
  SET_USER: (state: any, user: any) => {
    state.authUser = user
  }
}
