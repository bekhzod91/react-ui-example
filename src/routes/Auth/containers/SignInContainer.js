import _ from 'lodash'
import { compose, mapProps } from 'recompose'
import { connect } from 'react-redux'
import SignIn from '../components/SignIn'
import { singInAction } from '../modules/sign_in'

const mapStateToProps = (state) => ({
  loading: _.get(state, ['signIn', 'loading']),
  formValues: _.get(state, ['form', 'SignInForm', 'values'])
})

const mapDispatchToProps = {
  singInAction
}

const mapPropsToComponent = props => {
  const handleSocialSignIn = {
    handleFacebookSignIn: event => {},
    handleGooglePlusSignIn: event => {},
    handleTwitterSignIn: event => {}
  }

  return {
    onSubmit: () => {
      return props.singInAction(props.formValues)
    },
    loading: props.loading,
    handleSocialSignIn
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapProps(mapPropsToComponent)
)(SignIn)
