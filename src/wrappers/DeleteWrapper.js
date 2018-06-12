import { prop, always } from 'ramda'
import { compose, pure, mapPropsStream, createEventHandler } from 'recompose'
import { connect } from 'react-redux'
import { getListParamsFromProps } from '../helpers/get'
import { closeConfirmDialogAction, openConfirmDialogAction } from '../components/ConfirmDialog/actions'
import { openSnackbarAction, DANGER_TYPE } from '../components/Snackbar/actions'

export default ({ action, listAction }) => {
  const mapStateToProps = always({})
  const mapDispatchToProps = {
    action,
    listAction,
    openSnackbarAction,
    closeConfirmDialogAction,
    openConfirmDialogAction,
  }

  return compose(
    connect(mapStateToProps, mapDispatchToProps),
    mapPropsStream(props$ => {
      const { handler: onConfirmRemove, stream: onConfirmRemove$ } = createEventHandler()

      onConfirmRemove$
        .withLatestFrom(props$)
        .subscribe(([item, props]) =>
          props
            .action(prop('id', item))
            .then(() => props.closeConfirmDialogAction())
            .then(() => props.listAction(getListParamsFromProps(props)))
            .catch(() =>
              Promise.resolve()
                .then(() => props.closeConfirmDialogAction())
                .then(() => props.openSnackbarAction({ action: DANGER_TYPE, message: 'Delete failed' }))
            )
        )

      return props$
        .combineLatest(
          props => ({
            ...props,
            remove: {
              openConfirmDialog: item =>
                props.openConfirmDialogAction({ onConfirm: () => onConfirmRemove(item) })
            }
          })
        )
    }),
    pure
  )
}
