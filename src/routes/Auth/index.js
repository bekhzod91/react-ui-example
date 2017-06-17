import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'sign-in',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const SignIn = require('./containers/SignInContainer').default
      const reducer = require('./modules/sign_in').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'signIn', reducer })

      /*  Return getComponent   */
      cb(null, SignIn)

    /* Webpack named bundle   */
    }, 'counter')
  }
})
