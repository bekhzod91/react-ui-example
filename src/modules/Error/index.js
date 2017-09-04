import Page404 from './components/Page404'
import Page500 from './components/Page500'

// Sync route definition
export default (store) => ({
  path: '',
  childRoutes: [
    {
      path: '500',
      component: Page500
    },
    {
      path: '*',
      component: Page404
    }
  ]
})
