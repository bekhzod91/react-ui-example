import { path, prop } from 'ramda'
import { setToken } from '../../helpers/token'
import { browserHistory } from 'react-router'
import * as ROUTER from '../../constants/routes'

export const watchSocailAuth = ({ location, ...props }) => {
  // Twitter
  const oauthToken = path(['query', 'oauth_token'], location)
  const oauthVerifier = path(['query', 'oauth_verifier'], location)
  if (oauthToken && oauthVerifier) {
    props.twitterSingInAction({ oauthToken, oauthVerifier })
  }

  // Google
  const googleCode = path(['query', 'code'], location)
  const googleHash = prop('hash', location)
  if (googleCode && !googleHash) {
    props.googleSingInAction({ code: googleCode })
  }

  // Facebook
  const fbCode = path(['query', 'code'], location)
  const fbHash = prop('hash', location)
  if (fbCode && fbHash === '#_=_') {
    props.facebookSingInAction({ code: fbCode })
  }
}

export const watchAuthToken = ({ token, formValues, location }) => {
  if (token) {
    setToken(token, prop('rememberMe', formValues))
    browserHistory.push(path(['query', 'redirect'], location) || ROUTER.COMPANY_MY_LIST_URL)
  }
}
