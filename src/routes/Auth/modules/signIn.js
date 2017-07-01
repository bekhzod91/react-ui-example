import _ from 'lodash'
import axios from '../../../helpers/axios'
import thunkReducer from '../../../helpers/thunkReducer'
import { signInSerializer, twitterSignInSerializer } from '../serializers/SignInSerializer'

// ------------------------------------
// Action Sign In
// ------------------------------------
export const SING_IN_STATE_NAME = 'signIn'
export const SIGN_IN = 'SIGN_IN'
export const API_SIGN_IN_URL = `/user/auth/`

export const singInAction = (formValues) => {
  const data = signInSerializer(formValues)
  const payload = axios().post(API_SIGN_IN_URL, data)
    .then((response) => _.get(response, 'data'))
    .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

  return {
    type: SIGN_IN,
    payload
  }
}

// ------------------------------------
// Action fetch twitter redirect url
// ------------------------------------
export const API_TWITTER_REDIRECT_URL = `/user/auth/twitter/`
export const TWITTER_REDIRECT_STATE = 'twitterRedirect'
export const TWITTER_REDIRECT = 'TWITTER_REDIRECT'

export const fetchTwitterRedirectURLAction = () => {
  const payload = axios().get(API_TWITTER_REDIRECT_URL)
    .then((response) => _.get(response, 'data'))
    .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

  return {
    type: TWITTER_REDIRECT,
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
    type: SIGN_IN,
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
    type: SIGN_IN,
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
    type: SIGN_IN,
    payload
  }
}

export const actions = {
  singInAction,
  fetchTwitterRedirectURLAction,
  twitterSingInAction,
  googleSingInAction,
  facebookSingInAction,
}

// ------------------------------------
// Reducer
// ------------------------------------
export const singInReducer = thunkReducer(SIGN_IN)
export const twitterRedirectReducer = thunkReducer(TWITTER_REDIRECT)
