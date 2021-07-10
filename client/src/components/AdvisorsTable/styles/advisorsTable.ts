import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { primaryBlue } from 'theme/constants'

export const useTableStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      paddingTop: theme.spacing(1),
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    tableContainer: {
      maxHeight: 'calc(100vh - 200px)',
    },
    table: {
      minWidth: 750,
      '& .MuiTableRow-root:hover': {
        background: '#81c784',
      },
    },
    formControlLabel: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    searchWrapper: {
      padding: `0 0 ${theme.spacing(1)}px ${theme.spacing(1)}px`,
    },
  }),
)

export const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: `0 ${theme.spacing(1)}px`,
    },
  }),
)

export const useLoadingStyles = makeStyles(() =>
  createStyles({
    loader: {
      height: '100vh',
      display: 'grid',
      placeItems: 'center',
    },
    error: {
      height: '100vh',
      display: 'grid',
      placeItems: 'center',
      fontSize: '3rem',
      color: primaryBlue,
    },
  }),
)

export const useTableHeadStyles = makeStyles(() =>
  createStyles({
    tableCell: {
      backgroundColor: primaryBlue,
      color: '#fff',
      '& .MuiTableSortLabel-root.MuiTableSortLabel-active, & .MuiTableSortLabel-root:hover': {
        color: '#fff',
        '&.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-icon': {
          color: '#fff',
        },
      },
    },
  }),
)
