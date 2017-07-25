import _ from 'lodash'
import { compose, withPropsOnChange, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as STATE from '../../../constants/state'
import * as ROUTE from '../../../constants/routes'
import { getToken, clearToken } from '../../../helpers/token'
import { fetchProfileAction } from '../../../actions/profile'
import PageLayout from '../../../components/Layouts/PageLayout'
import { setTokenAction, clearTokenAction } from '../../../routes/User/actions/token'

const mapStateToProps = (state) => ({
  token: _.get(state, [STATE.SING_IN, 'data', 'token']),
  loading: !(
    _.get(state, [STATE.PROFILE, 'loading']) ||
    _.get(state, [STATE.PROFILE, 'success']) ||
    _.get(state, [STATE.PROFILE, 'failed'])
  ),
})

const enhance = compose(
  connect(mapStateToProps, { fetchProfileAction, setTokenAction, clearTokenAction }),
  lifecycle({
    componentWillMount () {
      const token = getToken()
      token && this.props.setTokenAction(token)
    }
  }),
  withPropsOnChange(['token'], (props) => {
    props.token && props.fetchProfileAction()
      .catch(() => {
        return Promise.resolve(props.clearTokenAction())
          .then(() => clearToken())
          .then(() => browserHistory.push(ROUTE.SIGN_IN))
      })
  })
)

export default enhance(PageLayout)
