/*
 * Type
 */
export const SUCCESS_TYPE = `success`
export const INFO_TYPE = `info`
export const WARNING_TYPE = `warning`
export const DANGER_TYPE = `danger`

/*
 * Action types
 */
export const SNACKBAR = 'SNACKBAR'
export const SNACKBAR_OPEN = `${SNACKBAR}_OPEN`
export const SNACKBAR_CLOSE = `${SNACKBAR}_CLOSE`

/*
 * Action creators
 */
export const openSnackbarAction = (payload) => {
  return {
    type: SNACKBAR_OPEN,
    payload
  }
}

export const closeSnackbarAction = () => {
  return {
    type: SNACKBAR_CLOSE
  }
}
