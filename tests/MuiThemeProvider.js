import React from 'react'
import PropTypes from 'prop-types'
import MUIMuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { muiTheme } from '../src/styles/themes'

const MuiThemeProvider = ({ children }) => (
  <MUIMuiThemeProvider theme={muiTheme}>
    {children}
  </MUIMuiThemeProvider>
)

MuiThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default MuiThemeProvider
