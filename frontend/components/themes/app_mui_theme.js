import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import {
  blue500, blue700, lightBlue600,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/colors';
import blue from 'material-ui/colors/blue'
import green from 'material-ui/colors/green'

// Make the primary blue a bit darker
blue[500] = blue[800]
blue[600] = blue[800]

const AppMuiTheme = createMuiTheme({
  fontFamily: 'Proxima-Nova, Lato, Helvetica Neue, Helvetica, Arial, sans-serif',
  palette: {
    primary: blue,
    secondary: green,
    darkPrimary: blue[800],
  },
});

export default AppMuiTheme;
