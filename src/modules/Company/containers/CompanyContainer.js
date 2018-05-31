import { withRouter } from 'react-router-dom'
import { pure } from 'recompose'
import { compose } from 'ramda'
import * as STATES from '../../../constants/states'
import FilterWrapper from '../../../wrappers/FilterWrapper'
import ListWrapper from '../../../wrappers/ListWrapper'
import DetailWrapper from '../../../wrappers/DetailWrapper'
import {
  getCompanyListAction,
  getCompanyDetailAction,
  addCompanyAction,
  editCompanyAction,
  deleteCompanyAction
} from '../actions/company'
import CompanyList from '../components/CompanyList'
import { form as filterFormName, fields as filterFormFields } from '../components/CompanyFilterForm'
import UserIsAuthenticated from '../../../permissions/UserIsAuthenticated'

const mapDispatchToProps = {
  getCompanyListAction,
  getCompanyDetailAction,
  addCompanyAction,
  editCompanyAction,
  deleteCompanyAction
}

export default compose(
  UserIsAuthenticated,
  withRouter,
  FilterWrapper({ formName: filterFormName, fields: filterFormFields }),
  ListWrapper({ stateName: STATES.COMPANY_LIST, action: getCompanyListAction }),
  DetailWrapper({ stateName: STATES.COMPANY_DETAIL, action: getCompanyDetailAction }),
  pure
)(CompanyList)
