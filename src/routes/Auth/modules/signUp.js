import _ from 'lodash'
import axios from '../../../helpers/axios'
import thunkReducer from '../../../helpers/thunkReducer'
import { signUpSerializer } from '../serializers/SignUpSerializer'

// ------------------------------------
// Action signUp
// ------------------------------------
export const SIGN_UP = 'SIGN_UP'
export const SIGN_UP_STATE_NAME = 'signUp'
export const API_SIGN_UP_URL = '/user/register/'

export const signUpAction = (formValues) => {
  const data = signUpSerializer(formValues)
  const payload = axios().post(API_SIGN_UP_URL, data)
    .then((response) => _.get(response, 'data'))
    .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

  return {
    type: SIGN_UP,
    payload
  }
}

export const RESEND_MESSAGE = 'RESEND_MESSAGE'
export const RESEND_MESSAGE_STATE_NAME = 'resendMessage'
export const API_RESEND_MESSAGE_URL = 'user/register/resend/'

export const resendMessageAction = (email) => {
  const payload = axios().post(API_RESEND_MESSAGE_URL, { email })
    .then((response) => _.get(response, 'data'))
    .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

  return {
    type: RESEND_MESSAGE,
    payload
  }
}

export const SIGN_UP_EMAIL_CONFIRM = 'SIGN_UP_EMAIL_CONFIRM'
export const SIGN_UP_EMAIL_CONFIRM_STATE_NAME = 'signUpEmailConfirm'
export const API_SIGN_UP_EMAIL_CONFIRM_URL = 'user/register-confirm/'

export const signUpEmailConfirmAction = (code) => {
  const payload = axios().get(`${API_SIGN_UP_EMAIL_CONFIRM_URL}${code}/`)
    .then((response) => _.get(response, 'data'))
    .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

  return {
    type: SIGN_UP_EMAIL_CONFIRM,
    payload
  }
}

export const actions = {
  signUpAction,
  resendMessageAction,
  signUpEmailConfirmAction
}

// ------------------------------------
// Reducer
// ------------------------------------
export const signUpReducer = thunkReducer(SIGN_UP)
export const resendReducer = thunkReducer(RESEND_MESSAGE)
export const signUpEmailConfirmReducer = thunkReducer(SIGN_UP_EMAIL_CONFIRM)
