import sprintf from 'sprintf'
import axios from '../../../helpers/axios'
import * as actionsTypes from '../constants/actionTypes'
import { getPayloadFromSuccess, getPayloadFromError } from '../../../helpers/get'

// ------------------------------------
// Action fetch permissions list
// ------------------------------------
export const API_PERMISSION_URL = `/user/permissions/%d/`

export const getPermissionsAction = (companyId) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState }).get(sprintf(API_PERMISSION_URL, companyId))
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionsTypes.USER_PERMISSION,
      payload
    })
  }
}

export default {
  getPermissionsAction,
}
