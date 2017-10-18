import * as R from 'ramda'
import { push } from 'react-router-redux'
import { compose, lifecycle, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ROUTE from '../../../constants/routes'
import * as STATE from '../../../constants/state'
import { getToken, clearToken } from '../../../helpers/token'
import { setTokenAction, clearTokenAction } from '../actions/token'
import { signOutAction } from '../actions/signOut'
import { fetchProfileAction } from '../actions/profile'

const mapStateToProps = (state) => ({
  token: R.path([STATE.SING_IN, 'data', 'token'], state),
  userEmail: R.path([STATE.USER_PROFILE, 'data', 'email'], state),
  userImage: R.path([STATE.USER_PROFILE, 'data', 'image'], state)
})

const mapDispatchToProps = (dispatch) => {
  return {
    setTokenAction: bindActionCreators(setTokenAction, dispatch),
    clearTokenAction: bindActionCreators(clearTokenAction, dispatch),
    fetchProfileAction: bindActionCreators(fetchProfileAction, dispatch),
    push: bindActionCreators(push, dispatch),
    logoutAction: () => {
      dispatch(signOutAction())
        .then(() => {
          clearToken()
          dispatch(clearTokenAction())
        })
        .catch(() => {
          clearToken()
          dispatch(clearTokenAction())
        })
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
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
              .then(() => props.push(ROUTE.SIGN_IN))
          })
      })

    return props$
  })
)
