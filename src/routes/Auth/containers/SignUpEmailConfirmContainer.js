import _ from 'lodash'
import { compose, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as ROUTE from '../../../constants/routes'
import SignUpConfirm from '../components/SignUpConfirm'
import {
  signUpEmailConfirmAction,
  SIGN_UP_EMAIL_CONFIRM_STATE_NAME as EMAIL_CONFIRM
} from '../modules/signUp'

const mapStateToProps = (state) => ({
  loading: _.get(state, [EMAIL_CONFIRM, 'loading']),
  data: _.get(state, [EMAIL_CONFIRM, 'data']),
  failed: _.get(state, [EMAIL_CONFIRM, 'failed']),
})

const enhance = compose(
  connect(mapStateToProps, { signUpEmailConfirmAction }),
  withPropsOnChange(['loading'], (props) => {
    if (!props.data && !props.loading && !props.failed) {
      const code = _.get(props, ['params', 'code'])
      props.signUpEmailConfirmAction(code)
        .catch(() => browserHistory.push(ROUTE.SIGN_IN_URL))
    }
  })
)

export default enhance(SignUpConfirm)
