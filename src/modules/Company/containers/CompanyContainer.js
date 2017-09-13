import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import toInteger from 'lodash/fp/toInteger'
import React from 'react'
import { Link, withRouter } from 'react-router'
import { compose, mapPropsStream, lifecycle } from 'recompose'
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
    list: get([STATE.COMPANY_LIST, 'data'], state),
    listLoading: get([STATE.COMPANY_LIST, 'loading'], state),
    detail: get([STATE.COMPANY_DETAIL, 'data'], state),
    detailLoading: get([STATE.COMPANY_DETAIL, 'loading'], state),
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
    const getId = flow(get(['params', 'id']), toInteger)
    const getList = flow()

    // Get list
    props$
      .first()
      .filter(props => !(getId(props) && get('list', props)))
      .subscribe(props => props.getCompanyListAction())

    // Get detail
    props$
      .filter((props) => getId(props))
      .distinctUntilChanged(null, (props) => getId(props))
      .subscribe(props => props.getCompanyDetailAction(getId(props)))

    return props$
  })
)(Company)
