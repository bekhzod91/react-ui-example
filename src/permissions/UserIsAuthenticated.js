import { path } from 'ramda'
import { routerActions } from 'react-router-redux'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import * as STATES from '../constants/states'

export default connectedRouterRedirect({
  redirectPath: '/sign-in',
  authenticatedSelector: state => Boolean(path([STATES.SING_IN, 'data', 'token'], state)),
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated',

})
