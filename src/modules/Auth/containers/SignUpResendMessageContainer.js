import { path } from 'ramda'
import { compose, withPropsOnChange, mapProps } from 'recompose'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as ROUTES from '../../../constants/routes'
import * as STATES from '../../../constants/states'
import SignUpMessageResend from '../components/SignUpMessageResend'
import { resendMessageAction } from '../actions/signUp'

const mapStateToProps = (state) => ({
  data: path([STATES.SIGN_UP, 'data'], state)
})

const enhance = compose(
  connect(mapStateToProps, { resendMessageAction, push }),
  withPropsOnChange(['data'], (props) => {
    const email = path(['data', 'email'], props)

    if (!email) {
      props.push(ROUTES.SIGN_IN_URL)
    }
  }),
  mapProps((props) => {
    const email = path(['data', 'email'], props)
    const firstName = path(['data', 'firstName'], props)

    return {
      email,
      firstName,
      ...props
    }
  })
)

export default enhance(SignUpMessageResend)
