import { path, pathOr } from 'ramda'
import { compose, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as ROUTES from '../../../constants/routes'
import * as STATES from '../../../constants/states'
import SignUpConfirm from '../components/SignUpConfirm'
import { signUpEmailConfirmAction } from '../actions/signUp'

const mapStateToProps = (state) => ({
  loading: !(
    path([STATES.SIGN_UP_EMAIL_CONFIRM, 'loading'], state) ||
    path([STATES.SIGN_UP_EMAIL_CONFIRM, 'success'], state) ||
    path([STATES.SIGN_UP_EMAIL_CONFIRM, 'failed'], state)
  ),
  data: pathOr({}, [STATES.SIGN_UP_EMAIL_CONFIRM, 'data'], state),
})

const enhance = compose(
  connect(mapStateToProps, { signUpEmailConfirmAction, push }),
  withPropsOnChange(['loading'], (props) => {
    if (!props.loading) {
      const code = path(['match', 'params', 'code'], props)
      props.signUpEmailConfirmAction(code)
        .catch(() => props.push(ROUTES.SIGN_IN_URL))
    }
  })
)

export default enhance(SignUpConfirm)
