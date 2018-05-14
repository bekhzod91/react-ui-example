import AppLayout from '../../components/Layouts/AppLayout'
import { AsyncComponent } from '../../components/Layouts/RouterLayout'
import * as ROUTES from '../../constants/routes'

const getSettingsContainer = () =>
  import(/* webpackChunkName: "settings" */ './containers/SettingsContainer')
    .then(module => module.default)

export default () => ([
  {
    layout: AppLayout,
    path: ROUTES.COMMON_SETTINGS_URL,
    component: AsyncComponent(getSettingsContainer)
  }
])
