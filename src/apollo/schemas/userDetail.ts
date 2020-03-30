export interface UserDetailInterface {
  id: string
  userId: number
  displayName: string
  avatag: string
  location: string
  organization: string
  company: string
  bio: string
  uniqueName: string
}

export interface CreatePayload {
  messages: {
    field: string
    message: string
    code: string
  }
  result: UserDetailInterface
  successful: boolean
}

export interface LoginResultInterface {
  messages?: {
    field?: string
    message?: string
    code?: string
  }
  result: {
    token: string
    userDetail: UserDetailInterface
  }
  successful?: boolean
}
