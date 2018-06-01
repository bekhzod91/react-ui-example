import { injectReducers } from '../../store/reducers'
import * as ROUTES from '../../constants/routes'
import AppLayout from '../../components/Layouts/AppLayout'
import { AsyncComponent } from '../../components/Layouts/RouterLayout'

const getCompanyContainer = store =>
  import(/* webpackChunkName: "company" */ './reducers')
    .then(module => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "company" */ './containers/CompanyContainer'))
    .then(module => module.default)

export default (store) => ([
  {
    layout: AppLayout,
    exact: true,
    path: [
      ROUTES.COMPANY_LIST_PATH,
      ROUTES.COMPANY_DETAIL_PATH,
      ROUTES.COMPANY_DETAIL_TAB_PATH
    ],
    component: AsyncComponent(() => getCompanyContainer(store)),
  }
])
