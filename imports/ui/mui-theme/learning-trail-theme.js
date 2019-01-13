import { createMuiTheme } from '@material-ui/core/styles'
import { colors } from 'meteor/buds-shared-meteor-ui'

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
