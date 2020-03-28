import gql from 'graphql-tag'

export const GET_USER_BY_ID = gql`
  query user($id: ID) {
    user: getUser(id: $id) {
      id
      insertedAt
    }
  }
`

export const GET_USER_DETAIL = gql`
  query user($id: ID) {
    user: getUser(id: $id) {
      id
      insertedAt
    }
  }
`
