import React from 'react'
import PropTypes from 'prop-types'
import MUIMuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MUIMuiThemeProviderNext from 'material-ui-next/styles/MuiThemeProvider'
import { muiThemeNext } from '../src/styles/themes'

const MuiThemeProvider = ({ children }) => (
  <MUIMuiThemeProvider>
    <MUIMuiThemeProviderNext theme={muiThemeNext}>
      {children}
    </MUIMuiThemeProviderNext>
  </MUIMuiThemeProvider>
)

MuiThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default MuiThemeProvider
