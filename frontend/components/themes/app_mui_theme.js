import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  blue500, blue700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';


const AppMuiTheme = getMuiTheme({
  spacing: spacing,
  fontFamily: 'Roboto, Lato, Helvetica Neue, Helvetica, Arial, sans-serif',
  palette: {
    primary1Color: blue700,
    primary2Color: blue500,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: blue500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  }
});

export default AppMuiTheme;
