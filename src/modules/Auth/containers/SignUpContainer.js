import _ from 'lodash'
import { compose, withHandlers, mapProps, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as ROUTE from '../../../constants/routes'
import * as STATE from '../../../constants/state'
import { fbLoginURL } from '../../../helpers/facebook'
import { googleLoginURL } from '../../../helpers/google'
import { watchSocailAuth, watchAuthToken } from '../helpers'
import SignUp from '../components/SignUp'
import { FORM } from '../components/SignUpForm'
import { signUpAction } from '../actions/signUp'
import actions from '../actions/signIn'

const mapStateToProps = (state) => ({
  loading: _.get(state, [STATE.SIGN_UP, 'loading']) || _.get(state, [STATE.TWITTER_REDIRECT, 'loading']),
  twitter: _.get(state, [STATE.TWITTER_REDIRECT, 'data', 'redirect']) || null,
  token: _.get(state, [STATE.SING_IN, 'data', 'token']),
  signUp: _.get(state, [STATE.SIGN_UP, 'data']),
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
