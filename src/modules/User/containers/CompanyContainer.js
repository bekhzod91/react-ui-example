import _ from 'lodash'
import { compose, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import * as STATE from '../../../constants/state'
import { fetchMyCompaniesAction } from '../actions/myCompanies'

const mapStateToProps = (state, props) => {
  const companyId = _.get(props, ['params', 'companyId'])
  const company = _
    .chain(state)
    .get([STATE.USER_COMPANIES, 'data'])
    .filter((item) => item.id === _.toInteger(companyId))
    .first()
    .value()

  return {
    loading: _.get(state, [STATE.USER_COMPANIES, 'loading']),
    companyName: _.get(company, 'name') || '',
    list: _.get(state, [STATE.USER_COMPANIES, 'data']) || []
  }
}

const mapDispatchToProps = {
  fetchMyCompaniesAction
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream((props$) => {
    props$
      .filter(props => props.token)
      .filter(props => _.get(props, ['params', 'companyId']))
      .distinctUntilChanged(null, (props) => _.get(props, ['params', 'companyId']))
      .subscribe(props => props.fetchMyCompaniesAction())

    return props$
  })
)
