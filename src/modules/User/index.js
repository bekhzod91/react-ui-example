import { AsyncComponent } from '../../components/Layouts/RouterLayout'
import AppLayout from '../../components/Layouts/AppLayout'
import * as ROUTE from '../../constants/routes'

const getCompaniesContainer = () =>
  import(/* webpackChunkName: "user" */ './containers/CompaniesContainer')
    .then(module => module.default)

export default (store) => ([
  {
    layout: AppLayout,
    exact: true,
    path: ROUTE.COMPANY_MY_LIST_URL,
    component: AsyncComponent(() => getCompaniesContainer)
  }
])
