import R from 'ramda'
import { compose, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import * as STATE from '../../../constants/state'
import {
  getCompanyListAction,
  getCompanyDetailAction,
  addCompanyAction,
  editCompanyAction,
  deleteCompanyAction
} from '../actions/company'
import Company from '../components/Company'

const mapStateToProps = (state) => {
  return {
    list: R.path([STATE.COMPANY_LIST, 'data'], state),
    listLoading: R.path([STATE.COMPANY_LIST, 'loading'], state),
    detail: R.path([STATE.COMPANY_DETAIL, 'data'], state),
    detailLoading: R.path([STATE.COMPANY_DETAIL, 'loading'], state),
  }
}

const mapDispatchToProps = {
  getCompanyListAction,
  getCompanyDetailAction,
  addCompanyAction,
  editCompanyAction,
  deleteCompanyAction
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream((props$) => {
    const getId = R.pipe(R.path(['params', 'id']), parseInt)
    const getList = R.prop('list')
    const detailWithoutList = R.pipe(
      props => R.and(getId(props), getList(props)),
      R.not
    )

    // Get list
    props$
      .first()
      .filter(detailWithoutList)
      .subscribe(props => props.getCompanyListAction())

    // Get detail
    props$
      .filter(getId)
      .distinctUntilChanged(null, getId)
      .subscribe(props => props.getCompanyDetailAction(getId(props)))

    return props$
  })
)(Company)
