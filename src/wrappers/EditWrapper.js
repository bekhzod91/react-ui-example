import { compose, prop, omit } from 'ramda'
import { pure, mapPropsStream } from 'recompose'
import { connect } from 'react-redux'
import { formValueSelector, stopSubmit } from 'redux-form'
import { getReduxFormError } from '../helpers/validate'
import { getDataFromState, getIdFromProps, getListParamsFromProps } from '../helpers/get'
import { mapParamsToRequest } from '../helpers/mapper'
import { openSnackbarAction, DANGER_TYPE, SUCCESS_TYPE } from '../components/Snackbar/actions'
import ModalWrapper from './ModalWrapper'

const key = 'edit'
const formValue = 'values'

const EditWrapper = params => {
  const {
    form,
    fields,
    action,
    stateName,
    mapper = mapParamsToRequest,
    initialMapper = prop('data'),
    listAction,
    listMapper = getListParamsFromProps,
    detailAction
  } = params
  const selector = formValueSelector(form)
  const mapStateToProps = state => ({
    [formValue]: selector(state, ...fields),
    item: getDataFromState(stateName, state)
  })
  const mapDispatchToProps = { action, listAction, detailAction, stopSubmit, openSnackbarAction }

  const handlerOnSubmit = (event, props) => {
    event && event.preventDefault()
    const id = getIdFromProps(props)
    const data = prop(formValue, props)

    props.action(mapper(data), id)
      .then(() => props.openSnackbarAction({ message: 'Successfully saved', action: SUCCESS_TYPE }))
      .then(() => Promise.all([
        props.listAction(listMapper(props)),
        props.detailAction(id)
      ]))
      .catch(error => Promise.resolve()
        .then(() => props.stopSubmit(form, getReduxFormError(error)))
        .then(() => props.openSnackbarAction({ message: 'Save failed', action: DANGER_TYPE }))
      )
  }

  return compose(
    connect(mapStateToProps, mapDispatchToProps),
    ModalWrapper({ key, handlerOnSubmit }),
    mapPropsStream(props$ => {
      return props$
        .combineLatest(props => {
          const model = prop(key, props)
          const item = prop('item', props)
          const defaultProps = omit([formValue, key], props)

          return ({
            ...defaultProps,
            [key]: {
              ...model,
              initialValues: initialMapper(item, props)
            },
          })
        })
    }),
    pure
  )
}

export default EditWrapper
