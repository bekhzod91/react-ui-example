import _ from 'lodash'
import { compose, withPropsOnChange, mapProps } from 'recompose'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as ROUTE from '../../../constants/routes'
import SingUpMessageResend from '../components/SingUpMessageResend'
import {
  resendMessageAction,
  SIGN_UP_STATE_NAME as SIGN_UP
} from '../modules/signUp'

const mapStateToProps = (state) => ({
  [SIGN_UP]: _.get(state, [SIGN_UP, 'data'])
})

const enhance = compose(
  connect(mapStateToProps, { resendMessageAction }),
  withPropsOnChange([SIGN_UP], (props) => {
    const email = _.get(props, [SIGN_UP, 'email'])

    if (!email) {
      browserHistory.push(ROUTE.SIGN_IN_URL)
    }
  }),
  mapProps((props) => {
    const email = _.get(props, [SIGN_UP, 'email'])
    const firstName = _.get(props, [SIGN_UP, 'firstName'])

    return {
      email,
      firstName,
      ...props
    }
  })
)

export default enhance(SingUpMessageResend)
