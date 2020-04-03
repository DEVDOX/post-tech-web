import { UserDetail } from './userDetail'

export interface UserInterface {
  id?: string
  email?: string
  qiitaId?: string
  githubId?: string
  twitterId?: string
  tos?: boolean
  userDetail?: UserDetail
}
