import { useState, FC, useCallback } from 'react'
import Loader from 'react-loader-spinner'
import { useQuery, gql, ApolloQueryResult } from '@apollo/client'
import { Container, Typography } from '@material-ui/core'

import { AdvisorsTable } from './AdvisorsTable/AdvisorsTable'

import { primaryBlue } from 'theme/constants'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { useLoadingStyles } from 'components/AdvisorsTable/styles/advisorsTable'
import { Data, Order } from 'interfaces/advisors'

export const GET_ADVISORS_QUERY = gql`
  query advisors(
    $limit: Int
    $offset: Int
    $searchValue: String
    $shouldShowOnline: Boolean
    $order: String
    $orderBy: String
  ) {
    advisors(
      limit: $limit
      offset: $offset
      searchValue: $searchValue
      shouldShowOnline: $shouldShowOnline
      order: $order
      orderBy: $orderBy
    ) {
      id
      name
      language
      reviews
      status
    }
  }
`

const DEFAULT_OFFSET = 30
const DEFAULT_LIMIT = 30
const ERROR_TEXT = 'Error while fetching advisors :('

export const Advisors: FC = () => {
  const [offset, setOffset] = useState<number>(DEFAULT_OFFSET)
  const [shouldFetchAgain, setShouldFetchAgain] = useState<boolean>(true)
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Data>('name')
  const [shouldShowOnline, setShouldShowOnline] = useState(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const classes = useLoadingStyles()

  const loaderProps = {
    className: classes.loader,
  }

  const { loading, error, data, fetchMore, refetch } = useQuery(GET_ADVISORS_QUERY, {
    variables: {
      offset: 0,
      limit: DEFAULT_LIMIT,
      searchValue,
      shouldShowOnline,
      order,
      orderBy,
    },
  })

  const fetchHandler = useCallback(
    async (searchValue: string, shouldShowOnline: boolean) => {
      try {
        if (!shouldFetchAgain) return
        const currentLength = (data && data.advisors && data.advisors.length) || 0
        const newData: ApolloQueryResult<any> = await fetchMore({
          variables: {
            offset,
            limit: DEFAULT_LIMIT,
            searchValue,
            shouldShowOnline,
            order,
            orderBy,
          },
        })
        const advisors = (newData && newData.data && newData.data.advisors) || []
        setShouldFetchAgain(advisors.length !== 0)
        setOffset(currentLength + advisors.length)
      } catch (e) {
        console.error(e.message)
      }
    },
    [offset, DEFAULT_LIMIT, shouldFetchAgain, fetchMore, data],
  )

  if (loading) return <Loader {...loaderProps} type="BallTriangle" color={primaryBlue} />
  if (error)
    return (
      <Typography className={classes.error} variant="caption">
        {ERROR_TEXT}
      </Typography>
    )

  return (
    <Container>
      {data && (
        <AdvisorsTable
          advisors={data.advisors || []}
          onFetchData={fetchHandler}
          order={order}
          setOrder={setOrder}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          shouldShowOnline={shouldShowOnline}
          setShouldShowOnline={setShouldShowOnline}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          refetch={refetch}
        />
      )}
    </Container>
  )
}
