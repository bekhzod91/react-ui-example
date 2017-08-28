import _ from 'lodash'
import { connect } from 'react-redux'
import { getAppBarState } from '../../../components/AppBar'

import Dashboard from '../components/Dashboard'

const mapStateToProps = (state, props) => ({
  appBar : getAppBarState(state, _.get(props, ['params', 'id']))
})

export default connect(mapStateToProps)(Dashboard)
