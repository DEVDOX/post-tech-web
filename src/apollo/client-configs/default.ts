import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

export default () => {
  const token = ''

  // add middleware
  const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: { Authorization: `Bearer ${token}` }
    })

    return forward(operation)
  })

  const httpLink = new HttpLink({ uri: process.env.API })
  const link = middlewareLink.concat(httpLink)

  return {
    link,
    cache: new InMemoryCache(),
    defaultHttpLink: false
  }
}
