import gql from 'graphql-tag'

export const GET_USER_DETAIL = gql`
  query user($strategy: String, $strategyId: String) {
    user: getUserDetail(strategy: $strategy, strategyId: $strategyId) {
      company
      displayName
      id
      location
      avatar
      uniqueName
    }
  }
`

export const CREATE_POST_QUERY = gql`
  mutation createPost($params: CreatePostParams!) {
    createPost(params: $params) {
      result {
        is_public
        is_draft
        url
        title
        body
        tags {
          name
          url_name
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
