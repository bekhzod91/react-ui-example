import React from 'react'
import PropTypes from 'prop-types'
import MUIMuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const MuiThemeProvider = ({ children }) => (
  <MUIMuiThemeProvider>
    {children}
  </MUIMuiThemeProvider>
)

MuiThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default MuiThemeProvider
