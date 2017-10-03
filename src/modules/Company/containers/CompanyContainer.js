import R from 'ramda'
import { compose, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as STATE from '../../../constants/state'
import {
  getCompanyListAction,
  getCompanyDetailAction,
  addCompanyAction,
  editCompanyAction,
  deleteCompanyAction
} from '../actions/company'
import Company from '../components/Company'
import UserIsAuthenticated from '../../../permissions/UserIsAuthenticated'

const mapStateToProps = (state, props) => {
  const detailId = R.pipe(
    R.path(['params', 'id']),
    parseInt
  )(props)

  return {
    list: {
      loading: R.path([STATE.COMPANY_LIST, 'loading'], state),
      data: R.path([STATE.COMPANY_LIST, 'data'], state)
    },
    detail: {
      id: detailId,
      loading: R.path([STATE.COMPANY_DETAIL, 'loading'], state),
      data: R.path([STATE.COMPANY_DETAIL, 'data'], state),
    }
  }
}

const mapDispatchToProps = {
  getCompanyListAction,
  getCompanyDetailAction,
  addCompanyAction,
  editCompanyAction,
  deleteCompanyAction,
  push
}

export default compose(
  UserIsAuthenticated,
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream((props$) => {
    const getIdFromProps = R.pipe(R.path(['params', 'id']), parseInt)
    const getListRequestFromProps = R.pipe(
      R.path(['location', 'query']),
      R.omit(['ids'])
    )

    // Get list
    props$
      .distinctUntilChanged(null, props => JSON.stringify(getListRequestFromProps(props)))
      .subscribe(props => props.getCompanyListAction(getListRequestFromProps(props)))

    // Get detail
    props$
      .filter(getIdFromProps)
      .distinctUntilChanged(null, getIdFromProps)
      .subscribe(props => props.getCompanyDetailAction(getIdFromProps(props)))

    return props$
  })
)(Company)
