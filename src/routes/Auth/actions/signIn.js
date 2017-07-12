import _ from 'lodash'
import axios from '../../../helpers/axios'
import * as globalActionTypes from '../../../constants/actionTypes'
import * as actionTypes from '../constants/actionTypes'
import { signInSerializer, twitterSignInSerializer } from '../serializers/SignInSerializer'

// ------------------------------------
// Action Sign In
// ------------------------------------
export const API_SIGN_IN_URL = `/user/auth/`

export const signInAction = (formValues) => {
  const data = signInSerializer(formValues)
  const payload = axios().post(API_SIGN_IN_URL, data)
    .then((response) => _.get(response, 'data'))
    .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

  return {
    type: globalActionTypes.SIGN_IN,
    payload
  }
}

// ------------------------------------
// Action fetch twitter redirect url
// ------------------------------------
export const API_TWITTER_REDIRECT_URL = `/user/auth/twitter/`

export const fetchTwitterRedirectURLAction = () => {
  const payload = axios().get(API_TWITTER_REDIRECT_URL)
    .then((response) => _.get(response, 'data'))
    .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

  return {
    type: actionTypes.TWITTER_REDIRECT,
    payload
  }
}

// ------------------------------------
// Action Sing In with twitter
// ------------------------------------
export const API_TWITTER_SIGN_IN_URL = `/user/auth/twitter/`

export const twitterSingInAction = (data) => {
  const payload = axios().post(API_TWITTER_SIGN_IN_URL, twitterSignInSerializer(data))
    .then((response) => _.get(response, 'data'))
    .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

  return {
    type: globalActionTypes.SIGN_IN,
    payload
  }
}

// ------------------------------------
// Action Sing In with google
// ------------------------------------
export const API_GOOGLE_SIGN_IN_URL = `/user/auth/google/`

export const googleSingInAction = (data) => {
  const payload = axios().post(API_GOOGLE_SIGN_IN_URL, data)
    .then((response) => _.get(response, 'data'))
    .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

  return {
    type: globalActionTypes.SIGN_IN,
    payload
  }
}

// ------------------------------------
// Action Sing In with facebook
// ------------------------------------
export const API_FACEBOOK_SIGN_IN_URL = `/user/auth/facebook/`

export const facebookSingInAction = (data) => {
  const payload = axios().post(API_FACEBOOK_SIGN_IN_URL, data)
    .then((response) => _.get(response, 'data'))
    .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

  return {
    type: globalActionTypes.SIGN_IN,
    payload
  }
}

export default {
  signInAction,
  fetchTwitterRedirectURLAction,
  twitterSingInAction,
  googleSingInAction,
  facebookSingInAction,
}
