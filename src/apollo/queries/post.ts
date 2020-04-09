import gql from 'graphql-tag'

/*
 * Gets a single Post by the given url
 * returns Post
 */
export const GET_POST_BY_URL = gql`
  query getPostByUrl($url: String) {
    post: getPostByUrl(url: $url) {
      title
      url
      state
      likes {
        id
      }
      tags {
        name
        urlName
      }
      body
      insertedAt
      updatedAt
      author {
        id
        uniqueName
        tagline
        avatar
        displayName
      }
    }
  }
`
export const GET_POSTS_BY_TAG = gql`
  query getPostsByTag($url: String, $metadata: MetadataInput) {
    result: getPostsByTag(url: $url, metadata: $metadata) {
      metadata {
        after
        before
        limit
      }
      entries {
        title
        url
        tags {
          name
          urlName
        }
        body
        author {
          id
          uniqueName
          tagline
          avatar
          displayName
        }
      }
    }
  }
`

/*
 * Get a paginated post object for a specific user
 */
export const GET_USER_POSTS_BY_ID = gql`
  query getUserPostsById($userId: Integer) {
    posts: getUserPostsById(userId: $userId) {
      title
      url
      state
      tags {
        name
        urlName
      }
      entries {
        title
        url
        tags {
          name
          urlName
        }
        body
        author {
          id
          uniqueName
          tagline
          avatar
          displayName
        }
      }
    }
  }
`

export const GET_PUBLIC_POSTS = gql`
  query getPublicPosts($metadata: MetadataInput) {
    result: getPublicPosts(metadata: $metadata) {
      metadata {
        after
        before
        limit
      }
      entries {
        title
        url
        tags {
          name
          urlName
        }
        body
        author {
          id
          uniqueName
          tagline
          avatar
          displayName
        }
      }
    }
  }
`

export const GET_USER_POSTS_BY_U_NAME = gql`
  query getUserPostsByUName($uniqueName: String!, $metadata: MetadataInput) {
    result: getUserPostsByUName(uniqueName: $uniqueName, metadata: $metadata) {
      metadata {
        after
        before
      }
      entries {
        title
        url
        tags {
          name
          urlName
        }
        body
        author {
          id
          uniqueName
          tagline
          avatar
          displayName
        }
      }
    }
  }
`

/* Mutations */
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
    post: createPost(params: $params) {
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
        userDetails {
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

export const UPDATE_POST_QUERY = gql`
  mutation updatePost($params: UpdatePostParams!) {
    updatePost(params: $params) {
      result {
        title
        body
        tags
        state
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

export const ADD_LIKE_QUERY = gql`
  mutation addLike($url: String!) {
    addLike(url: $url) {
      result {
        id
        insertedAt
        updatedAt
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

export const GET_LIKE = gql`
  query getLike($url: String!) {
    getLike(url: $url) {
      id
      insertedAt
    }
  }
`

export const DELETE_LIKE_QUERY = gql`
  mutation deleteLike($url: String!) {
    deleteLike(url: $url) {
      successful
    }
  }
`
