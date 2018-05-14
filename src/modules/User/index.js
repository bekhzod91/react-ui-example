import { AsyncComponent } from '../../components/Layouts/RouterLayout'
import AppLayout from '../../components/Layouts/AppLayout'
import * as ROUTES from '../../constants/routes'

const getCompaniesContainer = () =>
  import(/* webpackChunkName: "user" */ './containers/CompaniesContainer')
    .then(module => module.default)

export default () => ([
  {
    layout: AppLayout,
    exact: true,
    path: ROUTES.COMPANY_MY_LIST_URL,
    component: AsyncComponent(() => getCompaniesContainer)
  }
])
