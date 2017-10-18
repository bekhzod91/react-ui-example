import axios from '../../../helpers/axios'
import * as actionTypes from '../constants/actionTypes'
import { signInSerializer, twitterSignInSerializer } from '../serializers/SignInSerializer'
import { getPayloadFromSuccess, getPayloadFromError } from '../../../helpers/get'

// ------------------------------------
// Action Sign In
// ------------------------------------
export const API_SIGN_IN_URL = `/user/auth/`

export const signInAction = (formValues) => {
  return (dispatch, getState) => {
    const data = signInSerializer(formValues)
    const payload = axios({ dispatch, getState }).post(API_SIGN_IN_URL, data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionTypes.SIGN_IN,
      payload
    })
  }
}

// ------------------------------------
// Action fetch twitter redirect url
// ------------------------------------
export const API_TWITTER_REDIRECT_URL = `/user/auth/twitter/`

export const fetchTwitterRedirectURLAction = () => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState }).get(API_TWITTER_REDIRECT_URL)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionTypes.TWITTER_REDIRECT,
      payload
    })
  }
}

// ------------------------------------
// Action Sing In with twitter
// ------------------------------------
export const API_TWITTER_SIGN_IN_URL = `/user/auth/twitter/`

export const twitterSingInAction = (data) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState }).post(API_TWITTER_SIGN_IN_URL, twitterSignInSerializer(data))
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionTypes.SIGN_IN,
      payload
    })
  }
}

// ------------------------------------
// Action Sing In with google
// ------------------------------------
export const API_GOOGLE_SIGN_IN_URL = `/user/auth/google/`

export const googleSingInAction = (data) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState }).post(API_GOOGLE_SIGN_IN_URL, data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionTypes.SIGN_IN,
      payload
    })
  }
}

// ------------------------------------
// Action Sing In with facebook
// ------------------------------------
export const API_FACEBOOK_SIGN_IN_URL = `/user/auth/facebook/`

export const facebookSingInAction = (data) => {
  return (dispatch, getState) => {
    const payload = axios({ dispatch, getState }).post(API_FACEBOOK_SIGN_IN_URL, data)
      .then(getPayloadFromSuccess)
      .catch(getPayloadFromError)

    return dispatch({
      type: actionTypes.SIGN_IN,
      payload
    })
  }
}

export default {
  signInAction,
  fetchTwitterRedirectURLAction,
  twitterSingInAction,
  googleSingInAction,
  facebookSingInAction,
}
