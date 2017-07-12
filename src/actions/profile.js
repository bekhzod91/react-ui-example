import _ from 'lodash'
import axios from '../helpers/axios'
import * as actionTypes from '../constants/actionTypes'

// ------------------------------------
// Action fetchProfileAction
// ------------------------------------
export const API_PROFILE_URL = `/user/auth-confirm/`

export const fetchProfileAction = (data) => {
  const payload = axios().get(API_PROFILE_URL, data)
    .then((response) => _.get(response, 'data'))
    .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

  return {
    type: actionTypes.PROFILE,
    payload
  }
}

export default {
  fetchProfileAction
}
