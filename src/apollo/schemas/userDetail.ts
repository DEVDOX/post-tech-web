export interface UserDetail {
  id: string
  userId: number
  displayName: string
  profileImageUrl: string
  location: string
  organization: string
  company: string
  bio: string
  uniqueName: string
  avatar: string
}

export type TokenType = {
  token: string
  userDetail: UserDetail
}
