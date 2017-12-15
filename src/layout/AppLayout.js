import { compose as flow } from 'recompose'
import BaseLayout from '../components/Layouts/BaseLayout'
import AuthWrapperContainer from '../modules/Auth/containers/AuthWrapperContainer'
import CompanyContainer from '../modules/User/containers/CompanyContainer'
import PermissionContainer from '../modules/User/containers/PermissionContainer'

const AppLayout = flow(
  AuthWrapperContainer,
  CompanyContainer,
  PermissionContainer
)(BaseLayout)

export default AppLayout
