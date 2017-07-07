import _ from 'lodash'
import { compose, withPropsOnChange, withHandlers, mapProps } from 'recompose'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as ROUTE from '../../../constants/routes'
import SignUpThankYou from '../components/SignUpThankYou'
import {
  resendMessageAction,
  SIGN_UP_STATE_NAME as SIGN_UP,
  RESEND_MESSAGE_STATE_NAME as RESEND_MESSAGE
} from '../modules/signUp'

const mapStateToProps = (state) => ({
  [SIGN_UP]: _.get(state, [SIGN_UP, 'data']),
  [RESEND_MESSAGE]: _.get(state, [RESEND_MESSAGE, 'data']),
  loading: _.get(state, [RESEND_MESSAGE, 'loading']),
})

const enhance = compose(
  connect(mapStateToProps, { resendMessageAction }),
  withPropsOnChange([SIGN_UP], (props) => {
    const email = _.get(props, [SIGN_UP, 'email'])

    if (!email) {
      browserHistory.push(ROUTE.SIGN_IN_URL)
    }
  }),
  withHandlers({
    resend: props => () => {
      const email = _.get(props, [SIGN_UP, 'email'])

      return props
        .resendMessageAction(email)
        .then(() => browserHistory.push(ROUTE.SIGN_UP_RESEND_MESSAGE_URL))
    }
  }),
  mapProps((props) => {
    console.log(props)
    const email = _.get(props, [SIGN_UP, 'email'])
    const firstName = _.get(props, [SIGN_UP, 'firstName'])

    return {
      email,
      firstName,
      ...props
    }
  })
)

export default enhance(SignUpThankYou)
