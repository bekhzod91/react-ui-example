import { injectReducers } from '../../reducers'
import * as ROUTE from '../../constants/routes'
import {
  startLoadingAction,
  finishLoadingAction
} from '../../components/WithState/PageLoading/actions'

const CompanyRoute = store => ({
  getChildRoutes: (location, cb) => {
    // Start loading
    store.dispatch(startLoadingAction())

    require.ensure([], (require) => {
      const reducers = require('./reducers').default
      const companyContainer = require('./containers/CompanyContainer').default
      injectReducers(store, reducers)

      cb(null, [
        {
          path: ROUTE.COMPANY_LIST_URL,
          component: companyContainer,
          childRoutes: [{
            path: ROUTE.COMPANY_DETAIL_URL,
            component: companyContainer,
          }]
        }
      ])
    }, 'user').then(() => {
      // Finish loading
      store.dispatch(finishLoadingAction())
    })
  }
})

export default CompanyRoute
