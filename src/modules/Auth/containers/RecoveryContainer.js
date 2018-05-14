import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { compose, withHandlers } from 'recompose'
import { path } from 'ramda'
import * as ROUTES from '../../../constants/routes'
import * as STATES from '../../../constants/states'
import { getFormValueFromState } from '../../../helpers/form'
import Recovery from '../components/Recovery'
import { FORM } from '../components/RecoveryForm'
import actions from '../actions/recovery'

const mapStateToProps = (state) => ({
  loading: path([STATES.RECOVERY, 'loading'], state),
  recovery: path([STATES.RECOVERY, 'data'], state),
  error: path([STATES.RECOVERY, 'error'], state),
  formValues: getFormValueFromState(FORM, state),
})

const enhance = compose(
  connect(mapStateToProps, { ...actions, push }),
  withHandlers({
    onSubmit: props => () => {
      return props
        .recoveryAction(props.formValues)
        .then(() => props.push(ROUTES.RECOVERY_THANK_YOU_URL))
    }
  })
)

export default enhance(Recovery)
