import { FC, MouseEvent } from 'react'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'

import { Data, EnhancedTableProps, HeadCell } from 'interfaces/advisors'
import { useTableHeadStyles } from './styles/advisorsTable'

const headCells: HeadCell[] = [
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'language', numeric: false, label: 'Language' },
  { id: 'status', numeric: false, label: 'Status' },
  { id: 'reviews', numeric: true, label: 'Reviews' },
]

export const EnhancedTableHead: FC<EnhancedTableProps> = (props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort } = props
  const classes = useTableHeadStyles()
  const onSortRequest = (event: MouseEvent<unknown>, property: keyof Data) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            className={classes.tableCell}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding="default"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              color="white"
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={e => onSortRequest(e, headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
