import { compose, path, prop } from 'ramda'
import { pure, mapPropsStream, createEventHandler } from 'recompose'
import { connect } from 'react-redux'
import { getListRequestFromProps } from '../helpers/get'
import { closeConfirmDialogAction, openConfirmDialogAction } from '../components/WithState/ConfirmDialog/actions'

export default ({ getIdByItem = prop('id'), deleteAction, getListAction }) => {
  return compose(
    connect(() => ({}), { deleteAction, getListAction, closeConfirmDialogAction, openConfirmDialogAction }),
    // Details
    mapPropsStream(props$ => {
      const { handler: onConfirmRemove, stream: onConfirmRemove$ } = createEventHandler()

      onConfirmRemove$
        .withLatestFrom(props$)
        .subscribe(([item, props]) => {
          const id = getIdByItem(item)
          const companyId = parseInt(path(['params', 'companyId'], props))

          return props
            .deleteAction(id, companyId)
            .then(() => props.closeConfirmDialogAction())
            .then(() => props.getListAction(getListRequestFromProps(props), companyId))
        })

      return props$.combineLatest(props => ({
        ...props,
        remove: {
          openConfirmDialog: (item) => props.openConfirmDialogAction({ onConfirm: () => onConfirmRemove(item) })
        }
      }))
    }),
    pure
  )
}
