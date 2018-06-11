import createReducer from '../../helpers/createReducer'
import * as actions from './actions'

export const SNACKBAR_STATE = 'snackbar'
export const defaultState = {
  open: false,
  message: 'Message',
  action: actions.INFO_TYPE,
  duration: 3000,
  anchorOrigin: { vertical: 'bottom', horizontal: 'center' }
}

const reducer = () => {
  return createReducer(defaultState, {
    [`${actions.SNACKBAR_OPEN}`] (state, { payload }) {
      return {
        ...defaultState,
        ...payload,
        open: true
      }
    },

    [`${actions.SNACKBAR_CLOSE}`] (state) {
      return {
        ...state,
        open: false
      }
    }
  })
}

export default reducer
