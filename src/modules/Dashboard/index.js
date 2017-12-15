import { AsyncComponent } from '../../helpers/router'
import AppLayout from '../../layout/AppLayout'
import * as ROUTE from '../../constants/routes'

const getDashboardContainer = () =>
  import(/* webpackChunkName: "dashboard" */ './containers/DashboardContainer')
    .then(module => module.default)

export default (store) => ([
  {
    layout: AppLayout,
    path: ROUTE.DASHBOARD_URL,
    component: AsyncComponent(getDashboardContainer)
  }
])
