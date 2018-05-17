import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import createHistory from 'history/createBrowserHistory'
import MUIMuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createStore from '../src/store/createStore'
import { muiTheme } from '../src/styles/themes'

const WrapperProvider = (props) => {
  const history = props.history || createHistory()
  const store = props.store || createStore(history, {})

  return (
    <Provider store={store}>
      <MUIMuiThemeProvider theme={muiTheme}>
        <Router history={history} children={props.children} />
      </MUIMuiThemeProvider>
    </Provider>
  )
}

WrapperProvider.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object,
  children: PropTypes.node.isRequired
}

export default WrapperProvider
