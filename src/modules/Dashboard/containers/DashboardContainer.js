import { compose } from 'recompose'
import Dashboard from '../components/Dashboard'
import UserIsAuthenticated from '../../../permissions/UserIsAuthenticated'

export default compose(UserIsAuthenticated)(Dashboard)
