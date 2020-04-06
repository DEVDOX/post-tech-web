import { GetterTree, ActionContext, ActionTree, MutationTree } from 'vuex'
import { serviceContainer } from '~/dependencyInjection/container'
import { TYPES } from '~/dependencyInjection/types'
import { UserRepositoryInterface } from '~/dependencyInjection/interfaces'
import { TokenType, UserDetail } from '~/apollo/schemas/userDetail'
/* import { UserInterface } from '~/apollo/schemas/user' */

const UserRepo = serviceContainer.get<UserRepositoryInterface>(
  TYPES.UserRepositoryInterface
)

type State = {
  authUser: UserDetail | null
  token: null
  postSuccess: boolean
}

export const state: () => State = (): State => ({
  authUser: null,
  token: null,
  postSuccess: false
})

export type RootState = ReturnType<typeof state>

export interface Actions<S, R> extends ActionTree<S, R> {
  nuxtServerInit(context: ActionContext<S, R>): void
}

export const getters: GetterTree<RootState, RootState> = {
  getAuthUser(state: RootState) {
    if (state.authUser) {
      return state.authUser
    }
  },

  getToken(state: RootState) {
    if (state.authUser) {
      return state.token
    }
  },

  getPostSuccessful(state: RootState) {
    return state.postSuccess
  }
}

export const actions: Actions<RootState, RootState> = {
  async nuxtServerInit({ commit }: ActionContext<RootState, RootState>) {
    // @ts-ignore
    const { user: currentUser } = this.$auth.$state

    // @ts-ignore
    const strategy = this.$cookies.get('auth.strategy')

    // @ts-ignore
    let token: string | undefined = this.$cookies.get('auth._token.' + strategy)
    
    // @ts-ignore
    if (token !== null && token !== undefined && this.$auth.loggedIn) {
      token = token.split(' ').slice(1)[0]
    } else {
      // raise error
    }

    try {
      if (currentUser && strategy) {
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

        console.log(result)

        if (successful) {
          commit('SET_USER', result.userDetail)
          commit('SET_TOKEN', result.token)
        } else {
          // raise error
        }
      }
    } catch (e) {
      // raise error
      console.error(e)
    }
  }
}

export const mutations: MutationTree<RootState> = {
  SET_USER: (state: any, user: any) => {
    state.authUser = user
  },

  SET_TOKEN: (state: any, token: string) => {
    state.token = token
  },

  DELETE_USER: (state: any) => {
    state.authUser = null
    state.token = null
  },

  CREATED_POST: (state: any, successful: boolean) => {
    state.postSuccess = successful
  }
}
