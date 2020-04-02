import { UserInterface } from '~/apollo/schemas/user'
import { UserDetail } from '~/apollo/schemas/userDetail'
import { CreateUserResult } from '~/apollo/schemas/result'

export default interface UserRepositoryInterface {
  getAuthUser(strategy: string, strategyId: string): Promise<UserDetail>
  createUser(params: any): Promise<CreateUserResult>
  getOrCreate(params: any): Promise<CreateUserResult>
  getUserByUName(uniqueName: string): Promise<UserDetail>
}
