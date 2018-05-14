import axios from '../../../helpers/axios'
import * as actionsTypes from '../constants/actionTypes'
import { getPayloadFromSuccess, getPayloadFromError } from '../../../helpers/get'

// ------------------------------------
// Action fetch permissions list
// ------------------------------------
export const API_PERMISSION_URL = `/permissions/`

export const getPermissionsAction = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState }).get(API_PERMISSION_URL)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionsTypes.PERMISSIONS,
      payload
    })
  }
}

export default {
  getPermissionsAction,
}
