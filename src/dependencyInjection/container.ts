import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './types'

import { UserRepositoryInterface } from './interfaces'
import UserRepository from '~/repositories/User/UserRepository'

const serviceContainer = new Container()

serviceContainer
  .bind<UserRepositoryInterface>(TYPES.UserRepositoryInterface)
  .to(UserRepository)

export { serviceContainer }
