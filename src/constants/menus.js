import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard'
import GroupIcon from '@material-ui/icons/Group'
import * as ROUTES from './routes'

export default [
  {
    name: ROUTES.DASHBOARD,
    url: ROUTES.DASHBOARD_PATH,
    title: 'Dashboard',
    icon: (<DashboardIcon />)
  },
  {
    name: ROUTES.COMPANY,
    url: ROUTES.COMPANY_LIST_PATH,
    title: 'Company',
    icon: (<GroupIcon />)
  },
]
