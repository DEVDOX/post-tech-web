import { injectable } from 'inversify'
import BaseRepository from '~/repositories/baseRepository'
import { CREATE_POST_QUERY, CREATE_USER, LOGIN_QUERY } from '~/apollo/queries/post'
import { CreatePostResult } from '~/apollo/schemas/result'
import PostRepositoryInterface from './PostRepositoryInterface'
import { Post } from '~/apollo/schemas/post'

@injectable()
export default class PostRepository extends BaseRepository
  implements PostRepositoryInterface {
  public async getPostList(): Promise<Post> {
    const {
      data: { user }
    } = await global._$app.$apollo.query({
      query: null,
      variables: { }
    })

    return user
  }

  public async createPost(params: any): Promise<CreatePostResult> {
    console.log(global._$app.apolloProvider.defaultClient)
    try {
      const { data } = await global._$app.apolloProvider.defaultClient.mutate({
        mutation: CREATE_POST_QUERY,
        variables: { params }
      })

      return data
    } catch (e) {
    }
  }

  public async updatePost(params: any): Promise<CreatePostResult> {
    const {
      data: { user }
    } = await global._$app.$apollo.mutate({
      mutation: null,
      variables: { params }
    })

    return user
  }

  public async deletePost(params: any): Promise<CreatePostResult> {
    const {
      data: { user }
    } = await global._$app.$apollo.mutate({
      mutation: null,
      variables: { params }
    })

    return user
  }
}
