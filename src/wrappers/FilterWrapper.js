import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { compose, pure, mapPropsStream, createEventHandler } from 'recompose'
import { addParamsRoute } from '../helpers/route'
import { getFormInitValueFromHistory } from '../helpers/form'
import { getParamsCountFromHistory, getBooleanFromHistory } from '../helpers/get'
import { encodeURLParams } from '../helpers/mapper'

export default params => {
  const { formName, fields } = params
  const selector = formValueSelector(formName)
  const mapStateToProps = state => ({ filterValue: selector(state, ...fields) })

  return compose(
    connect(mapStateToProps),
    mapPropsStream(props$ => {
      const { handler: onOpenFilter, stream: onOpenFilter$ } = createEventHandler()
      const { handler: onCloseFilter, stream: onCloseFilter$ } = createEventHandler()
      const { handler: onSubmitFilter, stream: onSubmitFilter$ } = createEventHandler()

      onOpenFilter$
        .withLatestFrom(props$)
        .subscribe(([, { history }]) =>
          addParamsRoute({ filter: true }, history)
        )

      onCloseFilter$
        .withLatestFrom(props$)
        .subscribe(([, { history }]) =>
          addParamsRoute({ filter: false }, history)
        )

      onSubmitFilter$
        .withLatestFrom(props$)
        .subscribe(([event, { history, filterValue }]) => {
          event && event.preventDefault()
          const params = encodeURLParams(filterValue)

          addParamsRoute({ ...params, filter: false }, history)
        })

      return props$
        .combineLatest(({ filterValue, ...props }) => ({
          ...props,
          filter: {
            onSubmitFilter,
            onOpenFilter,
            onCloseFilter,
            values: filterValue,
            open: getBooleanFromHistory('filter', props.history),
            count: getParamsCountFromHistory(fields, props.history),
            initialValues: getFormInitValueFromHistory(fields, props.history)
          }
        }))
    }),
    pure
  )
}
