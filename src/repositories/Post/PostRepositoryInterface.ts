import {Post} from '~/apollo/schemas/post'
import {CreatePostResult, Metadata, MutateLikeResult, PaginatedPostResult} from '~/apollo/schemas/result'


export default interface PostRepositoryInterface {
  getUserPostByUrl(url: string): Promise<Post>
  getUserPostsById(userId: number, metadata: Metadata): Promise<PaginatedPostResult>
  getUserPostsByUName(uniqueName: string, metadata: Metadata): Promise<PaginatedPostResult>
  getPostsByTag(tagUrl: string, metadata: Metadata): Promise<PaginatedPostResult>
  getPublicPosts(metadata: Metadata): Promise<PaginatedPostResult>
  createPost(params: any): Promise<CreatePostResult>
  updatePost(params: any): Promise<CreatePostResult>
  deletePost(params: any): Promise<CreatePostResult>

  /* Mutations for Likes */
  addLike(postUrl: string): Promise<MutateLikeResult>
  deleteLike(postUrl: string, likeId: number): Promise<MutateLikeResult>
}
