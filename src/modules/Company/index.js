import { injectReducers } from '../../store/reducers'
import * as ROUTES from '../../constants/routes'
import AppLayout from '../../components/Layouts/AppLayout'
import { AsyncComponent } from '../../components/Layouts/RouterLayout'

const getCompanyContainer = store =>
  import(/* webpackChunkName: "user" */ './reducers')
    .then(module => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "user" */ './containers/CompanyContainer'))
    .then(module => module.default)

export default (store) => ([
  {
    layout: AppLayout,
    exact: true,
    path: [ROUTES.COMPANY_LIST_URL, ROUTES.COMPANY_DETAIL_URL],
    component: AsyncComponent(() => getCompanyContainer(store)),
  }
])
