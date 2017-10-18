import * as R from 'ramda'
import { compose, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import * as STATE from '../../../constants/state'
import { fetchMyCompaniesAction } from '../actions/myCompanies'

const mapStateToProps = (state, props) => {
  const companyId = R.path(['params', 'companyId'], props)
  const company = R.pipe(
      R.path([STATE.USER_COMPANIES, 'data']),
      R.filter(R.whereEq({ id: parseInt(companyId) })),
      R.head
    )

  return {
    loading: R.path(state, [STATE.USER_COMPANIES, 'loading']),
    companyName: R.prop('name', company) || '',
    list: R.pathOr([], [STATE.USER_COMPANIES, 'data'], state)
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
      .filter(props => R.path(['params', 'companyId'], props))
      .distinctUntilChanged(null, (props) => R.path(['params', 'companyId'], props))
      .subscribe(props => props.fetchMyCompaniesAction())

    return props$
  })
)
