import { path } from 'ramda'
import { compose, withPropsOnChange, mapProps } from 'recompose'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as ROUTES from '../../../constants/routes'
import * as STATES from '../../../constants/states'
import RecoveryThankYou from '../components/RecoveryThankYou'
import actions from '../actions/recovery'

const mapStateToProps = (state) => ({
  recovery: path([STATES.RECOVERY, 'data'], state),
})

const enhance = compose(
  connect(mapStateToProps, { ...actions, push }),
  withPropsOnChange(['recovery'], (props) => {
    const email = path(['recovery', 'email'], props)

    if (!email) {
      props.push(ROUTES.SIGN_IN_URL)
    }
  }),
  mapProps((props) => {
    const email = path(['recovery', 'email'], props)
    const firstName = path(['recovery', 'firstName'], props)

    return {
      email,
      firstName,
      ...props
    }
  })
)

export default enhance(RecoveryThankYou)
