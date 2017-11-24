import React from 'react'
import DashboardIcon from 'material-ui-icons/Dashboard'
import SettingsIcon from 'material-ui-icons/Settings'
import DomainIcon from 'material-ui-icons/Domain'
import DirectionsCarIcon from 'material-ui-icons/DirectionsCar'
import * as ROUTE from './routes'
import * as PERMISSION from './permissions'

export default [
  {
    name: ROUTE.DASHBOARD,
    url: ROUTE.DASHBOARD_PATH,
    title: 'Dashboard',
    icon: (<DashboardIcon />)
  },
  {
    name: ROUTE.COMMON_SETTINGS,
    url: ROUTE.COMMON_SETTINGS_PATH,
    title: 'Settings',
    icon: (<SettingsIcon />),
    children: [
      {
        name: ROUTE.COMPANY,
        url: ROUTE.COMPANY_LIST_PATH,
        permission: PERMISSION.COMPANY_VIEW,
        title: 'Company',
        icon: (<DomainIcon />)
      },
      {
        name: 'bus1',
        url: '/c/%d/app-views/car',
        title: 'Directions Card',
        icon: (<DirectionsCarIcon />)
      }
    ]
  }
]
