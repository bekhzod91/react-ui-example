import { compose, prop, omit, path } from 'ramda'
import sprintf from 'sprintf'
import { compose as composeR, pure, mapPropsStream, createEventHandler } from 'recompose'
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
import { form as filterFormName } from '../components/CompanyListFilterForm'
import UserIsAuthenticated from '../../../permissions/UserIsAuthenticated'
import {
  getIdFromProps,
  getFormValueFromState,
  getFormValuesLikeParams,
  getInitialFormValuesFromProps,
  getDataFromState,
  getFullPathFromLocation,
  getParamsLikeBooleanFromLocation
} from '../../../helpers/get'

const mapStateToProps = (state, props) => {
  const id = getIdFromProps(props)
  const filterFormValue = getFormValueFromState(filterFormName, state)
  const filterInitialFormValue = getInitialFormValuesFromProps(filterFormName, state, props)

  return {
    list: getDataFromState(STATE.COMPANY_LIST, state),
    detail: { ...getDataFromState(STATE.COMPANY_DETAIL, state), id },
    filterInitialFormValue,
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

export default composeR(
  UserIsAuthenticated,
  connect(mapStateToProps, mapDispatchToProps),
  // List fetch
  mapPropsStream((props$) => {
    const getListRequestFromProps = compose(
      omit(['ids', 'filter']),
      path(['location', 'query'])
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
  // Filter events
  mapPropsStream(props$ => {
    const { handler: onOpenFilter, stream: onOpenFilter$ } = createEventHandler()
    const { handler: onCloseFilter, stream: onCloseFilter$ } = createEventHandler()
    const { handler: onSubmitFilter, stream: onSubmitFilter$ } = createEventHandler()

    onOpenFilter$
      .withLatestFrom(props$)
      .subscribe(([event, { push, location, params }]) => {
        const companyId = parseInt(prop('companyId', params))
        const search = prop('search', location)
        const pathname = sprintf(ROUTE.COMPANY_LIST_PATH, companyId)
        const fullPath = `${pathname}${search}`

        push(appendParamsToUrl({ filter: true }, fullPath))
      })

    onCloseFilter$
      .withLatestFrom(props$)
      .subscribe(([event, { push, location }]) => {
        const fullPath = getFullPathFromLocation(location)

        push(appendParamsToUrl({ filter: false }, fullPath))
      })

    onSubmitFilter$
      .withLatestFrom(props$)
      .subscribe(([event, { push, location, filterFormValue }]) => {
        event && event.preventDefault()

        const fullPath = getFullPathFromLocation(location)
        const params = getFormValuesLikeParams(filterFormValue)

        console.log(filterFormValue, params)

        push(appendParamsToUrl({ ...params, filter: false }, fullPath))
      })

    return props$
      .combineLatest(({ filterInitialFormValue, filterFormValue, ...props }) => {
        const location = prop('location', props)

        return {
          ...props,
          filter: {
            count: 0,
            open: getParamsLikeBooleanFromLocation('filter', location),
            value: filterFormValue,
            initialValues: filterInitialFormValue,
            onSubmitFilter,
            onOpenFilter,
            onCloseFilter
          }
        }
      })
  }),
  pure
)(Company)
