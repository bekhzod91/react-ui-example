import { withRouter } from 'react-router'
import { compose, withHandlers } from 'recompose'
import Page500 from '../components/Page500'
import * as ROUTES from '../../../constants/routes'

export default compose(
  withRouter,
  withHandlers({
    onGoHome: ({ history }) => () =>
      history.push(ROUTES.DASHBOARD_URL)
  })
)(Page500)
