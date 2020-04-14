import { Post, Like } from '~/apollo/schemas/post'
import {
  Metadata,
  MutateLikeResult,
  MutatePostResult,
  PaginatedPostResult
} from '~/apollo/schemas/result'
import {Tag} from '~/apollo/schemas/tag'

export default interface PostRepositoryInterface {
  getUserPostByUrl(url: string): Promise<Post>
  getUserPostsById(
    userId: number,
    metadata: Metadata
  ): Promise<PaginatedPostResult>
  getUserLikedPosts(
    uniqueName: string,
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
  searchTagsByCharacter(char: string): Promise<Tag[]>

  /* Mutations for Likes */
  getLike(url: string): Promise<Like>
  addLike(postUrl: string): Promise<MutateLikeResult>
  deleteLike(postUrl: string): Promise<MutateLikeResult>

  /* Mutations for posts */
  updatePost(params: any): Promise<MutatePostResult>
  createPost(params: any): Promise<MutatePostResult>
  deletePost(params: any): Promise<MutatePostResult>
}
