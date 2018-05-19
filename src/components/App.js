import React from 'react'
import { Provider } from 'react-redux'
import ConnectedRouter from 'react-router-redux/ConnectedRouter'
import PropTypes from 'prop-types'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { muiTheme } from '../styles/themes'

class App extends React.Component {
  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <MuiThemeProvider theme={muiTheme}>
          <ConnectedRouter history={this.props.history}>
            {this.props.renderRoute(this.props.store)}
          </ConnectedRouter>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  renderRoute: PropTypes.func.isRequired,
}

export default App
