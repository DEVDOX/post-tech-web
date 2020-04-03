import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './types'

import { UserRepositoryInterface, PostRepositoryInterface } from './interfaces'
import UserRepository from '~/repositories/User/UserRepository'
import PostRepository from '~/repositories/Post/PostRepository'

const serviceContainer = new Container()

serviceContainer
  .bind<PostRepositoryInterface>(TYPES.PostRepositoryInterface)
  .to(PostRepository)

serviceContainer
  .bind<UserRepositoryInterface>(TYPES.UserRepositoryInterface)
  .to(UserRepository)

export { serviceContainer }
