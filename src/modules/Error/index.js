import AppLayout from '../../layout/AppLayout'
import Page500Container from './containers/Page500Container'
import Page404Container from './containers/Page404Container'

export default (store) => ([
  {
    layout: AppLayout,
    path: '/500',
    component: Page500Container
  },
  {
    layout: AppLayout,
    component: Page404Container
  }
])
