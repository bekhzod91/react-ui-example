import { compose, curry, filter, prop, propOr, path, pathOr, head, whereEq } from 'ramda'
import { compose as flow, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import * as STATE from '../../../constants/state'
import { fetchMyCompaniesAction } from '../actions/myCompanies'

const mapStateToProps = (state, props) => {
  const companyId = path(['params', 'companyId'], props)
  const getCompanyLoading = path([STATE.USER_COMPANIES, 'loading'])
  const getCompanyList = pathOr([], [STATE.USER_COMPANIES, 'data'])
  const getCompanyNameOr = curry((defaultName, state) =>
    compose(
      propOr(defaultName, 'name'),
      head,
      filter(whereEq({ id: parseInt(companyId) })),
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

export default flow(
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream(props$ => {
    props$
      .filter(prop('token'))
      .filter(path(['params', 'companyId']))
      .distinctUntilChanged(null, path(['params', 'companyId']))
      .subscribe(props => props.fetchMyCompaniesAction())

    return props$
  })
)
