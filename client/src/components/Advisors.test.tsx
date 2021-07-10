import TestRenderer from 'react-test-renderer'
import { MockedProvider } from '@apollo/client/testing'
import { waitFor } from '@testing-library/react'

import { GET_ADVISORS_QUERY, Advisors } from './Advisors'

function createAdvisors() {
  return [{ id: 1, name: 'Jerry Borer', language: 'Iceland', reviews: 38226, status: 'online', __typename: 'Advisor' }]
}

describe('Advisors', () => {
  it('renders Advisors component without error', () => {
    const mocks = [
      {
        request: {
          query: GET_ADVISORS_QUERY,
          variables: {
            offset: 0,
            limit: 30,
          },
        },
        result: {
          data: {
            advisors: createAdvisors(),
          },
        },
      },
    ]
    const component = TestRenderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Advisors />
      </MockedProvider>,
    )

    const tree = component.toJSON()
    expect(tree.children).toContain('Loading...')
  })

  it('should show error UI', async () => {
    const userMock = [{
      request: {
        query: GET_ADVISORS_QUERY,
        variables: {
          offset: 0,
          limit: 30,
        },
      },
      error: new Error('An error occurred'),
    }]

    const component = TestRenderer.create(
      <MockedProvider mocks={userMock} addTypename={false}>
        <Advisors />
      </MockedProvider>,
    )

    // await new Promise(resolve => setTimeout(resolve, 0)) // wait for response
    await waitFor(() => new Promise(res => setTimeout(res, 0)))

    const tree = component.toJSON()
    expect(tree.children).toContain('Error while fetching advisors :(')
  })

  it('renders advisors list', async () => {
    const mocks = [
      {
        request: {
          query: GET_ADVISORS_QUERY,
          variables: {
            offset: 0,
            limit: 30,
          },
        },
        result: {
          data: {
            advisors: createAdvisors(),
          },
        },
      },
    ]

    const component = TestRenderer.create(
      <MockedProvider mocks={mocks}>
        <Advisors />
      </MockedProvider>,
    )

    await waitFor(() => new Promise(res => setTimeout(res, 0)))

    const tableWrapper = component.root.findByProps({ id: 'table-wrapper' })
    expect(tableWrapper).toBeTruthy()
  })
})
