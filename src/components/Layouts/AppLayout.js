import { compose } from 'recompose'
import BaseLayout from '../Layouts/BaseLayout'
import AuthWrapper from '../../modules/Auth/wrappers/AuthWrapper'
import PermissionWrapper from '../../modules/User/wrappers/PermissionWrapper'

const AppLayout = compose(
  AuthWrapper,
  PermissionWrapper
)(BaseLayout)

export default AppLayout
