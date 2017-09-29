import R from 'ramda'
import * as STATE from '../constants/state'
import { routerActions } from 'react-router-redux'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history3/redirect'

export default connectedRouterRedirect({
  redirectPath: '/sign-in',
  authenticatedSelector: state => Boolean(R.path([STATE.SING_IN, 'data', 'token'], state)),
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',

})
