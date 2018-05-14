import { compose, path, not } from 'ramda'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history3/redirect'
import * as STATES from '../constants/states'

export default connectedRouterRedirect({
  redirectPath: '/sign-in',
  authenticatedSelector: compose(not, path([STATES.SING_IN, 'data', 'token'])),
  wrapperDisplayName: 'UserIsAnonymous'
})
