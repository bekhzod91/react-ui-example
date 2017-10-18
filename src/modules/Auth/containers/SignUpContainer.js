import * as R from 'ramda'
import { compose, withHandlers, mapProps, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as ROUTE from '../../../constants/routes'
import * as STATE from '../../../constants/state'
import { redirect } from '../../../helpers/window'
import { fbLoginURL } from '../../../helpers/facebook'
import { googleLoginURL } from '../../../helpers/google'
import { watchSocailAuth, watchAuthToken } from '../helpers'
import SignUp from '../components/SignUp'
import { FORM } from '../components/SignUpForm'
import { signUpAction } from '../actions/signUp'
import actions from '../actions/signIn'

const mapStateToProps = (state) => ({
  loading: R.path([STATE.SIGN_UP, 'loading'], state) || R.path([STATE.TWITTER_REDIRECT, 'loading'], state),
  twitter: R.path([STATE.TWITTER_REDIRECT, 'data', 'redirect'], state) || null,
  token: R.path([STATE.SING_IN, 'data', 'token'], state),
  signUp: R.path([STATE.SIGN_UP, 'data'], state),
  formValues: R.path(['form', FORM, 'values'], state)
})

const mapPropsToComponent = props => {
  const buttons = {
    facebook: {
      handle: () => redirect(fbLoginURL()),
      label: 'Sign Up with FaceBook',
    },
    google: {
      handle: () => redirect(googleLoginURL()),
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
  connect(mapStateToProps, { ...actions, push, signUpAction }),
  mapProps(mapPropsToComponent),
  withPropsOnChange(['twitter'], ({ twitter }) => {
    if (twitter) {
      redirect(twitter)
    }
  }),
  withPropsOnChange(['token'], watchAuthToken),
  withPropsOnChange(['location'], watchSocailAuth),
  withHandlers({
    onSubmit: props => () => {
      return props
        .signUpAction(props.formValues)
        .then(() => props.push(ROUTE.SIGN_UP_THANK_YOU_URL))
    }
  })
)

export default enhance(SignUp)
