import * as R from 'ramda'
import { compose, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import * as STATE from '../../../constants/state'
import { fetchMyCompaniesAction } from '../actions/myCompanies'

const mapStateToProps = (state, props) => {
  const companyId = R.path(['params', 'companyId'], props)
  const getCompanyLoading = R.path([STATE.USER_COMPANIES, 'loading'])
  const getCompanyList = R.pathOr([], [STATE.USER_COMPANIES, 'data'])
  const getCompanyNameOr = R.curry((defaultName, state) =>
    R.compose(
      R.propOr(defaultName, 'name'),
      R.head,
      R.filter(R.whereEq({ id: parseInt(companyId) })),
      getCompanyList,
    )(state)
  )

  return {
    loading: getCompanyLoading(state),
    companyName: getCompanyNameOr('Unknown', state),
    list: getCompanyList(state)
  }
}

const mapDispatchToProps = {
  fetchMyCompaniesAction
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream(props$ => {
    props$
      .filter(R.prop('token'))
      .filter(R.path(['params', 'companyId']))
      .distinctUntilChanged(null, R.path(['params', 'companyId']))
      .subscribe(props => props.fetchMyCompaniesAction())

    return props$
  })
)
