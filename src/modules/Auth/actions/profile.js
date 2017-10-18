import axios from '../../../helpers/axios'
import * as actionTypes from '../constants/actionTypes'
import { getPayloadFromSuccess, getPayloadFromError } from '../../../helpers/get'

// ------------------------------------
// Action fetchProfileAction
// ------------------------------------
export const API_PROFILE_URL = `/user/auth-confirm/`

export const fetchProfileAction = (data) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState }).get(API_PROFILE_URL, data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionTypes.USER_PROFILE,
      payload
    })
  }
}

export default {
  fetchProfileAction
}
