import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { compose, withHandlers, withPropsOnChange } from 'recompose'
import { path } from 'ramda'
import * as ROUTES from '../../../constants/routes'
import * as STATES from '../../../constants/states'
import { getFormValueFromState } from '../../../helpers/form'
import { openSnackbarAction, SUCCESS_TYPE } from '../../../components/Snackbar/actions'
import actions from '../actions/resetPassword'
import ResetPassword from '../components/ResetPassword'
import { FORM } from '../components/ResetPasswordForm'

const mapStateToProps = (state) => ({
  loading: path([STATES.RESET_PASSWORD, 'loading'], state),
  resetPassword: path([STATES.RESET_PASSWORD, 'data'], state),
  formValues: getFormValueFromState(FORM, state),
})

const enhance = compose(
  connect(mapStateToProps, { ...actions, push, openSnackbarAction }),
  withPropsOnChange(['resetPassword'], ({ push, openSnackbarAction, ...props }) => {
    const message = path(['resetPassword', 'message'], props)
    if (props.resetPassword) {
      openSnackbarAction({ action: SUCCESS_TYPE, message })
      push(ROUTES.SIGN_IN_URL)
    }
  }),
  withHandlers({
    onSubmit: props => () => {
      const code = path(['params', 'code'], props)
      return props.resetPasswordAction(code, props.formValues)
    }
  })
)

export default enhance(ResetPassword)
