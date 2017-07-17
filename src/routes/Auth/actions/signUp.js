import _ from 'lodash'
import axios from '../../../helpers/axios'
import * as actionTypes from '../constants/actionTypes'
import { signUpSerializer } from '../serializers/SignUpSerializer'

// ------------------------------------
// Action Sign Up
// ------------------------------------
export const API_SIGN_UP_URL = '/user/register/'

export const signUpAction = (formValues) => {
  return (dispatch, getState) => {
    const data = signUpSerializer(formValues)
    const payload = axios({ dispatch, getState }).post(API_SIGN_UP_URL, data)
      .then((response) => _.get(response, 'data'))
      .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

    return dispatch({
      type: actionTypes.SIGN_UP,
      payload
    })
  }
}

// ------------------------------------
// Action resend Sign Up message
// ------------------------------------
export const API_RESEND_MESSAGE_URL = 'user/register/resend/'

export const resendMessageAction = (email) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState }).post(API_RESEND_MESSAGE_URL, { email })
      .then((response) => _.get(response, 'data'))
      .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

    return dispatch({
      type: actionTypes.RESEND_MESSAGE,
      payload
    })
  }
}

// ------------------------------------
// Action Sign Up confirm
// ------------------------------------
export const API_SIGN_UP_EMAIL_CONFIRM_URL = 'user/register-confirm/'

export const signUpEmailConfirmAction = (code) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState }).get(`${API_SIGN_UP_EMAIL_CONFIRM_URL}${code}/`)
      .then((response) => _.get(response, 'data'))
      .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

    return dispatch({
      type: actionTypes.SIGN_UP_EMAIL_CONFIRM,
      payload
    })
  }
}

export default {
  signUpAction,
  resendMessageAction,
  signUpEmailConfirmAction
}
