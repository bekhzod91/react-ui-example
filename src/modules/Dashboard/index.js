import AppLayout from '../../components/Layouts/AppLayout'
import { AsyncComponent } from '../../components/Layouts/RouterLayout'
import * as ROUTE from '../../constants/routes'

const getDashboardContainer = () =>
  import(/* webpackChunkName: "dashboard" */ './containers/DashboardContainer')
    .then(module => module.default)

export default (store) => ([
  {
    layout: AppLayout,
    path: ROUTE.DASHBOARD_URL,
    component: AsyncComponent(() => getDashboardContainer())
  }
])
