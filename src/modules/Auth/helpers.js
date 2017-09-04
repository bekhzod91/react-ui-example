import _ from 'lodash'
import { setToken } from '../../helpers/token'
import { browserHistory } from 'react-router'
import * as ROUTER from '../../constants/routes'

export const watchSocailAuth = ({ location, ...props }) => {
  // Twitter
  const oauthToken = _.get(location, ['query', 'oauth_token'])
  const oauthVerifier = _.get(location, ['query', 'oauth_verifier'])
  if (oauthToken && oauthVerifier) {
    props.twitterSingInAction({ oauthToken, oauthVerifier })
  }

  // Google
  const googleCode = _.get(location, ['query', 'code'])
  const googleHash = _.get(location, 'hash')
  if (googleCode && !googleHash) {
    props.googleSingInAction({ code: googleCode })
  }

  // Facebook
  const fbCode = _.get(location, ['query', 'code'])
  const fbHash = _.get(location, 'hash')
  if (fbCode && fbHash === '#_=_') {
    props.facebookSingInAction({ code: fbCode })
  }
}

export const watchAuthToken = ({ token, formValues, location }) => {
  if (token) {
    setToken(token, _.get(formValues, 'rememberMe'))
    browserHistory.push(_.get(location, ['query', 'redirect']) || ROUTER.COMPANY_MY_LIST_URL)
  }
}
