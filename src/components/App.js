import React from 'react'
import { Provider } from 'react-redux'
import ConnectedRouter from 'react-router-redux/ConnectedRouter'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { muiTheme } from '../styles/themes'

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <MuiThemeProvider theme={muiTheme}>
          <ConnectedRouter history={this.props.history}>
            <div style={{ height: '100%' }}>
              {renderRoutes([this.props.routes])}
            </div>
          </ConnectedRouter>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App
