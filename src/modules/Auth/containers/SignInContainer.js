import * as R from 'ramda'
import { compose, withHandlers, mapProps, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import * as STATE from '../../../constants/state'
import { redirect } from '../../../helpers/window'
import { fbLoginURL } from '../../../helpers/facebook'
import { googleLoginURL } from '../../../helpers/google'
import { watchSocailAuth, watchAuthToken } from '../helpers'
import SignIn from '../components/SignIn'
import actions from '../actions/signIn'

const mapStateToProps = (state) => ({
  loading: (
    R.path([STATE.SING_IN, 'loading'], state) ||
    R.path([STATE.TWITTER_REDIRECT, 'loading'], state)
  ),
  twitter: R.path([STATE.TWITTER_REDIRECT, 'data', 'redirect'], state) || null,
  token: R.path([STATE.SING_IN, 'data', 'token'], state),
  error: R.path([STATE.SING_IN, 'error'], state),
  formValues: R.path(['form', 'SignInForm', 'values'], state)
})

const mapPropsToComponent = props => {
  const buttons = {
    facebook: {
      handle: () => redirect(fbLoginURL()),
      label: 'Sign In with FaceBook',
    },
    google: {
      handle: () => redirect(googleLoginURL()),
      label: 'Sign In with Google',
    },
    twitter: {
      handle: () => props.fetchTwitterRedirectURLAction(),
      label: 'Sign In with Twitter',
    }
  }

  return {
    ...props,
    buttons
  }
}

const enhance = compose(
  connect(mapStateToProps, { ...actions }),
  mapProps(mapPropsToComponent),
  withPropsOnChange(['twitter'], ({ twitter }) => {
    if (twitter) {
      redirect(twitter)
    }
  }),
  withPropsOnChange(['token'], watchAuthToken),
  withPropsOnChange(['location'], watchSocailAuth),
  withHandlers({
    onSubmit: props => () => props.signInAction(props.formValues),
  })
)

export default enhance(SignIn)
