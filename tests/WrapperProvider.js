import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import MUIMuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { muiTheme } from '../src/styles/themes'
import createStore from '../src/store'

const WrapperProvider = ({ store, children }) => (
  <Provider store={store || createStore({})}>
    <MUIMuiThemeProvider theme={muiTheme}>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </MUIMuiThemeProvider>
  </Provider>
)

WrapperProvider.propTypes = {
  store: PropTypes.object,
  children: PropTypes.node.isRequired
}

export default WrapperProvider
