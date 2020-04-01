import { UserDetail } from './userDetail'

export interface Post {
  id: number
  body: string
  title: string
  url: string
  uuid: string
  author: UserDetail
}
