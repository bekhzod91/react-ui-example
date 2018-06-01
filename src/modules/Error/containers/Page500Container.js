import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { compose, withHandlers } from 'recompose'
import Page500 from '../components/Page500'
import * as ROUTES from '../../../constants/routes'

export default compose(
  connect(null, { push }),
  withHandlers({
    onGoHome: ({ push }) => () => {
      return push(ROUTES.DASHBOARD_URL)
    }
  })
)(Page500)
