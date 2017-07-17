import _ from 'lodash'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import locationReducer from './location'
import * as STATE from '../constants/state'
import * as actionTypes from '../constants/actionTypes'
import thunkReducer from '../helpers/thunkReducer'
import snackbarReducer from '../components/WithState/Snackbar/reducer'
import pageLoadingReducer from '../components/WithState/PageLoading/reducer'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    form: formReducer,
    snackbar: snackbarReducer(),
    pageLoading: pageLoadingReducer(),
    [STATE.PROFILE]: thunkReducer(actionTypes.PROFILE),
    [STATE.SING_IN]: thunkReducer(actionTypes.SIGN_IN),
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export const injectReducers = (store, reducers) => {
  _.forEach(reducers, (reducer, key) => {
    injectReducer(store, { key, reducer })
  })
}
