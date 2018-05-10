import createReducer from '../../helpers/createReducer'
import * as actions from './actions'

export const defaultState = {
  open: false,
  message: 'Message',
  action: actions.INFO_TYPE,
  duration: 3000
}

const reducer = () => {
  return createReducer(defaultState, {
    [`${actions.SNACKBAR_OPEN}`] (state, { payload }) {
      return {
        ...state,
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
