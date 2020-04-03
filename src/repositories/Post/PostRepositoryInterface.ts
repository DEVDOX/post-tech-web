import { Post } from '~/apollo/schemas/post'
import { CreatePostResult } from '~/apollo/schemas/result'

export interface IErrorResult {
  message: string
  status: number
}

export default interface PostRepositoryInterface {
  getUserPostByUrl(url: string): Promise<Post>
  getUserPostsById(userId: number): Promise<Post[]>
  getUserPostsByUName(uniqueName: string): Promise<Post[]>
  getPublicPosts(): Promise<Post[]>
  createPost(params: any): Promise<CreatePostResult | IErrorResult>
  updatePost(params: any): Promise<CreatePostResult | IErrorResult>
  deletePost(params: any): Promise<CreatePostResult | IErrorResult>
}
