import createReducer from '../../helpers/createReducer'
import * as actions from './actions'

export const CONFIRM_DIALOG_STATE = 'confirmDialog'
export const defaultState = {
  open: false,
  title: 'Delete confirmation',
  message: 'Are you sure to delete this item?',
  onConfirm: () => {}
}

const reducer = () => {
  return createReducer(defaultState, {
    [`${actions.CONFIRM_DIALOG_OPEN}`] (state, { payload }) {
      return {
        ...state,
        ...payload,
        open: true
      }
    },

    [`${actions.CONFIRM_DIALOG_CLOSE}`] (state) {
      return {
        ...state,
        open: false
      }
    }
  })
}

export default reducer
