import _ from 'lodash'
import { compose, withHandlers, mapProps, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import * as STATE from '../../../constants/state'
import { fbLoginURL } from '../../../helpers/facebook'
import { googleLoginURL } from '../../../helpers/google'
import { watchSocailAuth, watchAuthToken } from '../helpers'
import SignIn from '../components/SignIn'
import actions from '../actions/signIn'

const mapStateToProps = (state) => ({
  loading: (
    _.get(state, [STATE.SING_IN, 'loading']) ||
    _.get(state, [STATE.TWITTER_REDIRECT, 'loading'])
  ),
  twitter: _.get(state, [STATE.TWITTER_REDIRECT, 'data', 'redirect']) || null,
  token: _.get(state, [STATE.SING_IN, 'data', 'token']),
  error: _.get(state, [STATE.SING_IN, 'error']),
  formValues: _.get(state, ['form', 'SignInForm', 'values'])
})

const mapPropsToComponent = props => {
  const buttons = {
    facebook: {
      handle: () => {
        window.location.href = fbLoginURL()
      },
      label: 'Sign In with FaceBook',
    },
    google: {
      handle: () => {
        window.location.href = googleLoginURL()
      },
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
      window.location.href = twitter
    }
  }),
  withPropsOnChange(['token'], watchAuthToken),
  withPropsOnChange(['location'], watchSocailAuth),
  withHandlers({
    onSubmit: props => () => props.signInAction(props.formValues),
  })
)

export default enhance(SignIn)
