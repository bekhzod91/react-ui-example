import _ from 'lodash'
import { compose, withHandlers, mapProps, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as ROUTER from '../../../constants/routes'
import { setToken } from '../../../helpers/token'
import { fbLoginURL } from '../../../helpers/facebook'
import { googleLoginURL } from '../../../helpers/google'
import SignUp from '../components/SignUp'
import { SIGN_UP_FORM } from '../components/SignUpForm'
import {
  actions,
  SIGN_UP_STATE_NAME,
} from '../modules/signUp'
import {
  TWITTER_REDIRECT_STATE,
} from '../modules/signIn'

const mapStateToProps = (state) => ({
  loading: _.get(state, [SIGN_UP_STATE_NAME, 'loading']) || _.get(state, [TWITTER_REDIRECT_STATE, 'loading']),
  twitter: _.get(state, [TWITTER_REDIRECT_STATE, 'data', 'redirect']) || null,
  token: _.get(state, [SIGN_UP_STATE_NAME, 'data', 'token']),
  error: _.get(state, [SIGN_UP_STATE_NAME, 'error']),
  formValues: _.get(state, ['form', SIGN_UP_FORM, 'values'])
})

const mapDispatchToProps = actions

const mapPropsToComponent = props => {
  const buttons = {
    facebook: {
      handle: () => {
        window.location.href = fbLoginURL()
      },
      label: 'Sign Up with FaceBook',
    },
    google: {
      handle: () => {
        window.location.href = googleLoginURL()
      },
      label: 'Sign Up with Google',
    },
    twitter: {
      handle: () => props.fetchTwitterRedirectURLAction(),
      label: 'Sign Up with Twitter',
    }
  }

  return {
    ...props,
    buttons
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

export default enhance(SignUp)
