/*
 * Action types
 */
export const CONFIRM_DIALOG = 'CONFIRM_DIALOG'
export const CONFIRM_DIALOG_OPEN = `${CONFIRM_DIALOG}_OPEN`
export const CONFIRM_DIALOG_CLOSE = `${CONFIRM_DIALOG}_CLOSE`

/*
 * Action creators
 */
export const openConfirmDialogAction = (payload) => {
  return {
    type: CONFIRM_DIALOG_OPEN,
    payload
  }
}

export const closeConfirmDialogAction = () => {
  return {
    type: CONFIRM_DIALOG_CLOSE
  }
}
