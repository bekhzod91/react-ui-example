import _ from 'lodash'
import * as API from '../constants/api'

export const fbLoginURL = () => {
  return `https://www.facebook.com/${API.FACEBOOK_API_VERSION}/dialog/oauth?` +
            `client_id=${API.FACEBOOK_API_APP_ID}` +
            `&response_type=code` +
            `&redirect_uri=${API.FACEBOOK_API_REDIRECT_URL}` +
            `&scope=email`
}

export const facebookSdk = (FB, options = {}) => {
  const login = () => {
    const { loginOptions } = options
    return new Promise((resolve, reject) => {
      FB.login((response) => {
        if (response.authResponse) {
          resolve(response)
        } else {
          reject(new Error('User canceled login'))
        }
      }, loginOptions)
    })
  }

  const getAccessToken = () => {
    return new Promise((resolve, reject) => {
      FB.getLoginStatus((response) => {
        const status = _.get(response, 'status')
        if (status === 'connected') {
          resolve(response)
        } else {
          login()
            .then(response => resolve(response))
            .catch(error => reject(error))
        }
      })
    })
  }

  return {
    getAccessToken
  }
}
