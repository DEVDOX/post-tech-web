import { injectable } from 'inversify'
import BaseRepository from '~/repositories/baseRepository'
import UserRepositoryInterface from '~/repositories/User/UserRepositoryInterface'
// import { UserInterface } from '~/apollo/schemas/user'
import {
  UserDetail
} from '~/apollo/schemas/userDetail'
import { GET_USER_DETAIL, CREATE_USER, UPDATE_USER, LOGIN_QUERY, GET_USER_DETAIL_BY_U_NAME } from '~/apollo/queries/user'
import {  CreateUserResult } from '~/apollo/schemas/result'

@injectable()
export default class UserRepository extends BaseRepository
  implements UserRepositoryInterface {
  async getUserByUName(uniqueName: string): Promise<UserDetail> {
    const {
      data: { user }
    } = await global._$app.apolloProvider.defaultClient.query({
      query: GET_USER_DETAIL_BY_U_NAME,
      variables: { uniqueName }
    })

    return user
  }
  public async getAuthUser(
    strategy: string,
    strategyId: string
  ): Promise<UserDetail> {
    const {
      data: { user }
    } = await global._$app.apolloProvider.defaultClient.query({
      query: GET_USER_DETAIL,
      variables: { strategy, strategyId }
    })

    return user
  }

  public async getOrCreate(params: any): Promise<CreateUserResult> {
    console.log(params)
    const { data: { login } } = await global._$app.apolloProvider.defaultClient.mutate({
      mutation: LOGIN_QUERY,
      variables: { params }
    })

    console.log("shit", login)

    return login
  }

  public async createUser(params: any): Promise<CreateUserResult> {
    const {
      data: { user }
    } = await global._$app.apolloProvider.defaultClient.mutate({
      mutation: CREATE_USER,
      variables: { params }
    })

    return user
  }

  public async updateUser(params: any): Promise<UserDetail> {
    const {
      data: { user }
    } = await global._$app.apolloProvider.defaultClient.mutate({
      mutation: UPDATE_USER,
      variables: { params }
    })

    return user
  }
}
