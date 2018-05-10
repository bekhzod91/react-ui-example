import axios from '../../../helpers/axios'
import * as actionTypes from '../constants/actionTypes'
import { getPayloadFromSuccess, getPayloadFromError } from '../../../helpers/get'

// ------------------------------------
// Action fetchProfileAction
// ------------------------------------
export const API_ME_URL = `/me/`

export const fetchMeAction = (data) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState }).get(API_ME_URL, data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionTypes.ME,
      payload
    })
  }
}

export default {
  fetchMeAction
}
