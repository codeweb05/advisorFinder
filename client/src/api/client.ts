import { ApolloClient, InMemoryCache } from '@apollo/client'

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://advisors-search.herokuapp.com/graphql'
    : 'http://localhost:4000/graphql'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        advisors: {
          keyArgs: false,
          merge(existing = [], incoming = [], { args, readField }) {
            if (args && !args.offset) {
              return [...incoming]
            }
            return [...existing, ...incoming]
          },
        },
      },
    },
  },
})

export const apolloClient = new ApolloClient({
  uri: API_URL,
  cache,
})
