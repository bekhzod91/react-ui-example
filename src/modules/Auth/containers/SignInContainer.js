import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { compose, withHandlers, mapProps, withPropsOnChange } from 'recompose'
import { path } from 'ramda'
import * as STATE from '../../../constants/state'
import { redirect } from '../../../helpers/window'
import { fbLoginURL } from '../../../helpers/facebook'
import { googleLoginURL } from '../../../helpers/google'
import { watchSocailAuth, watchAuthToken } from '../helpers'
import SignIn from '../components/SignIn'
import actions from '../actions/signIn'

const mapStateToProps = (state) => ({
  loading: (
    path([STATE.SING_IN, 'loading'], state) ||
    path([STATE.TWITTER_REDIRECT, 'loading'], state)
  ),
  twitter: path([STATE.TWITTER_REDIRECT, 'data', 'redirect'], state) || null,
  token: path([STATE.SING_IN, 'data', 'token'], state),
  error: path([STATE.SING_IN, 'error'], state),
  formValues: path(['form', 'SignInForm', 'values'], state)
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
  connect(mapStateToProps, { ...actions, push }),
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
