import gql from 'graphql-tag'

export const GET_USER_DETAIL = gql`
  query user($strategy: String, $id: String) {
    user: getUserDetail(strategy: $strategy, id: $id) {
      id
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($params: CreateParams!) {
    user: createUser(params: $params) {
      company
      displayName
      id
      location
      profileImageURL
      uniqueName
    }
  }
`
