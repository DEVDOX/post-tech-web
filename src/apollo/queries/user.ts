import gql from 'graphql-tag'

export const GET_USER_DETAIL = gql`
  query user($strategy: String, $strategyId: String) {
    user: getUserDetail(strategy: $strategy, strategyId: $strategyId) {
      company
      displayName
      id
      tagline
      location
      avatar
      uniqueName
    }
  }
`

export const GET_USER_DETAIL_BY_U_NAME = gql`
  query user($uniqueName: String) {
    user: getUserDetailByUName(uniqueName: $uniqueName) {
      company
      displayName
      id
      tagline
      location
      avatar
      uniqueName
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($params: CreateParams!) {
    user: createUser(params: $params) {
      result {
        company
        displayName
        id
        tagline
        location
        avatar
        uniqueName
      }
      successful
      messages {
        code
        message
        field
      }
    }
  }
`

export const LOGIN_QUERY = gql`
  mutation login($params: LoginParams!) {
    login(params: $params) {
      result {
        token
        userDetail {
          displayName
        }
      }
      successful
      messages {
        code
        message
        field
      }
    }
  }
`
