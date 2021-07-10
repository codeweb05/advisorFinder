import React from 'react'
import { App } from './App'
import { MockedProvider } from '@apollo/client/testing'
import { shallow } from 'enzyme'

import './setupTest'

it('renders without crashing', () => {
  shallow(
    <MockedProvider>
      <App />
    </MockedProvider>,
  )
})
