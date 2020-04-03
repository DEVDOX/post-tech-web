import gql from 'graphql-tag'

export const GET_POST_BY_URL = gql`
  query getPostByUrl($url: String) {
    post: getPostByUrl(url: $url) {
      title
      url
      tags {
        name
        urlName
      }
      body
      insertedAt
      updatedAt
      author: userDetail {
        id
        uniqueName
        tagline
        avatar
        displayName
      }
    }
  }
`

export const GET_USER_POSTS_BY_ID = gql`
  query getUserPostsById($userId: Integer) {
    posts: getUserPostsById(userId: $userId) {
      title
      url
      tags {
        name
        urlName
      }
      body
      author: userDetail {
        id
        uniqueName
        tagline
        avatar
        displayName
      }
    }
  }
`

export const GET_PUBLIC_POSTS = gql`
  query getPublicPosts($after: String, $before: String) {
    posts: getPublicPosts(after: $after, before: $before) {
      title
      url
      tags {
        name
        urlName
      }
      body
      author: userDetail {
        id
        uniqueName
        tagline
        avatar
        displayName
      }
    }
  }
`

export const GET_USER_POSTS_BY_U_NAME = gql`
  query getUserPostsByUName($uniqueName: String!) {
    posts: getUserPostsByUName(uniqueName: $uniqueName) {
      title
      url
      tags {
        name
        urlName
      }
      body
      author: userDetail {
        id
        uniqueName
        tagline
        avatar
        displayName
      }
    }
  }
`

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

export const CREATE_POST_QUERY = gql`
  mutation createPost($params: CreatePostParams!) {
    createPost(params: $params) {
      result {
        state
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
