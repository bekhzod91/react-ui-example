import { injectReducer } from '../../store/reducers'
import * as ROUTE from '../../constants/routes'

const SelectCompany = store => ({
  path : ROUTE.COMPANY_MY_LIST_URL,
  getComponent: (location, cb) => {
    require.ensure([], require => {
      const reducer = require('./modules/myCompaneis').default
      injectReducer(store, { key: 'myCompanies', reducer })
      cb(null, require('./containers/SelectCompanyContainer').default)
    }, 'select_company')
  }
})

const Recovery = store => ({
  path : ROUTE.RECOVERY_URL,
  getComponent: (location, cb) => {
    require.ensure([], require => {
      const reducer = require('./modules/recovery')
      injectReducer(store, { key: reducer.RECOVERY_STATE_NAME, reducer: reducer.recoveryReducer })
      cb(null, require('./containers/RecoveryContainer').default)
    }, 'recovery')
  }
})

const ResetPassword = store => ({
  path : ROUTE.RESET_PASSWORD_URL,
  getComponent: (location, cb) => {
    require.ensure([], require => {
      const reducer = require('./modules/resetPassword')
      injectReducer(store, { key: reducer.RESET_PASSWORD_STATE_NAME, reducer: reducer.resetPasswordReducer })
      cb(null, require('./containers/ResetPasswordContainer').default)
    }, 'reset_password')
  }
})

const SignUp = store => ({
  path : ROUTE.SIGN_UP_URL,
  getComponent: (location, cb) => {
    require.ensure([], require => {
      const reducer = require('./modules/signUp')
      const signInReducer = require('./modules/signIn')
      injectReducer(store, { key: reducer.SIGN_UP_STATE_NAME, reducer: reducer.signUpReducer })
      injectReducer(store, { key: signInReducer.TWITTER_REDIRECT_STATE, reducer: signInReducer.twitterRedirectReducer })
      cb(null, require('./containers/SignUpContainer').default)
    }, 'recovery')
  },
})

const SignIn = store => ({
  path : ROUTE.SIGN_IN_URL,
  getComponent: (location, cb) => {
    require.ensure([], require => {
      const reducer = require('./modules/signIn')
      injectReducer(store, { key: reducer.SING_IN_STATE_NAME, reducer: reducer.singInReducer })
      injectReducer(store, { key: reducer.TWITTER_REDIRECT_STATE, reducer: reducer.twitterRedirectReducer })
      cb(null, require('./containers/SignInContainer').default)
    }, 'sign_in')
  }
})

const Auth = store => ({
  path : '',
  getChildRoutes: (location, cb) => {
    require.ensure([], (require) => {
      cb(null, [
        // Remove imports!
        SignIn(store),
        Recovery(store),
        ResetPassword(store),
        SignUp(store),
        SelectCompany(store)
      ])
    })
  }
})

export default Auth
