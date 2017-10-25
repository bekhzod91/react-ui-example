import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { compose, withHandlers } from 'recompose'
import * as ROUTE from '../../../constants/routes'
import Page404 from '../components/Page404'

export default compose(
  connect(null, { push }),
  withHandlers({
    onGoHome: ({ push }) => () => {
      return push(ROUTE.COMPANY_MY_LIST_URL)
    }
  })
)(Page404)
