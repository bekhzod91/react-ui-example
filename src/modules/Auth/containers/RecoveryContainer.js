import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as ROUTE from '../../../constants/routes'
import * as STATE from '../../../constants/state'
import Recovery from '../components/Recovery'
import { FORM } from '../components/RecoveryForm'
import actions from '../actions/recovery'

const mapStateToProps = (state) => ({
  loading: _.get(state, [STATE.RECOVERY, 'loading']),
  recovery: _.get(state, [STATE.RECOVERY, 'data']),
  error: _.get(state, [STATE.RECOVERY, 'error']),
  formValues: _.get(state, ['form', FORM, 'values']),
})

const enhance = compose(
  connect(mapStateToProps, { ...actions }),
  withHandlers({
    onSubmit: props => () => {
      return props
        .recoveryAction(props.formValues)
        .then(() => browserHistory.push(ROUTE.RECOVERY_THANK_YOU_URL))
    }
  })
)

export default enhance(Recovery)
