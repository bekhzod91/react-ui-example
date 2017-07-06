import _ from 'lodash'
import { compose, withHandlers, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import Recovery from '../components/Recovery'
import { openSnackbarAction } from '../../../components/withState/Snackbar/actions'
import { FORM_NAME } from '../components/RecoveryForm'
import {
  actions,
  RECOVERY_STATE_NAME
} from '../modules/recovery'

const mapStateToProps = (state) => ({
  loading: _.get(state, [RECOVERY_STATE_NAME, 'loading']),
  recovery: _.get(state, [RECOVERY_STATE_NAME, 'data']),
  error: _.get(state, [RECOVERY_STATE_NAME, 'error']),
  formValues: _.get(state, ['form', FORM_NAME, 'values']),
})

const enhance = compose(
  connect(mapStateToProps, { ...actions, openSnackbarAction }),
  withPropsOnChange(['recovery'], (props) => {
    const email = _.get(props, ['recovery', 'email'])

    if (email) {
      props.openSnackbarAction({
        action: 'success',
        message: `We send confirmation email ${email}`,
        duration: 10000
      })
    }
  }),
  withHandlers({
    onSubmit: props => () => props.recoveryAction(props.formValues),
  })
)

export default enhance(Recovery)
