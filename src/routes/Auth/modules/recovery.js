import _ from 'lodash'
import axios from '../../../helpers/axios'
import thunkReducer from '../../../helpers/thunkReducer'

// ------------------------------------
// Action recovery
// ------------------------------------
export const RECOVERY = 'RECOVERY'
export const RECOVERY_STATE_NAME = 'recovery'
export const API_RECOVERY_URL = `/user/recovery/`

export const recoveryAction = (data) => {
  const payload = axios().put(API_RECOVERY_URL, data)
    .then((response) => _.get(response, 'data'))
    .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

  return {
    type: RECOVERY,
    payload
  }
}

export const recoveryClearAction = () => ({
  type: `${RECOVERY}_CLEAR`
})

export const actions = {
  recoveryAction,
  recoveryClearAction,
}

// ------------------------------------
// Reducer
// ------------------------------------
export const recoveryReducer = thunkReducer(RECOVERY)
