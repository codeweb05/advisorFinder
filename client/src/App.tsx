import { FC } from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { Advisors } from './components/Advisors'
import { THEME_OPTIONS } from './theme/Advisors'

export const App: FC = () => {
  const theme = createMuiTheme(THEME_OPTIONS)
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Advisors />
    </MuiThemeProvider>
  )
}
