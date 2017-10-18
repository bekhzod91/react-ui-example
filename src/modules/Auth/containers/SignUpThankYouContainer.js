import * as R from 'ramda'
import { compose, withPropsOnChange, withHandlers, mapProps } from 'recompose'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as ROUTE from '../../../constants/routes'
import * as STATE from '../../../constants/state'
import SignUpThankYou from '../components/SignUpThankYou'
import { resendMessageAction } from '../actions/signUp'

const mapStateToProps = (state) => ({
  data: R.path([STATE.SIGN_UP, 'data'], state),
  loading: R.path([STATE.RESEND_MESSAGE, 'loading'], state),
})

const enhance = compose(
  connect(mapStateToProps, { resendMessageAction, push }),
  withPropsOnChange(['data'], (props) => {
    const email = R.path(['data', 'email'], props)

    if (!email) {
      props.push(ROUTE.SIGN_IN_URL)
    }
  }),
  withHandlers({
    resend: props => () => {
      const email = R.path(['data', 'email'], props)

      return props
        .resendMessageAction(email)
        .then(() => props.push(ROUTE.SIGN_UP_RESEND_MESSAGE_URL))
    }
  }),
  mapProps((props) => {
    const email = R.path(['data', 'email'], props)
    const firstName = R.path(['data', 'firstName'], props)

    return {
      email,
      firstName,
      ...props
    }
  })
)

export default enhance(SignUpThankYou)
