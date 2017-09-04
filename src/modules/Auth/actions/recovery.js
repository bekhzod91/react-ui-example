import _ from 'lodash'
import axios from '../../../helpers/axios'
import * as actionsTypes from '../constants/actionTypes'

// ------------------------------------
// Action account recovery
// ------------------------------------
export const API_RECOVERY_URL = `/user/recovery/`

export const recoveryAction = (data) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState }).put(API_RECOVERY_URL, data)
      .then((response) => _.get(response, 'data'))
      .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

    return dispatch({
      type: actionsTypes.RECOVERY,
      payload
    })
  }
}

export const recoveryClearAction = () => ({
  type: `${actionsTypes.RECOVERY}_CLEAR`
})

export default {
  recoveryAction,
  recoveryClearAction,
}
