export interface UserDetailInterface {
  id: string
  userId: number
  displayName: string
<<<<<<< HEAD
  avatag: string
=======
  profileImageUrl: string
>>>>>>> e4090c0093ca9a76fb8e10708aceada7ab1577d1
  location: string
  organization: string
  company: string
  bio: string
  uniqueName: string
}
<<<<<<< HEAD

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
=======
>>>>>>> e4090c0093ca9a76fb8e10708aceada7ab1577d1
