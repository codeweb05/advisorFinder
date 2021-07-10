import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client/react'

import { App } from './App'
import { apolloClient } from './api/client'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)

reportWebVitals()
