import { compose, prop } from 'ramda'
import { pure, mapPropsStream, createEventHandler } from 'recompose'
import { connect } from 'react-redux'
import { stopSubmit } from 'redux-form'
import {
  getFullPathFromRoute,
  getFullPathWithCompanyId,
  getListRequestFromProps,
  getParamsLikeBooleanFromLocation,
} from '../helpers/get'
import { appendParamsToUrl } from '../helpers/urls'
import { getReduxFormError } from '../helpers/validate'
import { openSnackbarAction, DANGER_TYPE, SUCCESS_TYPE } from '../components/WithState/Snackbar/actions'
import { getFormValueFromState, serializer as defaultSerializer } from '../helpers/form'

export default ({ listUrl, createAction, getListAction, formName, formSerializer }) => {
  const serializer = formSerializer || defaultSerializer

  const mapStateToProps = (state) => ({
    createFormValue: getFormValueFromState(formName, state)
  })

  return compose(
    connect(mapStateToProps, { createAction, getListAction, stopSubmit, openSnackbarAction }),
    mapPropsStream(props$ => {
      const { handler: onOpenCreate, stream: onOpenCreate$ } = createEventHandler()
      const { handler: onCloseCreate, stream: onCloseCreate$ } = createEventHandler()
      const { handler: onSubmitCreate, stream: onSubmitCreate$ } = createEventHandler()

      onOpenCreate$
        .withLatestFrom(props$)
        .subscribe(([event, { route }]) => {
          const push = prop('push', route)
          const fullPath = getFullPathWithCompanyId(listUrl, route)

          push(appendParamsToUrl({ filter: false, create: true }, fullPath))
        })

      onCloseCreate$
        .withLatestFrom(props$)
        .subscribe(([event, { route }]) => {
          const push = prop('push', route)
          const fullPath = getFullPathFromRoute(route)

          push(appendParamsToUrl({ create: false }, fullPath))
        })

      onSubmitCreate$
        .withLatestFrom(props$)
        .subscribe(([event, { route, createFormValue, ...props }]) => {
          const push = prop('push', route)
          const companyId = prop('companyId', route)
          const data = serializer(createFormValue)
          const fullPath = getFullPathFromRoute(route)

          props.createAction(data, companyId)
            .then(() => push(appendParamsToUrl({ create: false }, fullPath)))
            .then(() => props.openSnackbarAction({ message: 'Successfully saved', action: SUCCESS_TYPE }))
            .then(() => props.getListAction(getListRequestFromProps(props), companyId))
            .catch(error => Promise.resolve()
              .then(() => props.stopSubmit(formName, getReduxFormError(error)))
              .then(() => props.openSnackbarAction({ message: 'Save failed', action: DANGER_TYPE }))
            )
        })

      return props$
        .combineLatest(({ ...props }) => {
          const location = prop('location', props)

          return {
            ...props,
            create: {
              open: getParamsLikeBooleanFromLocation('create', location),
              onSubmitCreate,
              onOpenCreate,
              onCloseCreate
            }
          }
        })
    }),
    pure
  )
}
