import { compose, prop, path } from 'ramda'
import { pure, mapPropsStream, createEventHandler } from 'recompose'
import { connect } from 'react-redux'
import { stopSubmit } from 'redux-form'
import { getReduxFormError } from '../helpers/validate'
import { getFormValueFromState } from '../helpers/form'
import { getListParamsFromProps } from '../helpers/get'
import { addParamsRoute } from '../helpers/route'
import { mapParamsToRequest } from '../helpers/mapper'
import { openSnackbarAction, DANGER_TYPE, SUCCESS_TYPE } from '../components/Snackbar/actions'

const key = 'edit'

export default ({ listUrl, formName, mapper = mapParamsToRequest, editAction, getListAction, getDetailAction }) => {
  const mapStateToProps = state => ({
    editFormValue: getFormValueFromState(formName, state)
  })
  const mapDispatchToProps = { editAction, getListAction, getDetailAction, stopSubmit, openSnackbarAction }

  return compose(
    connect(mapStateToProps, mapDispatchToProps),
    mapPropsStream(props$ => {
      const { handler: onCloseEdit, stream: onCloseEdit$ } = createEventHandler()
      const { handler: onSubmitEdit, stream: onSubmitEdit$ } = createEventHandler()

      onCloseEdit$
        .withLatestFrom(props$)
        .subscribe(([, { history }]) =>
          addParamsRoute({ [key]: false }, history)
        )

      onSubmitEdit$
        .withLatestFrom(props$)
        .subscribe(([event, { route, editFormValue, ...props }]) => {
          const companyId = prop('companyId', route)
          const id = parseInt(path(['params', 'id'], route))
          const data = mapper(editFormValue)

          props.editAction(data, id, companyId)
            .then(() => props.openSnackbarAction({ message: 'Successfully saved', action: SUCCESS_TYPE }))
            .then(() => Promise.all([
              props.getListAction(getListParamsFromProps(props), companyId),
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
