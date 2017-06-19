import _ from 'lodash'
import axios from '../../../helper/axios'
import thunkReducer from '../../../helper/thunkReducer'

// ------------------------------------
// Constants
// ------------------------------------
export const SIGN_IN = 'SIGN_IN'

// ------------------------------------
// Actions
// ------------------------------------
export const API_SIGN_IN_URL = `/user/auth/`

export const singInAction = (data) => {
  const payload = axios()
    .post(API_SIGN_IN_URL, data)
    .then((response) => _.get(response, 'data'))
    .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

  return {
    type: SIGN_IN,
    payload
  }
}
/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const actions = {
  singInAction
}

// ------------------------------------
// Action Handlers
// ------------------------------------
// const ACTION_HANDLERS = {
//   [COUNTER_INCREMENT]    : (state, action) => state + action.payload,
//   [COUNTER_DOUBLE_ASYNC] : (state, action) => state * 2
// }

// ------------------------------------
// Reducer
// ------------------------------------
export default thunkReducer(SIGN_IN)
