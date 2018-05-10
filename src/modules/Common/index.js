import AppLayout from '../../components/Layouts/AppLayout'
import { AsyncComponent } from '../../components/Layouts/RouterLayout'
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
