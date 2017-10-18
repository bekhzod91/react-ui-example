import * as R from 'ramda'
import * as STATE from '../constants/state'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history3/redirect'

export default connectedRouterRedirect({
  redirectPath: '/sign-in',
  authenticatedSelector: R.pipe(R.path([STATE.SING_IN, 'data', 'token']), R.not),
  wrapperDisplayName: 'UserIsAnonymous'
})
