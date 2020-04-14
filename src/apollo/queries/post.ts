import gql from 'graphql-tag'

/*
 * Gets a single Post by the given url
 * returns Post
 */
export const GET_POST_BY_URL = gql`
  query postByUrl($url: String) {
    post: postByUrl(url: $url) {
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
      author {
        id
        uniqueName
        tagline
        avatar
        displayName
      }
      insertedAt
      updatedAt
    }
  }
`
/*
 * Gets a single Post by the given url
 * returns Post
 */
export const GET_USER_LIKED_POSTS = gql`
  query userLikedPosts($uniqueName: String!, $metadata: MetadataInput) {
    userLikedPosts(uniqueName: $uniqueName, metadata: $metadata) {
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
        state
        body
        author {
          id
          uniqueName
          tagline
          avatar
          displayName
        }
        insertedAt
        updatedAt
      }
    }
  }
`

export const SEARCH_TAGS = gql`
  query searchTags($char: String!) {
    searchTags(char: $char) {
      id
      name
      urlName
    }
  }
`

export const GET_POSTS_BY_TAG = gql`
  query postsByTag($url: String, $metadata: MetadataInput) {
    result: postsByTag(url: $url, metadata: $metadata) {
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
        insertedAt
        updatedAt
      }
    }
  }
`

/*
 * Get a paginated post object for a specific user
 */
export const GET_USER_POSTS_BY_ID = gql`
  query userPostsById($userId: Integer) {
    posts: userPostsById(userId: $userId) {
      metadata {
        after
        before
        limit
      }
      title
      url
      state
      tags {
        name
        urlName
      }
      entries {
        state
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
        insertedAt
        updatedAt
      }
    }
  }
`

export const GET_PUBLIC_POSTS = gql`
  query publicPosts($metadata: MetadataInput) {
    result: publicPosts(metadata: $metadata) {
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
        state
        body
        author {
          id
          uniqueName
          tagline
          avatar
          displayName
        }
        insertedAt
        updatedAt
        likeCount
      }
    }
  }
`

export const GET_USER_POSTS_BY_U_NAME = gql`
  query userPostsByUName($uniqueName: String!, $metadata: MetadataInput) {
    result: userPostsByUName(uniqueName: $uniqueName, metadata: $metadata) {
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
        insertedAt
        updatedAt
      }
    }
  }
`

export const GET_USER_DETAIL = gql`
  query userDetail($strategy: String, $strategyId: String) {
    user: userDetail(strategy: $strategy, strategyId: $strategyId) {
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

/* Mutations */
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
        tags {
          id
          name
        }
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
  query Like($url: String!) {
    Like(url: $url) {
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

