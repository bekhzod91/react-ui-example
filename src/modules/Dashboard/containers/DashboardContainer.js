import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import UserIsAuthenticated from '../../../permissions/UserIsAuthenticated'

export default compose(
  UserIsAuthenticated,
  withRouter
)(Dashboard)
