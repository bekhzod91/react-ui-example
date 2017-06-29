import _ from 'lodash'

const facebookSdk = (FB, options) => {
  const facebookLogin = () => {
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

  const facebookGetAccessToken = () => {
    return new Promise((resolve, reject) => {
      FB.getLoginStatus((response) => {
        const status = _.get(response, 'status')
        if (status === 'connected') {
          resolve(response)
        } else {
          facebookLogin()
            .then(response => resolve(response))
            .catch(error => reject(error))
        }
      })
    })
  }

  return {
    facebookGetAccessToken
  }
}

export default facebookSdk
