import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { routerMiddleware } from 'react-router-redux'
import { makeRootReducer } from './reducers'

const createStore = (history, initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk, promiseMiddleware()]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  let composeEnhancers = compose

  if (process.env.NODE_ENV === 'development') {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }

    // Enable redux change log
    const logger = require('redux-logger').default
    middleware.push(logger)
  }

  // ======================================================
  // Redux router middleware
  // ======================================================
  const reduxRouterMiddleware = routerMiddleware(history)
  middleware.push(reduxRouterMiddleware)

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createReduxStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}

export default createStore
