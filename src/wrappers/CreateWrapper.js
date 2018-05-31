import { prop, omit } from 'ramda'
import { connect } from 'react-redux'
import { formValueSelector, stopSubmit } from 'redux-form'
import { compose, pure, mapPropsStream } from 'recompose'
import { addParamsRoute } from '../helpers/route'
import { getListParamsFromProps } from '../helpers/get'
import { mapParamsToRequest } from '../helpers/mapper'
import { getReduxFormError } from '../helpers/validate'
import { openSnackbarAction, DANGER_TYPE, SUCCESS_TYPE } from '../components/Snackbar/actions'
import ModalWrapper from '../wrappers/ModalWrapper'

const key = 'create'
const formValue = 'values'

const CreateWrapper = params => {
  const {
    form,
    fields,
    action,
    mapper = mapParamsToRequest,
    listAction,
    listMapper = getListParamsFromProps
  } = params
  const selector = formValueSelector(form)
  const mapStateToProps = state => ({ [formValue]: selector(state, ...fields) })
  const mapDispatchToProps = { action, listAction, stopSubmit, openSnackbarAction }

  const handlerOnSubmit = (event, props) => {
    event && event.preventDefault()
    const data = prop(formValue, props)

    props.action(mapper(data))
      .then(() => addParamsRoute({ [key]: false }, props.history))
      .then(() => props.openSnackbarAction({ message: 'Successfully saved', action: SUCCESS_TYPE }))
      .then(() => props.listAction(listMapper(props)))
      .catch(error =>
        Promise.resolve()
          .then(() => props.stopSubmit(form, getReduxFormError(error)))
          .then(() => props.openSnackbarAction({ message: 'Save failed', action: DANGER_TYPE }))
      )
  }

  return compose(
    connect(mapStateToProps, mapDispatchToProps),
    ModalWrapper({ key, handlerOnSubmit }),
    mapPropsStream(props$ => props$
      .combineLatest(props => {
        const model = prop(key, props)
        const defaultProps = omit([formValue, key], props)

        return ({
          ...defaultProps,
          [key]: model,
        })
      })
    ),
    pure
  )
}

export default CreateWrapper
