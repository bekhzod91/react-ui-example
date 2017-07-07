import _ from 'lodash'
import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as ROUTE from '../../../constants/routes'
import Recovery from '../components/Recovery'
import { FORM_NAME } from '../components/RecoveryForm'
import { actions, RECOVERY_STATE_NAME } from '../modules/recovery'

const mapStateToProps = (state) => ({
  loading: _.get(state, [RECOVERY_STATE_NAME, 'loading']),
  recovery: _.get(state, [RECOVERY_STATE_NAME, 'data']),
  error: _.get(state, [RECOVERY_STATE_NAME, 'error']),
  formValues: _.get(state, ['form', FORM_NAME, 'values']),
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
