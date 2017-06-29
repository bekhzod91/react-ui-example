import { injectReducer } from '../../store/reducers'
import * as ROUTE from '../../constants/routes'

export const SignIn = store => ({
  path : ROUTE.SIGN_IN_URL,
  getComponent: (nextState, cb) => {
    require.ensure([], require => {
      const reducer = require('./modules/signIn').default
      injectReducer(store, { key: 'signIn', reducer })
      cb(null, require('./containers/SignInContainer').default)
    }, 'sign_in')
  }
})

export const SelectCompany = store => ({
  path : ROUTE.COMPANY_MY_LIST_URL,
  getComponent: (nextState, cb) => {
    require.ensure([], require => {
      const reducer = require('./modules/myCompaneis').default
      injectReducer(store, { key: 'myCompanies', reducer })
      cb(null, require('./containers/SelectCompanyContainer').default)
    }, 'select_company')
  },
})
