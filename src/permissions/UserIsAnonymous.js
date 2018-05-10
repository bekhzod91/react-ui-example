import { compose, path, not } from 'ramda'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history3/redirect'
import * as STATE from '../constants/state'

export default connectedRouterRedirect({
  redirectPath: '/sign-in',
  authenticatedSelector: compose(not, path([STATE.SING_IN, 'data', 'token'])),
  wrapperDisplayName: 'UserIsAnonymous'
})
