import _ from 'lodash'
import axios from '../../../helpers/axios'
import * as actionTypes from '../constants/actionTypes'

// ------------------------------------
// Actions
// ------------------------------------
export const API_USER_COMPANIES_URL = `/companies/my/`

export const fetchMyCompaniesAction = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState }).get(API_USER_COMPANIES_URL)
      .then((response) => _.get(response, 'data'))
      .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

    return dispatch({
      type: actionTypes.USER_COMPANIES,
      payload
    })
  }
}

export default {
  fetchMyCompaniesAction
}
