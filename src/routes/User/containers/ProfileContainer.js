import _ from 'lodash'
import { compose, mapPropsStream, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as STATE from '../../../constants/state'
import * as ROUTE from '../../../constants/routes'
import { getToken, clearToken } from '../../../helpers/token'
import { fetchProfileAction } from '../actions/profile'

const mapStateToProps = (state) => ({
  loading: _.get(state, [STATE.USER_PROFILE, 'loading'])
})

export default compose(
  connect(mapStateToProps, {
    fetchProfileAction
  }),
  lifecycle({
    componentWillMount () {
      const token = getToken()
      token && this.props.setTokenAction(token)
    }
  }),
  mapPropsStream((props$) => {
    props$
      .filter((props) => props.token)
      .distinctUntilChanged(null, (props) => props.token)
      .subscribe((props) => {
        props.fetchProfileAction()
          .catch(() => {
            return Promise.resolve(props.clearTokenAction())
              .then(() => clearToken())
              .then(() => browserHistory.push(ROUTE.SIGN_IN))
          })
      })

    return props$
  })
)
