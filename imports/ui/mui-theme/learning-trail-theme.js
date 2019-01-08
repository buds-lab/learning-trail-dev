import { createMuiTheme } from '@material-ui/core/styles'
import colors from './colors'

export default createMuiTheme({
  palette: {
    primary: {
      main: colors.main,
      contrastText: '#ffffff'
    },
    secondary: {
      main: colors.secondary,
      contrastText: '#ffffff'
    }
  }
})
