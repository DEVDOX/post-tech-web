import { injectable } from 'inversify'
import BaseRepository from '~/repositories/baseRepository'
import {
  CREATE_POST_QUERY,
  GET_USER_POSTS_BY_U_NAME,
  GET_USER_POSTS_BY_ID,
  GET_USER_LIKED_POSTS,
  GET_PUBLIC_POSTS,
  GET_POST_BY_URL,
  GET_POSTS_BY_TAG,

  UPDATE_POST_QUERY,
  DELETE_LIKE_QUERY,
  ADD_LIKE_QUERY,
  GET_LIKE,
  SEARCH_TAGS
} from '~/apollo/queries/post'
import {
  Metadata,
  PaginatedPostResult,
  MutateLikeResult,
  MutatePostResult
} from '~/apollo/schemas/result'
import { Tag } from '~/apollo/schemas/tag'
import PostRepositoryInterface from './PostRepositoryInterface'
import { Post, Like } from '~/apollo/schemas/post'

@injectable()
export default class PostRepository extends BaseRepository
  implements PostRepositoryInterface {
  async getUserPostByUrl(url: string): Promise<Post> {
    const {
      data: { post }
    } = await global._$app.apolloProvider.defaultClient.query({
      query: GET_POST_BY_URL,
      variables: { url }
    })

    return post
  }

  async getUserLikedPosts(uniqueName: string, metadata = <Metadata>{}): Promise<PaginatedPostResult> {
    const {
      data: { userLikedPosts }
    } = await global._$app.apolloProvider.defaultClient.query({
      query: GET_USER_LIKED_POSTS,
      variables: { uniqueName, metadata }
    })

    return userLikedPosts
  }

  async searchTagsByCharacter(char: string): Promise<Tag[]> {
    const {
      data: { searchTags }
    } = await global._$app.apolloProvider.defaultClient.query({
      query: SEARCH_TAGS,
      variables: { char }
    })

    return searchTags
  }

  async getUserPostsById(userId: number): Promise<PaginatedPostResult> {
    const {
      data: { result }
    } = await global._$app.apolloProvider.defaultClient.query({
      query: GET_USER_POSTS_BY_ID,
      variables: { userId }
    })

    return result
  }

  async getUserPostsByUName(uniqueName: string, metadata = <Metadata>{}): Promise<PaginatedPostResult> {
    const {
      data: { result }
    } = await global._$app.apolloProvider.defaultClient.query({
      query: GET_USER_POSTS_BY_U_NAME,
      variables: { uniqueName, metadata: metadata}
    })

    return result
  }

  async getPostsByTag(url: string, metadata = <Metadata>{}): Promise<PaginatedPostResult> {
    const {
      data: { result }
    } = await global._$app.apolloProvider.defaultClient.query({
      query: GET_POSTS_BY_TAG,
      variables: { url, metadata}
    })

    return result
  }


  async getPublicPosts(metadata = <Metadata>{}): Promise<PaginatedPostResult> {
    const {
      data: { result }
    } = await global._$app.apolloProvider.defaultClient.query({
      query: GET_PUBLIC_POSTS,
      variables: { after: "", before: "" , metadata: metadata}
    })

    return result
  }

  public async createPost(params: any): Promise<MutatePostResult> {
    const { data: { post } } = await global._$app.apolloProvider.defaultClient.mutate({
      mutation: CREATE_POST_QUERY,
      variables: { params }
    })

    return post
  }

  public async updatePost(params: any): Promise<MutatePostResult> {
    const {
      data: { updatePost }
    } = await global._$app.apolloProvider.defaultClient.mutate({
      mutation: UPDATE_POST_QUERY,
      variables: { params }
    })

    return updatePost
  }

  async deletePost(params: any): Promise<MutatePostResult> {
    const {
      data: { user }
    } = await global._$app.apolloProvider.defaultClient.mutate({
      mutation: null,
      variables: { params }
    })

    return user
  }

  async getLike(url: string): Promise<Like> {
    const {
      data: { getLike }
    } = await global._$app.apolloProvider.defaultClient.mutate({
      mutation: GET_LIKE,
      variables: { url }
    })

    return getLike
  }

  async addLike(url: string): Promise<MutateLikeResult> {
    const {
      data: { addLike }
    } = await global._$app.apolloProvider.defaultClient.mutate({
      mutation: ADD_LIKE_QUERY,
      variables: { url }
    })

    return addLike
  }

  async deleteLike(url: string): Promise<MutateLikeResult> {
    const {
      data: { deleteLike }
    } = await global._$app.apolloProvider.defaultClient.mutate({
      mutation: DELETE_LIKE_QUERY,
      variables: { url }
    })

    return deleteLike
  }
}
