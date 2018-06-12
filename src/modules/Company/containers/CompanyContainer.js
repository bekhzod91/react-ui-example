import { withRouter } from 'react-router-dom'
import { pure } from 'recompose'
import { compose } from 'ramda'
import * as STATES from '../../../constants/states'
import FilterWrapper from '../../../wrappers/FilterWrapper'
import ListWrapper from '../../../wrappers/ListWrapper'
import DetailWrapper from '../../../wrappers/DetailWrapper'
import CreateWrapper from '../../../wrappers/CreateWrapper'
import EditWrapper from '../../../wrappers/EditWrapper'
import DeleteWrapper from '../../../wrappers/DeleteWrapper'
import {
  getCompanyListAction,
  getCompanyDetailAction,
  addCompanyAction,
  editCompanyAction,
  deleteCompanyAction,
} from '../actions/company'
import CompanyList from '../components/CompanyList'
import { formConfig as filterFormConfig } from '../components/CompanyFilterForm'
import { formConfig } from '../components/CompanyForm'
import UserIsAuthenticated from '../../../permissions/UserIsAuthenticated'

export default compose(
  UserIsAuthenticated,
  withRouter,
  FilterWrapper(filterFormConfig),
  ListWrapper({ stateName: STATES.COMPANY_LIST, action: getCompanyListAction }),
  DetailWrapper({ stateName: STATES.COMPANY_DETAIL, action: getCompanyDetailAction }),
  CreateWrapper({ ...formConfig, action: addCompanyAction, listAction: getCompanyListAction }),
  EditWrapper({
    ...formConfig,
    stateName: STATES.COMPANY_DETAIL,
    action: editCompanyAction,
    listAction: getCompanyListAction
  }),
  DeleteWrapper({ action: deleteCompanyAction, listAction: getCompanyListAction }),
  pure
)(CompanyList)
