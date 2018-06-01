import { compose, pure, mapPropsStream, createEventHandler } from 'recompose'
import { replaceParamsRoute } from '../helpers/route'
import { getBooleanFromHistory } from '../helpers/get'

const ModalWrapper = ({ key, handlerOnSubmit }) =>
  compose(
    mapPropsStream(props$ => {
      const { handler: onOpenModal, stream: onOpenModal$ } = createEventHandler()
      const { handler: onCloseModal, stream: onCloseModal$ } = createEventHandler()
      const { handler: onSubmitModal, stream: onSubmitModal$ } = createEventHandler()

      onOpenModal$
        .withLatestFrom(props$)
        .subscribe(([, { history }]) => {
          replaceParamsRoute({ [key]: true }, history)
        })

      onCloseModal$
        .withLatestFrom(props$)
        .subscribe(([, { history }]) =>
          replaceParamsRoute({ [key]: false }, history)
        )

      onSubmitModal$
        .withLatestFrom(props$)
        .subscribe(([event, props]) => {
          event && event.preventDefault()
          handlerOnSubmit(event, props)
        })

      return props$
        .combineLatest(props => ({
          ...props,
          [key]: {
            onOpenModal,
            onCloseModal,
            onSubmitModal,
            open: getBooleanFromHistory(key, props.history),
          }
        }))
    }),
    pure
  )

export default ModalWrapper
