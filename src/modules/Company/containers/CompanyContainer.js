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
  connect(mapStateToProps, mapDispatchToProps),
  mapPropsStream((props$) => {
    const getId = R.pipe(R.path(['params', 'id']), parseInt)

    // Get list
    props$
      .first()
      .subscribe(props => props.getCompanyListAction())

    // Get detail
    props$
      .filter(getId)
      .distinctUntilChanged(null, getId)
      .subscribe(props => props.getCompanyDetailAction(getId(props)))

    return props$
  })
)(Company)
