import { path } from 'ramda'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as ROUTE from '../../../constants/routes'
import * as STATE from '../../../constants/state'
import { getFormValueFromState } from '../../../helpers/get'
import Recovery from '../components/Recovery'
import { FORM } from '../components/RecoveryForm'
import actions from '../actions/recovery'

const mapStateToProps = (state) => ({
  loading: path([STATE.RECOVERY, 'loading'], state),
  recovery: path([STATE.RECOVERY, 'data'], state),
  error: path([STATE.RECOVERY, 'error'], state),
  formValues: getFormValueFromState(FORM, state),
})

const enhance = compose(
  connect(mapStateToProps, { ...actions, push }),
  withHandlers({
    onSubmit: props => () => {
      return props
        .recoveryAction(props.formValues)
        .then(() => props.push(ROUTE.RECOVERY_THANK_YOU_URL))
    }
  })
)

export default enhance(Recovery)
