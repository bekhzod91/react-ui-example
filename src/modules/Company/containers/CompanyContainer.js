import * as R from 'ramda'
import { Observable } from 'rxjs'
import sprintf from 'sprintf'
import { pure, compose, withHandlers, mapPropsStream, createEventHandler } from 'recompose'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as STATE from '../../../constants/state'
import * as ROUTE from '../../../constants/routes'
import { appendParamsToUrl } from '../../../helpers/urls'
import {
  getCompanyListAction,
  getCompanyDetailAction,
  addCompanyAction,
  editCompanyAction,
  deleteCompanyAction
} from '../actions/company'
import Company from '../components/Company'
import { TABLE_QUERY_KEY } from '../../../components/Table/TableDialog'
import { form as filterFormName } from '../components/CompanyListFilter'
import UserIsAuthenticated from '../../../permissions/UserIsAuthenticated'
import {
  getIdFromProps,
  getFormValueFromState,
  getDataFromState,
  getFullPathFromLocation
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
  mapPropsStream(props$ => {
    const { handler: onSubmitFilter, stream:  onSubmitFilter$ } = createEventHandler()

    Observable
      .zip(onSubmitFilter$, props$)
      .subscribe(([ event, props ]) => {
        event && event.preventDefault()
        console.log(props)
      })

    return props$.combineLatest(props => ({ ...props, onSubmitFilter }))
  }),
  withHandlers({
    onOpenFilter: ({ push, location: { search }, params: { companyId } }) => () => {
      const pathname = sprintf(ROUTE.COMPANY_LIST_PATH, parseInt(companyId))
      const fullPath = `${pathname}${search}`
      return push(appendParamsToUrl({ [TABLE_QUERY_KEY]: 'filter' }, fullPath))
    },
    onCloseFilter: ({ push, location }) => () => {
      const fullPath = getFullPathFromLocation(location)
      return push(appendParamsToUrl({ [TABLE_QUERY_KEY]: '' }, fullPath))
    }
  }),
  pure
)(Company)
