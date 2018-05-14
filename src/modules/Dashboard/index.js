import AppLayout from '../../components/Layouts/AppLayout'
import { AsyncComponent } from '../../components/Layouts/RouterLayout'
import * as ROUTES from '../../constants/routes'

const getDashboardContainer = () =>
  import(/* webpackChunkName: "dashboard" */ './containers/DashboardContainer')
    .then(module => module.default)

export default () => ([
  {
    layout: AppLayout,
    path: ROUTES.DASHBOARD_URL,
    component: AsyncComponent(() => getDashboardContainer())
  }
])
