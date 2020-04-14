import { TokenType, UserDetail } from "./userDetail"
import { Post, Like } from "./post"

export type ResultMessage = {
    field?: string
    message?: string
    code?: string
}

export interface MutateResult<T> {
  messages?: Array<ResultMessage>
  result?: T
  successful?: boolean
}

export interface IErrorResult {
  message: string
  status: number
}

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

export type PaginatedPostResult = PaginatedResult<Post[]>

export type MutateLikeResult = MutateResult<Like>
export type MutatePostResult = MutateResult<Post>
export type MutateUserResult = MutateResult<UserDetail & TokenType>
export type LoginResult = MutateResult<TokenType>
