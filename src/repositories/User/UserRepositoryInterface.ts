import { UserDetail } from '~/apollo/schemas/userDetail'
import { MutateUserResult } from '~/apollo/schemas/result'

export default interface UserRepositoryInterface {
  getAuthUser(strategy: string, strategyId: string): Promise<UserDetail>
  createUser(params: any): Promise<MutateUserResult>
  updateUser(params: any): Promise<UserDetail>
  getOrCreate(params: any): Promise<MutateUserResult>
  getUserByUName(uniqueName: string): Promise<UserDetail>
}
