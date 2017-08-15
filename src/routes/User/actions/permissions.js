import _ from 'lodash'
import sprintf from 'sprintf'
import axios from '../../../helpers/axios'
import * as actionsTypes from '../constants/actionTypes'

// ------------------------------------
// Action fetch permissions list
// ------------------------------------
export const API_PERMISSION_URL = `/user/permissions/%s/`

export const getPermissionsAction = (companyId) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState }).get(sprintf(API_PERMISSION_URL, companyId))
      .then((response) => _.get(response, 'data'))
      .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

    return dispatch({
      type: actionsTypes.USER_PERMISSION,
      payload
    })
  }
}

export default {
  getPermissionsAction,
}
