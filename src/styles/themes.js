import blue from 'material-ui-next/colors/blue'
import deepPurple from 'material-ui-next/colors/deepPurple'
import { createMuiTheme } from 'material-ui-next/styles'

export const muiThemeNext = createMuiTheme({
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
    backgroundColor: '#fff'
  },
  table: {
    headerTextColor: '#fff',
    headerIconColor: '#fff',
    backgroundColor: '#fff'
  }
})
