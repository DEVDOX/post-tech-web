import { TokenType, UserDetail } from "./userDetail"
import { Post } from "./post"

interface ApiResult<T> {
  messages?: {
    field?: string
    message?: string
    code?: string
  }
  result: T
  successful: boolean
}

export type PostResult = ApiResult<Post>
export type UserResult = ApiResult<UserDetail>
export type LoginResult = ApiResult<TokenType>