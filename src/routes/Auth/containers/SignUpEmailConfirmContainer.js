import _ from 'lodash'
import { compose, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as ROUTE from '../../../constants/routes'
import * as STATE from '../../../constants/state'
import SignUpConfirm from '../components/SignUpConfirm'
import { signUpEmailConfirmAction } from '../actions/signUp'

const mapStateToProps = (state) => ({
  loading: !(
    _.get(state, [STATE.SIGN_UP_EMAIL_CONFIRM, 'loading']) ||
    _.get(state, [STATE.SIGN_UP_EMAIL_CONFIRM, 'success']) ||
    _.get(state, [STATE.SIGN_UP_EMAIL_CONFIRM, 'failed'])
  ),
  data: _.get(state, [STATE.SIGN_UP_EMAIL_CONFIRM, 'data']) || {},
})

const enhance = compose(
  connect(mapStateToProps, { signUpEmailConfirmAction }),
  withPropsOnChange(['loading'], (props) => {
    if (!props.loading) {
      const code = _.get(props, ['params', 'code'])
      props.signUpEmailConfirmAction(code)
        .catch(() => browserHistory.push(ROUTE.SIGN_IN_URL))
    }
  })
)

export default enhance(SignUpConfirm)
