import * as R from 'ramda'
import { compose, withHandlers, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as ROUTE from '../../../constants/routes'
import * as STATE from '../../../constants/state'
import { getFormValueFromState } from '../../../helpers/get'
import { openSnackbarAction, SUCCESS_TYPE } from '../../../components/WithState/Snackbar/actions'
import actions from '../actions/resetPassword'
import ResetPassword from '../components/ResetPassword'
import { FORM } from '../components/ResetPasswordForm'

const mapStateToProps = (state) => ({
  loading: R.path([STATE.RESET_PASSWORD, 'loading'], state),
  resetPassword: R.path([STATE.RESET_PASSWORD, 'data'], state),
  formValues: getFormValueFromState(FORM, state),
})

const enhance = compose(
  connect(mapStateToProps, { ...actions, push, openSnackbarAction }),
  withPropsOnChange(['resetPassword'], ({ push, openSnackbarAction, ...props }) => {
    const message = R.path(['resetPassword', 'message'], props)
    if (props.resetPassword) {
      openSnackbarAction({ action: SUCCESS_TYPE, message })
      push(ROUTE.SIGN_IN_URL)
    }
  }),
  withHandlers({
    onSubmit: props => () => {
      const code = R.path(['params', 'code'], props)
      return props.resetPasswordAction(code, props.formValues)
    }
  })
)

export default enhance(ResetPassword)
