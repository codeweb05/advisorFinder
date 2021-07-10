import { FC } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import { useToolbarStyles } from './styles/advisorsTable'

const TITLE = 'Advisors'

export const EnhancedTableToolbar: FC = () => {
  const classes = useToolbarStyles()
  return (
    <Toolbar className={classes.root}>
      <Typography variant="h6" component="div">
        {TITLE}
      </Typography>
    </Toolbar>
  )
}
