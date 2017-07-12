import _ from 'lodash'
import { compose, withPropsOnChange } from 'recompose'
import { connect } from 'react-redux'
import Companies from '../components/Companies'
import * as STATE from '../../../constants/state'
import { fetchMyCompaniesAction } from '../actions/companeis'

const mapStateToProps = (state) => ({
  loading: (
    _.get(state, [STATE.USER_COMPANIES, 'loading']) &&
    !(_.get(state, [STATE.USER_COMPANIES, 'success']) || _.get(state, [STATE.USER_COMPANIES, 'failed']))
  ),
  list: _.get(state, [STATE.USER_COMPANIES, 'data']) || []
})

const mapDispatchToProps = {
  fetchMyCompaniesAction
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPropsOnChange(['loading'], (props) => {
    console.log(props)
    !props.loading && props.fetchMyCompaniesAction()
  })
)(Companies)
