import _ from 'lodash'
import { compose, mapPropsStream, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as STATE from '../../../constants/state'
import * as ROUTE from '../../../constants/routes'
import { getToken, clearToken } from '../../../helpers/token'
import { fetchProfileAction } from '../../../actions/profile'
import PageLayout from '../../../components/Layouts/PageLayout'
import { setTokenAction, clearTokenAction } from '../../../routes/User/actions/token'
import { getPermissionsAction } from '../../../actions/permissions'

const mapStateToProps = (state) => ({
  token: _.get(state, [STATE.SING_IN, 'data', 'token']),
  loading: _.get(state, [STATE.USER_PROFILE, 'loading'])
})

const enhance = compose(
  connect(mapStateToProps, {
    fetchProfileAction,
    setTokenAction,
    clearTokenAction,
    getPermissionsAction
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

    props$
      .filter((props) => props.params.id)
      .distinctUntilChanged(null, (props) => props.params.id)
      .subscribe((props) => {
        props.getPermissionsAction(props.params.id)
      })

    return props$
  })
)

export default enhance(PageLayout)
