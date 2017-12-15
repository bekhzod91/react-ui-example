import { AsyncComponent } from '../../helpers/router'
import AppLayout from '../../layout/AppLayout'
import * as ROUTE from '../../constants/routes'

const getSettingsContainer = () =>
  import(/* webpackChunkName: "settings" */ './containers/SettingsContainer')
    .then(module => module.default)

export default (store) => ([
  {
    layout: AppLayout,
    path: ROUTE.COMMON_SETTINGS_URL,
    component: AsyncComponent(getSettingsContainer)
  }
])
