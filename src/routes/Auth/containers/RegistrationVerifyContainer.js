import _ from 'lodash'
import { compose, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import RecoveryVerify from '../components/RecoveryVerify'
import {
  actions,
  RECOVERY_VERIFY_STATE_NAME
} from '../modules/recoveryVerify'

const mapStateToProps = (state) => ({
  loading: _.get(state, [RECOVERY_VERIFY_STATE_NAME, 'loading']),
  recoveryVerify: _.get(state, [RECOVERY_VERIFY_STATE_NAME, 'data'])
})

const enhance = compose(
  connect(mapStateToProps, actions),
  withPropsOnChange(['params'], (props) => {
    const code = _.get(props, ['params', 'code'])
    if (code) {
      props.recoveryVerifyAction(code)
    }
  })
)

export default enhance(RecoveryVerify)
