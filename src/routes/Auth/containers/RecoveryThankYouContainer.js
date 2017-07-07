import _ from 'lodash'
import { compose, withPropsOnChange, mapProps } from 'recompose'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as ROUTE from '../../../constants/routes'
import RecoveryThankYou from '../components/RecoveryThankYou'
import {
  actions,
  RECOVERY_STATE_NAME
} from '../modules/recovery'

const mapStateToProps = (state) => ({
  recovery: _.get(state, [RECOVERY_STATE_NAME, 'data']),
})

const enhance = compose(
  connect(mapStateToProps, { ...actions, }),
  withPropsOnChange(['recovery'], (props) => {
    const email = _.get(props, ['recovery', 'email'])

    if (!email) {
      browserHistory.push(ROUTE.SIGN_IN_URL)
    }
  }),
  mapProps((props) => {
    const email = _.get(props, ['recovery', 'email'])
    const firstName = _.get(props, ['recovery', 'firstName'])

    return {
      email,
      firstName,
      ...props
    }
  })
)

export default enhance(RecoveryThankYou)