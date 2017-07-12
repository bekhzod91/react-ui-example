import _ from 'lodash'
import { compose, withPropsOnChange, mapProps } from 'recompose'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as ROUTE from '../../../constants/routes'
import * as STATE from '../../../constants/state'
import SignUpMessageResend from '../components/SignUpMessageResend'
import { resendMessageAction } from '../actions/signUp'

const mapStateToProps = (state) => ({
  data: _.get(state, [STATE.SIGN_UP, 'data'])
})

const enhance = compose(
  connect(mapStateToProps, { resendMessageAction }),
  withPropsOnChange(['data'], (props) => {
    const email = _.get(props, ['data', 'email'])

    if (!email) {
      browserHistory.push(ROUTE.SIGN_IN_URL)
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

export default enhance(SignUpMessageResend)
