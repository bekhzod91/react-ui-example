import { withRouter } from 'react-router'
import { compose, withHandlers } from 'recompose'
import Page404 from '../components/Page404'
import * as ROUTES from '../../../constants/routes'

export default compose(
  withRouter,
  withHandlers({
    onGoHome: ({ history }) => () =>
      history.push(ROUTES.DASHBOARD_URL)
  })
)(Page404)
