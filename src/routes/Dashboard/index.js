import { injectReducer } from '../../store/reducers'
import { COMPANY_MY_URL } from '../../constants/routes'

export default (store) => ({
  path : COMPANY_MY_URL,
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Counter = require('./containers/DashboardContainer').default
      const reducer = require('./actions/dashboard').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'dashboard', reducer })

      /*  Return getComponent   */
      cb(null, Counter)

      /* Webpack named bundle   */
    }, 'dashboard')
  }
})
