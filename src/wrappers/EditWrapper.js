import { compose, prop, path } from 'ramda'
import { pure, mapPropsStream, createEventHandler } from 'recompose'
import { connect } from 'react-redux'
import { stopSubmit } from 'redux-form'
import {
  getFullPathWithCompanyId,
  getListRequestFromProps,
} from '../helpers/get'
import { getReduxFormError } from '../helpers/validate'
import { getFormValueFromState, serializer as defaultSerializer } from '../helpers/form'
import { openSnackbarAction, DANGER_TYPE, SUCCESS_TYPE } from '../components/Snackbar/actions'

export default ({ listUrl, formName, formSerializer, editAction, getListAction, getDetailAction }) => {
  const serializer = formSerializer || defaultSerializer

  const mapStateToProps = (state) => ({
    editFormValue: getFormValueFromState(formName, state)
  })

  return compose(
    connect(mapStateToProps, { editAction, getListAction, getDetailAction, stopSubmit, openSnackbarAction }),
    // Details
    mapPropsStream(props$ => {
      const { handler: onCloseEdit, stream: onCloseEdit$ } = createEventHandler()
      const { handler: onSubmitEdit, stream: onSubmitEdit$ } = createEventHandler()

      onCloseEdit$
        .withLatestFrom(props$)
        .subscribe(([event, { route }]) => {
          const fullPath = getFullPathWithCompanyId(listUrl, route)

          route.push(fullPath)
        })

      onSubmitEdit$
        .withLatestFrom(props$)
        .subscribe(([event, { route, editFormValue, ...props }]) => {
          const companyId = prop('companyId', route)
          const id = parseInt(path(['params', 'id'], route))
          const data = serializer(editFormValue)

          props.editAction(data, id, companyId)
            .then(() => props.openSnackbarAction({ message: 'Successfully saved', action: SUCCESS_TYPE }))
            .then(() => Promise.all([
              props.getListAction(getListRequestFromProps(props), companyId),
              props.getDetailAction(id, companyId)
            ]))
            .catch(error => Promise.resolve()
              .then(() => props.stopSubmit(formName, getReduxFormError(error)))
              .then(() => props.openSnackbarAction({ message: 'Save failed', action: DANGER_TYPE }))
            )
        })

      return props$.combineLatest(({ detail, ...props }) => {
        return {
          ...props,
          detail: {
            ...detail,
            onSubmitEdit,
            onCloseEdit,
            formValues: props.editFormValue,
          }
        }
      })
    }),
    pure
  )
}
