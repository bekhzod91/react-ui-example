import { compose, toPairs, forEach } from 'ramda'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'
import userReducers from '../modules/User/reducers/highOrderReducers'
import authReducers from '../modules/Auth/reducers/highOrderReducers'
import snackbarReducer from '../components/WithState/Snackbar/reducer'
import pageLoadingReducer from '../components/WithState/PageLoading/reducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    form: formReducer,
    routing: routerReducer,
    snackbar: snackbarReducer(),
    pageLoading: pageLoadingReducer(),
    ...userReducers,
    ...authReducers,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export const injectReducers = (store, reducers) => {
  compose(
    forEach(([key, reducer]) => injectReducer(store, { key, reducer })),
    toPairs,
  )(reducers)
}
