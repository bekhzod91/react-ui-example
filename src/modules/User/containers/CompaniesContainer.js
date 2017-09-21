import _ from 'lodash'
import { compose, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import Companies from '../components/Companies'
import * as STATE from '../../../constants/state'
import { fetchMyCompaniesAction } from '../actions/myCompanies'

const mapStateToProps = (state) => ({
  loading: _.get(state, [STATE.USER_COMPANIES, 'loading']),
  list: _.get(state, [STATE.USER_COMPANIES, 'data']) || []
})

const mapDispatchToProps = {
  fetchMyCompaniesAction
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream((props$) => {
    props$
      .first()
      .subscribe(props => props.fetchMyCompaniesAction())

    return props$
  })
)(Companies)
