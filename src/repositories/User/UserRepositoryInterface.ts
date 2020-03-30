import { UserInterface } from '~/apollo/schemas/user'
import {
  CreatePayload,
  UserDetailInterface,
  LoginResultInterface
} from '~/apollo/schemas/userDetail'

export default interface UserRepositoryInterface {
  getAuthUser(strategy: string, strategyId: string): Promise<UserInterface>
  createUser(params: any): Promise<CreatePayload>
  getOrCreate(params: any): Promise<LoginResultInterface>
}
