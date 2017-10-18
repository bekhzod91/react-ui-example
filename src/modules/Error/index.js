import Page404Container from './containers/Page404Container'
import Page500Container from './containers/Page500Container'

// Sync route definition
export default (store) => ({
  path: '',
  childRoutes: [
    {
      path: '500',
      component: Page500Container
    },
    {
      path: '*',
      component: Page404Container
    }
  ]
})
