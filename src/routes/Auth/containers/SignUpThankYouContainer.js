import _ from 'lodash'
import { compose, withPropsOnChange, withHandlers, mapProps } from 'recompose'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as ROUTE from '../../../constants/routes'
import * as STATE from '../../../constants/state'
import SignUpThankYou from '../components/SignUpThankYou'
import { resendMessageAction } from '../actions/signUp'

const mapStateToProps = (state) => ({
  data: _.get(state, [STATE.SIGN_UP, 'data']),
  loading: _.get(state, [STATE.RESEND_MESSAGE, 'loading']),
})

const enhance = compose(
  connect(mapStateToProps, { resendMessageAction }),
  withPropsOnChange(['data'], (props) => {
    const email = _.get(props, ['data', 'email'])

    if (!email) {
      browserHistory.push(ROUTE.SIGN_IN_URL)
    }
  }),
  withHandlers({
    resend: props => () => {
      const email = _.get(props, ['data', 'email'])

      return props
        .resendMessageAction(email)
        .then(() => browserHistory.push(ROUTE.SIGN_UP_RESEND_MESSAGE_URL))
    }
  }),
  mapProps((props) => {
    const email = _.get(props, ['data', 'email'])
    const firstName = _.get(props, ['data', 'firstName'])

    return {
      email,
      firstName,
      ...props
    }
  })
)

export default enhance(SignUpThankYou)
