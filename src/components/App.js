import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MuiThemeProviderNext from 'material-ui-next/styles/MuiThemeProvider'
import { syncHistoryWithStore } from 'react-router-redux'
import { muiTheme, muiThemeNext } from '../styles/themes'

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const history = syncHistoryWithStore(browserHistory, this.props.store)

    return (
      <Provider store={this.props.store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <MuiThemeProviderNext theme={muiThemeNext}>
            <div style={{ height: '100%' }}>
              <Router history={history} children={this.props.routes} />
            </div>
          </MuiThemeProviderNext>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App
