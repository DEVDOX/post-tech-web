import { UserInterface } from '~/apollo/schemas/user'

export default interface UserRepositoryInterface {
  getAuthUser(strategy: string, id: string): Promise<UserInterface>
  createUser(params: any): Promise<UserInterface>
}
