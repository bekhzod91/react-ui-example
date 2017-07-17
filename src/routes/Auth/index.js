import { injectReducers } from '../../store/reducers'
import * as ROUTE from '../../constants/routes'
import {
  startLoadingAction,
  finishLoadingAction
} from '../../components/WithState/PageLoading/actions'

const Auth = store => ({
  path : '',
  getChildRoutes: (location, cb) => {
    // Start loading
    store.dispatch(startLoadingAction())

    require.ensure([], (require) => {
      injectReducers(store, require('./reducers').default)
      cb(null, [
        {
          path: ROUTE.RECOVERY_URL,
          component: require('./containers/RecoveryContainer').default
        },
        {
          path: ROUTE.RECOVERY_THANK_YOU_URL,
          component: require('./containers/RecoveryThankYouContainer').default
        },
        {
          path: ROUTE.RESET_PASSWORD_URL,
          component: require('./containers/ResetPasswordContainer').default
        },
        {
          path: ROUTE.SIGN_UP_URL,
          component: require('./containers/SignUpContainer').default
        },
        {
          path : ROUTE.SIGN_UP_THANK_YOU_URL,
          component: require('./containers/SignUpThankYouContainer').default
        },
        {
          path : ROUTE.SIGN_UP_RESEND_MESSAGE_URL,
          component: require('./containers/SignUpResendMessageContainer').default
        },
        {
          path : ROUTE.SIGN_UP_EMAIL_CONFIRM_URL,
          component: require('./containers/SignUpEmailConfirmContainer').default
        },
        {
          path: ROUTE.SIGN_IN_URL,
          component: require('./containers/SignInContainer').default
        }
      ])
    }, 'auth').then(() => {
      // Finish loading
      store.dispatch(finishLoadingAction())
    })
  }
})

export default Auth
