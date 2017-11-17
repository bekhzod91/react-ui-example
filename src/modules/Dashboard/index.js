import * as ROUTE from '../../constants/routes'
import { startLoadingAction, finishLoadingAction } from '../../components/WithState/PageLoading/actions'
import UserIsAuthenticated from '../../permissions/UserIsAuthenticated'

export default (store) => ({
  path: '',
  getChildRoutes: (location, cb) => {
    // Start loading
    store.dispatch(startLoadingAction())

    require.ensure([], (require) => {
      // injectReducers(store, require('./reducers').default)
      cb(null, [
        {
          path: '/dashboard',
          component: require('./containers/DashboardContainer').default
        },
      ])
    }, 'dashboard').then(() => {
      // Finish loading
      store.dispatch(finishLoadingAction())
    })
  }
})
