import { injectReducers } from '../../store/reducers'
import * as ROUTE from '../../constants/routes'
import {
  startLoadingAction,
  finishLoadingAction
} from '../../components/withState/PageLoading/actions'

const User = store => ({
  path : '',
  getChildRoutes: (location, cb) => {
    // Start loading
    store.dispatch(startLoadingAction())

    require.ensure([], (require) => {
      injectReducers(store, require('./reducers').default)
      cb(null, [
        {
          path: ROUTE.COMPANY_MY_LIST_URL,
          component: require('./containers/CompaniesContainer').default,
        },
      ])
    }, 'user').then(() => {
      // Finish loading
      store.dispatch(finishLoadingAction())
    })
  }
})

export default User
