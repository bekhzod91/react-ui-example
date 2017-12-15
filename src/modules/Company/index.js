import React from 'react'
import { Switch } from 'react-router'
import { injectReducers } from '../../reducers'
import { AsyncComponent, RouteWithLayout } from '../../helpers/router'
import AppLayout from '../../layout/AppLayout'
import * as ROUTE from '../../constants/routes'

const getCompanyContainer = (store) =>
  import(/* webpackChunkName: "user" */ './reducers')
    .then((module) => injectReducers(store, module.default))
    .then(() => import(/* webpackChunkName: "user" */ './containers/CompanyContainer'))
    .then(module => module.default)

export default (store) => ([
  {
    layout: AppLayout,
    path: ROUTE.COMPANY_LIST_URL,
    exact: true,
    component: AsyncComponent(() => getCompanyContainer(store)),
  },
  {
    layout: AppLayout,
    path: ROUTE.COMPANY_DETAIL_URL,
    component: AsyncComponent(() => getCompanyContainer(store))
  }
])
