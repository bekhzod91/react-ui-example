// We only need to import the modules necessary for initial render
import { compose } from 'recompose'
import BaseLayout from '../components/Layouts/BaseLayout'
import AuthWrapperContainer from './Auth/containers/AuthWrapperContainer'
import CompanyContainer from './User/containers/CompanyContainer'
import PermissionContainer from './User/containers/PermissionContainer'
import Dashboard from './Dashboard'
import Auth from './Auth'
import User from './User'
import Error from './Error'
import Company from './Company'
import Common from './Common'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path        : '/',
  component   : compose(
    AuthWrapperContainer,
    CompanyContainer,
    PermissionContainer
  )(BaseLayout),
  indexRoute  : Dashboard(store),
  childRoutes : [
    Dashboard(store),
    Auth(store),
    User(store),
    Company(store),
    Common(store),
    Error(store),
  ],
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
