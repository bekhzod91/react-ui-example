import * as R from 'ramda'
import { compose, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as ROUTE from '../../../constants/routes'
import * as STATE from '../../../constants/state'
import SignUpConfirm from '../components/SignUpConfirm'
import { signUpEmailConfirmAction } from '../actions/signUp'

const mapStateToProps = (state) => ({
  loading: !(
    R.path([STATE.SIGN_UP_EMAIL_CONFIRM, 'loading'], state) ||
    R.path([STATE.SIGN_UP_EMAIL_CONFIRM, 'success'], state) ||
    R.path([STATE.SIGN_UP_EMAIL_CONFIRM, 'failed'], state)
  ),
  data: R.pathOr({}, [STATE.SIGN_UP_EMAIL_CONFIRM, 'data'], state),
})

const enhance = compose(
  connect(mapStateToProps, { signUpEmailConfirmAction, push }),
  withPropsOnChange(['loading'], (props) => {
    if (!props.loading) {
      const code = R.path(['params', 'code'], props)
      props.signUpEmailConfirmAction(code)
        .catch(() => props.push(ROUTE.SIGN_IN_URL))
    }
  })
)

export default enhance(SignUpConfirm)
