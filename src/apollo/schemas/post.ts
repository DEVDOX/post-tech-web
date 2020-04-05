import { UserDetail } from './userDetail'
import { Tag } from './tag'

export type postState = 'published' | 'private' | 'draft'
export interface Post {
  id: number
  body: string
  title: string
  state: postState
  tags: Array<Tag>
  url: string
  uuid: string
  author: UserDetail
  insertedAt: string
  updatedAt: string
}