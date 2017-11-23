import blue from 'material-ui/colors/blue'
import deepPurple from 'material-ui/colors/deepPurple'
import { createMuiTheme } from 'material-ui/styles'

export const muiTheme = createMuiTheme({
  palette: {
    type: 'light',
    common: {
      faintBlack: 'rgb(234, 243, 248)',
    },
    primary: {
      ...blue,
      A100: '#80d8ff',
      A200: '#40c4ff',
      A400: '#00b0ff',
      A700: '#0091ea',
    },
    secondary: deepPurple,
    input: {
      bottomLine: '#e3ecf7',
      helperText: 'rgba(0, 0, 0, 0.54)',
      labelText: 'rgba(0, 0, 0, 0.54)',
      inputText: 'rgba(0, 0, 0, 0.87)',
      disabled: 'rgba(0, 0, 0, 0.42)',
    },
  },
  app: {
    facebookColor: '#3b5998',
    facebookTextColor: '#fff',
    googlePlusColor:'#dd4b39',
    googlePlusTextColor: '#fff',
    twitterColor: '#55acee',
    twitterTextColor: '#fff'
  },
  appBar: {
    buttonColor: '#fff'
  },
  menu: {
    textColor: '#fff',
    backgroundColor: '#fff'
  },
  table: {
    headerTextColor: '#fff',
    headerIconColor: '#fff',
    backgroundColor: '#fff'
  },
  widget: {
    whiteText: '#fff'
  },
  contacts: {
    textColor: '#fff'
  }
})
