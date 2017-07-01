import _ from 'lodash'
import { compose, withHandlers, mapProps, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { setToken } from '../../../helpers/token'
import { fbLoginURL } from '../../../helpers/facebook'
import { googleLoginURL } from '../../../helpers/google'
import SignIn from '../components/SignIn'
import {
  actions,
  SING_IN_STATE_NAME,
  TWITTER_REDIRECT_STATE
} from '../modules/signIn'
import * as ROUTER from '../../../constants/routes'

const mapStateToProps = (state) => ({
  loading: _.get(state, [SING_IN_STATE_NAME, 'loading']) || _.get(state, [TWITTER_REDIRECT_STATE, 'loading']),
  twitter: _.get(state, [TWITTER_REDIRECT_STATE, 'data', 'redirect']) || null,
  token: _.get(state, [SING_IN_STATE_NAME, 'data', 'token']),
  error: _.get(state, [SING_IN_STATE_NAME, 'error']),
  formValues: _.get(state, ['form', 'SignInForm', 'values'])
})

const mapDispatchToProps = actions

const mapPropsToComponent = props => {
  const handleSocialSignIn = {
    handleFacebookSignIn: () => {
      window.location.href = fbLoginURL()
    },
    handleGooglePlusSignIn: () => {
      window.location.href = googleLoginURL()
    },
    handleTwitterSignIn: () => {
      props.fetchTwitterRedirectURLAction()
    }
  }

  return {
    ...props,
    handleSocialSignIn
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapProps(mapPropsToComponent),
  withPropsOnChange(['twitter'], ({ twitter }) => {
    if (twitter) {
      window.location.href = twitter
    }
  }),
  withPropsOnChange(['token'], ({ token, formValues }) => {
    if (token) {
      setToken(token, _.get(formValues, 'rememberMe'))
      browserHistory.push(ROUTER.COMPANY_MY_LIST_URL)
    }
  }),
  withPropsOnChange(['location'], ({ location, ...props }) => {
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
  }),
  withHandlers({
    onSubmit: props => () => props.singInAction(props.formValues),
  })
)

export default enhance(SignIn)
