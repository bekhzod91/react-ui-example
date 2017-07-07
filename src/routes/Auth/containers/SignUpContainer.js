import _ from 'lodash'
import { compose, withHandlers, mapProps, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as ROUTE from '../../../constants/routes'
import { fbLoginURL } from '../../../helpers/facebook'
import { googleLoginURL } from '../../../helpers/google'
import { watchSocailAuth, watchAuthToken } from '../helpers'
import SignUp from '../components/SignUp'
import { FORM } from '../components/SignUpForm'
import {
  signUpAction,
  SIGN_UP_STATE_NAME,
} from '../modules/signUp'
import {
  actions,
  SING_IN_STATE_NAME,
  TWITTER_REDIRECT_STATE,
} from '../modules/signIn'

const mapStateToProps = (state) => ({
  loading: _.get(state, [SIGN_UP_STATE_NAME, 'loading']) || _.get(state, [TWITTER_REDIRECT_STATE, 'loading']),
  twitter: _.get(state, [TWITTER_REDIRECT_STATE, 'data', 'redirect']) || null,
  token: _.get(state, [SING_IN_STATE_NAME, 'data', 'token']),
  signUp: _.get(state, [SIGN_UP_STATE_NAME, 'data']),
  formValues: _.get(state, ['form', FORM, 'values'])
})

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
  connect(mapStateToProps, { ...actions, signUpAction }),
  mapProps(mapPropsToComponent),
  withPropsOnChange(['twitter'], ({ twitter }) => {
    if (twitter) {
      window.location.href = twitter
    }
  }),
  withPropsOnChange(['token'], watchAuthToken),
  withPropsOnChange(['location'], watchSocailAuth),
  withHandlers({
    onSubmit: props => () => {
      return props
        .signUpAction(props.formValues)
        .then(() => browserHistory.push(ROUTE.SIGN_UP_THANK_YOU_URL))
    }
  })
)

export default enhance(SignUp)
