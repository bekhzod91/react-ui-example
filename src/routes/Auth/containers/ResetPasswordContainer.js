import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import ResetPassword from '../components/ResetPassword'
import { FORM } from '../components/ResetPasswordForm'
import {
  actions,
  RESET_PASSWORD_STATE_NAME
} from '../modules/resetPassword'

const mapStateToProps = (state) => ({
  loading: _.get(state, [RESET_PASSWORD_STATE_NAME, 'loading']),
  resetPassword: _.get(state, [RESET_PASSWORD_STATE_NAME, 'data']),
  formValues: _.get(state, ['form', FORM, 'values']),
})

const enhance = compose(
  connect(mapStateToProps, actions),
  withHandlers({
    onSubmit: props => () => props.resetPasswordAction(props.formValues),
  })
)

export default enhance(ResetPassword)
