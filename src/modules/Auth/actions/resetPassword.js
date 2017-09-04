import _ from 'lodash'
import axios from '../../../helpers/axios'
import * as actionsTypes from '../constants/actionTypes'

// ------------------------------------
// Action reset user password
// ------------------------------------
export const API_RESET_PASSWORD_URL = `/user/recovery-confirm/`

export const resetPasswordAction = (code, data) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState }).put(`${API_RESET_PASSWORD_URL}${code}/`, data)
      .then((response) => _.get(response, 'data'))
      .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

    return dispatch({
      type: actionsTypes.RESET_PASSWORD,
      payload
    })
  }
}

export default {
  resetPasswordAction
}
