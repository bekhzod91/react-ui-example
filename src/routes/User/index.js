import { injectReducers } from '../../store/reducers'
import * as ROUTE from '../../constants/routes'

const User = store => ({
  path : '',
  getChildRoutes: (location, cb) => {
    require.ensure([], (require) => {
      injectReducers(store, require('./reducers').default)
      cb(null, [
        {
          path: ROUTE.COMPANY_MY_LIST_URL,
          component: require('./containers/CompaniesContainer').default,
        },
      ], 'user')
    })
  }
})

export default User
