import _ from 'lodash'
import axios from '../../../helpers/axios'
import thunkReducer from '../../../helpers/thunkReducer'

// ------------------------------------
// Action recovery_verify
// ------------------------------------
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const RESET_PASSWORD_STATE_NAME = 'resetPassword'
export const API_RESET_PASSWORD_URL = `/user/recovery-confirm/`

export const resetPasswordAction = (code, data) => {
  const payload = axios().put(`${API_RESET_PASSWORD_URL}${code}/`, data)
    .then((response) => _.get(response, 'data'))
    .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

  return {
    type: RESET_PASSWORD,
    payload
  }
}

export const actions = {
  resetPasswordAction
}

// ------------------------------------
// Reducer
// ------------------------------------
export const resetPasswordReducer = thunkReducer(RESET_PASSWORD)
