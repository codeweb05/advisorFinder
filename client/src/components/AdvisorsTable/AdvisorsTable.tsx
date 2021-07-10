import { FC, SyntheticEvent, MouseEvent, useCallback } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  FormControlLabel,
  Switch,
  TextField,
} from '@material-ui/core'

import { EnhancedTableHead } from './AdvisorsTableHead'
import { EnhancedTableToolbar } from './AdvisorsTableToolbar'

import { debounce } from './utils/advisorsTable'
import { AdvisorsTableProps, Data } from 'interfaces/advisors'
import { useTableStyles } from './styles/advisorsTable'

export const AdvisorsTable: FC<AdvisorsTableProps> = ({
  advisors,
  onFetchData,
  searchValue,
  shouldShowOnline,
  order,
  orderBy,
  setOrder,
  setOrderBy,
  setShouldShowOnline,
  setSearchValue,
  refetch,
}) => {
  const classes = useTableStyles()
  // const filteredItems = useMemo(() => {
  //   const sortedAdvisors = arraySort(advisors, getComparator(order, orderBy))
  //   return filterAdvisors({ searchValue, shouldShowOnline }, sortedAdvisors)
  // }, [onFetchData, searchValue, shouldShowOnline, order, orderBy])

  const debouncedSearch = useCallback(
    debounce(e => {
      setSearchValue(e.target.value)
      refetch({
        searchValue: e.target.value,
      })
    }, 400),
    [setSearchValue, refetch],
  )

  const handleScroll = ({ currentTarget }: SyntheticEvent) => {
    if (currentTarget.scrollTop + currentTarget.clientHeight === currentTarget.scrollHeight) {
      onFetchData(searchValue, shouldShowOnline)
    }
  }

  const handleRequestSort = (event: MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    const newOrder = isAsc ? 'desc' : 'asc'
    setOrder(newOrder)
    setOrderBy(property)
    refetch({
      order: newOrder,
      orderBy: property,
    })
  }

  const toggleShouldShowOnline = () => {
    setShouldShowOnline(!shouldShowOnline)
    refetch({
      shouldShowOnline: !shouldShowOnline,
    })
  }

  return (
    <div className={classes.root} id="table-wrapper">
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <div className={classes.searchWrapper}>
          <TextField label="Search..." onChange={debouncedSearch} />
        </div>
        <TableContainer className={classes.tableContainer} onScroll={handleScroll}>
          <Table stickyHeader className={classes.table}>
            <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {advisors.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.language}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell align="right">{row.reviews}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <FormControlLabel
        className={classes.formControlLabel}
        control={<Switch checked={shouldShowOnline} onChange={toggleShouldShowOnline} />}
        label="Show online advisors"
      />
    </div>
  )
}
