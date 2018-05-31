import sprintf from 'sprintf'
import axios, { getPayloadFromSuccess, getPayloadFromError } from '../../../helpers/axios'
import * as actionsTypes from '../constants/actionTypes'

// ------------------------------------
// Action fetch user list
// ------------------------------------
export const API_USER_LIST_URL = `/users/`

export const getUserListAction = (companyId) => {
  const url = sprintf(API_USER_LIST_URL, companyId)

  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState }).get(url)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionsTypes.USER_LIST,
      payload
    })
  }
}

// ------------------------------------
// Action fetch user detail
// ------------------------------------
export const API_USER_DETAIL_URL = `/%d/users/%d`

export const getUserDetailAction = (companyId, userId) => {
  const url = sprintf(API_USER_DETAIL_URL, companyId, userId)

  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState }).get(url)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionsTypes.USER_DETAIL,
      payload
    })
  }
}

// ------------------------------------
// Action add user
// ------------------------------------
export const API_USER_ADD_URL = `/%d/users`

export const addUserAction = (data, companyId) => {
  const url = sprintf(API_USER_ADD_URL, companyId)

  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState }).post(url, data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionsTypes.USER_ADD,
      payload
    })
  }
}

// ------------------------------------
// Action edit user
// ------------------------------------
export const API_USER_EDIT_URL = `/%d/users/%d/`

export const editUserAction = (data, companyId, userId) => {
  const url = sprintf(API_USER_EDIT_URL, companyId, userId)

  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState }).put(url, data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionsTypes.USER_EDIT,
      payload
    })
  }
}

// ------------------------------------
// Action delete user
// ------------------------------------
export const API_USER_DELETE_URL = `/%d/users/%d/`

export const deleteUserAction = (data, companyId, userId) => {
  const url = sprintf(API_USER_DELETE_URL, companyId, userId)

  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState }).put(url, data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionsTypes.USER_DELETE,
      payload
    })
  }
}

export default {
  getUserListAction,
  getUserDetailAction,
  addUserAction,
  editUserAction,
  deleteUserAction
}
