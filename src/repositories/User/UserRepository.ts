import { injectable } from 'inversify'
import BaseRepository from '~/repositories/baseRepository'
import UserRepositoryInterface from '~/repositories/User/UserRepositoryInterface'
import { UserInterface } from '~/apollo/schemas/user'
import { GET_USER_DETAIL, CREATE_USER } from '~/apollo/queries/user'

@injectable()
export default class UserRepository extends BaseRepository
implements UserRepositoryInterface {
  public async getAuthUser(
    strategy: string,
    id: string
  ): Promise<UserInterface> {
    try {
      const { data } = await global._$app.$apollo.query({
        query: GET_USER_DETAIL,
        variables: { strategy, id }
      })

      return data
    } catch (e) {
      console.error(e)
    }
  }

  public async createUser(params: any): Promise<UserInterface> {
    try {
      const { user } = await global._$app.$apollo.query({
        query: CREATE_USER,
        variables: { params }
      })

      return user
    } catch (e) {
      console.error(e)
    }
  }
}
