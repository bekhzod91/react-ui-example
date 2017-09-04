import _ from 'lodash'

export const signInSerializer = (formValue) => {
  return {
    email: _.get(formValue, 'email'),
    password: _.get(formValue, 'password'),
  }
}

export const twitterSignInSerializer = (data) => {
  return {
    'oauth_token': _.get(data, 'oauthToken'),
    'oauth_verifier': _.get(data, 'oauthVerifier'),
  }
}
