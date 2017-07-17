import _ from 'lodash'
import * as STATE from '../constants/state'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history3/redirect'

export default connectedRouterRedirect({
  redirectPath: '/sign-in',
  authenticatedSelector: state => !_.get(state, [STATE.SING_IN, 'data', 'token']),
  wrapperDisplayName: 'UserIsAnonymous'
})
