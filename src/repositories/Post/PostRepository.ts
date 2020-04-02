import { injectable } from 'inversify'
import BaseRepository from '~/repositories/baseRepository'
import { CREATE_POST_QUERY, GET_USER_POSTS_BY_U_NAME, GET_USER_POSTS_BY_ID, GET_PUBLIC_POSTS, GET_POST_BY_URL } from '~/apollo/queries/post'
import { CreatePostResult } from '~/apollo/schemas/result'
import PostRepositoryInterface, { IErrorResult } from './PostRepositoryInterface'
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

  public async getUserPostsById(userId: number): Promise<Post[]> {
    const {
      data: { user }
    } = await global._$app.apolloProvider.defaultClient.query({
      query: GET_USER_POSTS_BY_ID,
      variables: { userId }
    })

    return user
  }

  public async getUserPostsByUName(uniqueName: string): Promise<Post[]> {
    const {
      data: { posts }
    } = await global._$app.apolloProvider.defaultClient.query({
      query: GET_USER_POSTS_BY_U_NAME,
      variables: { uniqueName }
    })

    return posts
  }

  public async getPublicPosts(): Promise<Post[]> {
    const {
      data: { posts }
    } = await global._$app.apolloProvider.defaultClient.query({
      query: GET_PUBLIC_POSTS,
      variables: { after: "", before: "" }
    })

    return posts
  }

  public async createPost(params: any): Promise<CreatePostResult | IErrorResult> {
    try {
      const { data } = await global._$app.apolloProvider.defaultClient.mutate({
        mutation: CREATE_POST_QUERY,
        variables: { params }
      })

      return data
    } catch (e) {
      return {
        status: 500,
        message: "blah" 
      }
    }
  }

  public async updatePost(params: any): Promise<CreatePostResult | IErrorResult> {
    const {
      data: { user }
    } = await global._$app.apolloProvider.defaultClient.mutate({
      mutation: null,
      variables: { params }
    })

    return user
  }

  public async deletePost(params: any): Promise<CreatePostResult | IErrorResult> {
    const {
      data: { user }
    } = await global._$app.apolloProvider.defaultClient.mutate({
      mutation: null,
      variables: { params }
    })

    return user
  }
}
