import { TokenType, UserDetail } from "./userDetail"
import { Post, Like } from "./post"

export type ResultMessage = {
    field?: string
    message?: string
    code?: string
}

export interface ApiResult<T> {
  messages?: Array<ResultMessage>
  result?: T
  successful?: boolean
}

export interface IErrorResult {
  message: string
  status: number
}

export type PaginatedPostResult = PaginatedResult<Post[]>

export interface Metadata {
  after?: string
  before?: string
  limit?: number
  totalCountCapExceeded?: boolean
  totalCount?: number
}

export interface PaginatedResult<T> {
  metadata: Metadata
  entries: T
}

export type MutateLikeResult = ApiResult<Like>
export type CreatePostResult = ApiResult<Post>
export type CreateUserResult = ApiResult<UserDetail & TokenType>
export type LoginResult = ApiResult<TokenType>
