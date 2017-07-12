/*
 * Action types
 */
export const PAGE_LOADING = 'PAGE_LOADING'
export const PAGE_LOADING_START = `${PAGE_LOADING}_START`
export const PAGE_LOADING_FINISH = `${PAGE_LOADING}_FINISH`

/*
 * Action creators
 */
export const startLoadingAction = () => {
  return {
    type: PAGE_LOADING_START
  }
}

export const finishLoadingAction = () => {
  return {
    type: PAGE_LOADING_FINISH
  }
}
