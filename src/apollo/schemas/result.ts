import { TokenType, UserDetail } from "./userDetail"
import { Post } from "./post"

interface ApiResult<T> {
  messages?: {
    field?: string
    message?: string
    code?: string
  }[]
  result: T
  successful: boolean
}

export type CreatePostResult = ApiResult<Post>
export type CreateUserResult = ApiResult<UserDetail & TokenType>
export type LoginResult = ApiResult<TokenType>