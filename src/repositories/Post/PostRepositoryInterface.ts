import { Post } from '~/apollo/schemas/post'
import { PostResult } from '~/apollo/schemas/result';

export default interface PostRepositoryInterface {
  getPostList(): Promise<Post>
  createPost(params: any): Promise<PostResult>
  updatePost(params: any): Promise<PostResult>
  deletePost(params: any): Promise<PostResult>
}
