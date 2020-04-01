import { Post } from '~/apollo/schemas/post'
import { CreatePostResult } from '~/apollo/schemas/result'

export default interface PostRepositoryInterface {
  getPostList(): Promise<Post>
  createPost(params: any): Promise<CreatePostResult>
  updatePost(params: any): Promise<CreatePostResult>
  deletePost(params: any): Promise<CreatePostResult>
}
