import { withRouter } from 'react-router-dom'
import { pure } from 'recompose'
import { compose } from 'ramda'
import * as STATES from '../../../constants/states'
import FilterWrapper from '../../../wrappers/FilterWrapper'
import ListWrapper from '../../../wrappers/ListWrapper'
import DetailWrapper from '../../../wrappers/DetailWrapper'
import CreateWrapper from '../../../wrappers/CreateWrapper'
import {
  getCompanyListAction,
  getCompanyDetailAction,
  addCompanyAction,
} from '../actions/company'
import CompanyList from '../components/CompanyList'
import { formConfig as filterFormConfig } from '../components/CompanyFilterForm'
import { formConfig as createFormConfig } from '../components/CompanyCreate'
import UserIsAuthenticated from '../../../permissions/UserIsAuthenticated'

export default compose(
  UserIsAuthenticated,
  withRouter,
  FilterWrapper(filterFormConfig),
  ListWrapper({ stateName: STATES.COMPANY_LIST, action: getCompanyListAction }),
  DetailWrapper({ stateName: STATES.COMPANY_DETAIL, action: getCompanyDetailAction }),
  CreateWrapper({ ...createFormConfig, action: addCompanyAction, listAction: getCompanyListAction }),
  pure
)(CompanyList)
