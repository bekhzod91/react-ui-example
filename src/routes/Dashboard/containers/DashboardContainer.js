import _ from 'lodash'
import { connect } from 'react-redux'
import { appBarMapDispatchToProps, appBarMapStateToProps } from '../../../components/AppBar'

import Dashboard from '../components/Dashboard'

const mapStateToProps = (state, props) => ({
  appBar : appBarMapStateToProps(state, _.get(props, ['params', 'id'])),
})

export default connect(mapStateToProps, appBarMapDispatchToProps)(Dashboard)
