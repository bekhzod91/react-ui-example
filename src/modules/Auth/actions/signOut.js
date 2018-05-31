import axios, { getPayloadFromSuccess, getPayloadFromError } from '../../../helpers/axios'
import * as actionTypes from '../constants/actionTypes'

// ------------------------------------
// Action Sign Out
// ------------------------------------
export const API_SIGN_OUT_URL = '/user/unauth/'

export const signOutAction = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState }).delete(API_SIGN_OUT_URL)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionTypes.SIGN_OUT,
      payload
    })
  }
}

// ------------------------------------
// Action clear token form store
// ------------------------------------
export const clearTokenAction = () => {
  return {
    type: `${actionTypes.SIGN_IN}_CLEAR`
  }
}

export const actions = {
  clearTokenAction
}
