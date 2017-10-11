import R from 'ramda'
import { compose, withHandlers, mapPropsStream } from 'recompose'
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
import { form as filterFormName } from '../components/CompanyListFilter'
import UserIsAuthenticated from '../../../permissions/UserIsAuthenticated'
import {
  getIdFromProps,
  getFormValueFromState,
  getDataFromState
} from '../../../helpers/get'

const mapStateToProps = (state, props) => {
  const id = getIdFromProps(props)
  const filterFormValue = getFormValueFromState(filterFormName, state)

  return {
    list: getDataFromState(STATE.COMPANY_LIST, state),
    detail: { ...getDataFromState(STATE.COMPANY_DETAIL, state), id },
    filterFormValue
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
  }),
  withHandlers({
    filterOnSubmit: props => (event) => {
      event.preventDefault()
      console.log(props.filterFormValue)
    },
    filterOnOpen: props => () => {

    }
  })
)(Company)
