import { Post, Like } from '~/apollo/schemas/post'
import {
  Metadata,
  MutateLikeResult,
  MutatePostResult,
  PaginatedPostResult
} from '~/apollo/schemas/result'
import { UserDetailType } from '~/types/graphql'

export default interface PostRepositoryInterface {
  getUserPostByUrl(url: string): Promise<Post>
  getUserPostsById(
    userId: number,
    metadata: Metadata
  ): Promise<PaginatedPostResult>

  getUserPostsByUName(
    uniqueName: string,
    metadata: Metadata
  ): Promise<PaginatedPostResult>

  getPostsByTag(
    tagUrl: string,
    metadata: Metadata
  ): Promise<PaginatedPostResult>

  getPublicPosts(metadata: Metadata): Promise<PaginatedPostResult>

  /* Queries for Likes */
  checkLikeForPost(post: string, currentUser: UserDetailType): Promise<Like>

  /* Mutations for Likes */
  getLike(url: string): Promise<Like>
  addLike(postUrl: string): Promise<MutateLikeResult>
  deleteLike(postUrl: string, likeId: number): Promise<MutateLikeResult>

  /* Mutations for posts */
  updatePost(params: any): Promise<MutatePostResult>
  createPost(params: any): Promise<MutatePostResult>
  deletePost(params: any): Promise<MutatePostResult>
}
