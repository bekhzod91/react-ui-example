import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Page404 from '../components/Page404'

export default connect(null, { push })(Page404)
