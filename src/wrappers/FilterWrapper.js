import { prop, omit } from 'ramda'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { compose, pure, mapPropsStream } from 'recompose'
import { addParamsRoute } from '../helpers/route'
import { getFormInitValueFromHistory } from '../helpers/form'
import { getParamsCountFromHistory } from '../helpers/get'
import { encodeURLParams } from '../helpers/mapper'
import ModalWrapper from '../wrappers/ModalWrapper'

const key = 'filter'
const formValue = 'values'

const FilterWrapper = params => {
  const { form, fields } = params

  if (!form) console.error('Params form required for FilterWrapper')
  if (!fields) console.error('Params fields required for FilterWrapper')

  const selector = formValueSelector(form)
  const mapStateToProps = state => ({ [formValue]: selector(state, ...fields) })
  const handlerOnSubmit = (event, props) => {
    const value = prop(formValue, props)
    const params = encodeURLParams(value)

    addParamsRoute({ ...params, [key]: false }, history)
  }

  return compose(
    connect(mapStateToProps),
    ModalWrapper({ key, handlerOnSubmit }),
    mapPropsStream(props$ => props$
      .combineLatest(props => {
        const model = prop(key, props)
        const defaultProps = omit([formValue, key], props)

        return ({
          ...defaultProps,
          [key]: {
            ...model,
            count: getParamsCountFromHistory(fields, props.history),
            initialValues: getFormInitValueFromHistory(fields, props.history),
          }
        })
      })
    ),
    pure
  )
}

export default FilterWrapper
