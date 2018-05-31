import axios, { getPayloadFromSuccess, getPayloadFromError } from '../../../helpers/axios'
import * as actionTypes from '../constants/actionTypes'

// ------------------------------------
// Actions
// ------------------------------------
export const API_USER_COMPANIES_URL = `/companies/my/`

export const fetchMyCompaniesAction = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState }).get(API_USER_COMPANIES_URL)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionTypes.USER_COMPANIES,
      payload
    })
  }
}

export default {
  fetchMyCompaniesAction
}
