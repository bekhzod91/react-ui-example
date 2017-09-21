import R from 'ramda'
import sprintf from 'sprintf'
import axios from '../../../helpers/axios'
import * as actionsTypes from '../constants/actionTypes'

const getPayloadFromSuccess = R.prop('data')
const getPayloadFromError = R.pipe(
  Promise.reject,
  R.path(['response', 'data'])
)

// ------------------------------------
// Action fetch user list
// ------------------------------------
export const API_COMPANY_LIST_URL = `/companies/`

export const getCompanyListAction = () => {
  const url = sprintf(API_COMPANY_LIST_URL)

  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(url)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionsTypes.COMPANY_LIST,
      payload
    })
  }
}

// ------------------------------------
// Action fetch user detail
// ------------------------------------
export const API_COMPANY_DETAIL_URL = `/companies/%d/`

export const getCompanyDetailAction = (companyId) => {
  const url = sprintf(API_COMPANY_DETAIL_URL, companyId)

  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .get(url)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionsTypes.COMPANY_DETAIL,
      payload
    })
  }
}

// ------------------------------------
// Action add user
// ------------------------------------
export const API_COMPANY_ADD_URL = `/companies/`

export const addCompanyAction = (data, companyId) => {
  const url = sprintf(API_COMPANY_ADD_URL, companyId)

  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .post(url, data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionsTypes.COMPANY_ADD,
      payload
    })
  }
}

// ------------------------------------
// Action edit user
// ------------------------------------
export const API_COMPANY_EDIT_URL = `/companies/%d/`

export const editCompanyAction = (data, companyId) => {
  const url = sprintf(API_COMPANY_EDIT_URL, companyId)

  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .put(url, data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionsTypes.COMPANY_EDIT,
      payload
    })
  }
}

// ------------------------------------
// Action delete user
// ------------------------------------
export const API_COMPANY_DELETE_URL = `/companies/%d/`

export const deleteCompanyAction = (data, companyId) => {
  const url = sprintf(API_COMPANY_DELETE_URL, companyId)

  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState })
      .put(url, data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionsTypes.COMPANY_DELETE,
      payload
    })
  }
}

export default {
  getCompanyListAction,
  getCompanyDetailAction,
  addCompanyAction,
  editCompanyAction,
  deleteCompanyAction
}
