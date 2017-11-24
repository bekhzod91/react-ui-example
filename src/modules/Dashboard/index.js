import * as ROUTE from '../../constants/routes'
import { startLoadingAction, finishLoadingAction } from '../../components/WithState/PageLoading/actions'

export default (store) => ({
  path: '',
  getChildRoutes: (location, cb) => {
    // Start loading
    store.dispatch(startLoadingAction())

    require.ensure([], (require) => {
      // injectReducers(store, require('./reducers').default)
      cb(null, [
        {
          path: ROUTE.DASHBOARD_URL,
          component: require('./containers/DashboardContainer').default
        },
      ])
    }, 'dashboard').then(() => {
      // Finish loading
      store.dispatch(finishLoadingAction())
    })
  }
})
