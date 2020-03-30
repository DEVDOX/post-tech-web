import { injectable } from 'inversify'
import BaseRepository from '~/repositories/baseRepository'
import UserRepositoryInterface from '~/repositories/User/UserRepositoryInterface'
// import { UserInterface } from '~/apollo/schemas/user'
import {
  UserDetailInterface,
  CreatePayload,
  LoginResultInterface
} from '~/apollo/schemas/userDetail'
import { GET_USER_DETAIL, CREATE_USER, LOGIN_QUERY } from '~/apollo/queries/user'

@injectable()
export default class UserRepository extends BaseRepository
  implements UserRepositoryInterface {
  public async getAuthUser(
    strategy: string,
    strategyId: string
  ): Promise<UserDetailInterface> {
    const {
      data: { user }
    } = await global._$app.$apollo.query({
      query: GET_USER_DETAIL,
      variables: { strategy, strategyId }
    })

    return user
  }

  public async getOrCreate(params: any): Promise<LoginResultInterface> {
    const { data } = await global._$app.$apollo.mutate({
      mutation: LOGIN_QUERY,
      variables: { params }
    })

    console.log("asdf", data)

    return data
  }

  public async createUser(params: any): Promise<CreatePayload> {
    const {
      data: { user }
    } = await global._$app.$apollo.mutate({
      mutation: CREATE_USER,
      variables: { params }
    })

    return user
  }
}
