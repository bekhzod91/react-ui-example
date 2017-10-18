import * as R from 'ramda'

export const signInSerializer = (formValue) => {
  return {
    email: R.prop('email', formValue),
    password: R.prop('password', formValue),
  }
}

export const twitterSignInSerializer = (data) => {
  return {
    'oauth_token': R.prop('oauthToken', data),
    'oauth_verifier': R.prop('oauthVerifier', data),
  }
}
