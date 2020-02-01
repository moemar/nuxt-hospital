import { InMemoryCache } from 'apollo-cache-inmemory'
export default function(context) {
  return {
    httpLinkOptions: {
      uri: 'https://graphql.fauna.com/graphql',
      credentials: 'same-origin'
    },
    cache: new InMemoryCache(),
    wsEndpoint: 'ws://graphql.fauna.com/graphql'
  }
}
