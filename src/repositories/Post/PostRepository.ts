import { injectable } from 'inversify'
import BaseRepository from '~/repositories/baseRepository'
import { CREATE_POST_QUERY, GET_USER_POSTS_BY_U_NAME, GET_USER_POSTS_BY_ID, GET_PUBLIC_POSTS, GET_POST_BY_URL } from '~/apollo/queries/post'
import { CreatePostResult, PaginatedResult, Metadata } from '~/apollo/schemas/result'
import PostRepositoryInterface from './PostRepositoryInterface'
import { Post } from '~/apollo/schemas/post'

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

  async getUserPostsById(userId: number): Promise<PaginatedResult<Post[]>> {
    const {
      data: { result }
    } = await global._$app.apolloProvider.defaultClient.query({
      query: GET_USER_POSTS_BY_ID,
      variables: { userId }
    })

    return result
  }

  async getUserPostsByUName(uniqueName: string, metadata = <Metadata>{}): Promise<PaginatedResult<Post[]>> {
    const {
      data: { result }
    } = await global._$app.apolloProvider.defaultClient.query({
      query: GET_USER_POSTS_BY_U_NAME,
      variables: { uniqueName, metadata: metadata}
    })

    return result
  }

  async getPublicPosts(metadata = <Metadata>{}): Promise<PaginatedResult<Post[]>> {
    const {
      data: { result }
    } = await global._$app.apolloProvider.defaultClient.query({
      query: GET_PUBLIC_POSTS,
      variables: { after: "", before: "" , metadata: metadata}
    })

    return result
  }

  async createPost(params: any): Promise<CreatePostResult> {
      const { data } = await global._$app.apolloProvider.defaultClient.mutate({
        mutation: CREATE_POST_QUERY,
        variables: { params }
      })

      return data
  }

  async updatePost(params: any): Promise<CreatePostResult> {
    const {
      data: { user }
    } = await global._$app.apolloProvider.defaultClient.mutate({
      mutation: null,
      variables: { params }
    })

    return user
  }

  async deletePost(params: any): Promise<CreatePostResult> {
    const {
      data: { user }
    } = await global._$app.apolloProvider.defaultClient.mutate({
      mutation: null,
      variables: { params }
    })

    return user
  }
}
