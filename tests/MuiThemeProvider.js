import React from 'react'
import PropTypes from 'prop-types'
import MUIMuiThemeProviderNext from 'material-ui-next/styles/MuiThemeProvider'
import { muiThemeNext } from '../src/styles/themes'

const MuiThemeProvider = ({ children }) => (
  <MUIMuiThemeProviderNext theme={muiThemeNext}>
    {children}
  </MUIMuiThemeProviderNext>
)

MuiThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default MuiThemeProvider
