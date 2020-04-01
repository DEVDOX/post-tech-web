import { injectable } from 'inversify'
import BaseRepository from '~/repositories/baseRepository'
import { GET_USER_DETAIL, CREATE_USER, LOGIN_QUERY } from '~/apollo/queries/user'
import { PostResult } from '~/apollo/schemas/result'
import PostRepositoryInterface from './PostRepositoryInterface'
import { Post } from '~/apollo/schemas/post'

@injectable()
export default class PostRepository extends BaseRepository
  implements PostRepositoryInterface {
  public async getPostList(): Promise<Post> {
    const {
      data: { user }
    } = await global._$app.$apollo.query({
      query: GET_USER_DETAIL,
      variables: { }
    })

    return user
  }

  public async createPost(params: any): Promise<PostResult> {
    const { data } = await global._$app.$apollo.mutate({
      mutation: LOGIN_QUERY,
      variables: { params }
    })

    return data
  }

  public async updatePost(params: any): Promise<PostResult> {
    const {
      data: { user }
    } = await global._$app.$apollo.mutate({
      mutation: CREATE_USER,
      variables: { params }
    })

    return user
  }

  public async deletePost(params: any): Promise<PostResult> {
    const {
      data: { user }
    } = await global._$app.$apollo.mutate({
      mutation: CREATE_USER,
      variables: { params }
    })

    return user
  }
}