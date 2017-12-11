import { compose, path, not } from 'ramda'
import * as STATE from '../constants/state'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history3/redirect'

export default connectedRouterRedirect({
  redirectPath: '/sign-in',
  authenticatedSelector: compose(not, path([STATE.SING_IN, 'data', 'token'])),
  wrapperDisplayName: 'UserIsAnonymous'
})
