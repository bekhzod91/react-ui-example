import { path } from 'ramda'
import * as STATE from '../constants/state'
import { routerActions } from 'react-router-redux'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

export default connectedRouterRedirect({
  redirectPath: '/sign-in',
  authenticatedSelector: state => Boolean(path([STATE.SING_IN, 'data', 'token'], state)),
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',

})
