import _ from 'lodash'
import { compose, mapProps } from 'recompose'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { setToken } from '../../../helpers/token'
import SignIn from '../components/SignIn'
import { singInAction } from '../modules/signIn'
import * as ROUTER from '../../../constants/routes'

const mapStateToProps = (state) => ({
  loading: _.get(state, ['signIn', 'loading']),
  formValues: _.get(state, ['form', 'SignInForm', 'values'])
})

const mapDispatchToProps = {
  singInAction,
}

const mapPropsToComponent = props => {
  const handleSocialSignIn = {
    handleFacebookSignIn: event => {},
    handleGooglePlusSignIn: event => {},
    handleTwitterSignIn: event => {}
  }

  return {
    onSubmit: () => {
      return props
        .singInAction(props.formValues)
        .then((data) => {
          const token = _.get(data, ['value', 'token'])
          setToken(token, _.get(props.formValues, 'rememberMe'))

          browserHistory.push(ROUTER.COMPANY_MY_LIST_URL)
        })
    },
    loading: props.loading,
    handleSocialSignIn
  }
}

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapProps(mapPropsToComponent)
)

export default enhance(SignIn)
