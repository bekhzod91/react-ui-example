import _ from 'lodash'
import { compose, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import * as STATE from '../../../constants/state'
import { fetchMyCompaniesAction } from '../actions/companeis'

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
      .filter(props => props.token)
      .filter(props => _.get(props, ['params', 'id']))
      .distinctUntilChanged(null, (props) => _.get(props, ['params', 'id']))
      .subscribe(props => props.fetchMyCompaniesAction())

    return props$
  })
)
