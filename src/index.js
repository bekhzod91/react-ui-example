import Rx from 'rxjs'
import React from 'react'
import ReactDOM from 'react-dom'
import { setObservableConfig } from 'recompose'
import createHistory from 'history/createBrowserHistory'
import createStore from './store/createStore'
import './styles/main.scss'

// Store Initialization
// ------------------------------------
const history = createHistory()
const store = createStore(history, window.__INITIAL_STATE__)

// RxJs setup
// ------------------------------------
setObservableConfig({
  // Converts a plain ES observable to an RxJS 5 observable
  fromESObservable: Rx.Observable.from
})

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const App = require('./components/App').default
  const renderRoute = require('./modules').default

  ReactDOM.render(
    <App
      store={store}
      history={history}
      renderRoute={renderRoute}
    />,
    MOUNT_NODE
  )
}

// Development Tools
// ------------------------------------
if (__DEV__) {
  if (module.hot) {
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    render = () => {
      try {
        renderApp()
      } catch (e) {
        console.error(e)
        renderError(e)
      }
    }

    // Setup hot module replacement
    module.hot.accept([
      './components/App',
      './modules',
    ], () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// Let's Go!
// ------------------------------------
if (!__TEST__) render()
