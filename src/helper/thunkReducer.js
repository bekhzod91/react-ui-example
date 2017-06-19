import createReducer from './createReducer'
import toCamelCase from './toCamelCase'

export const initialState = {
  data: null,
  error: null,
  loading: false,
  failed: false
}

const createThunkReducer = (actionName) => {
  return createReducer(initialState, {
    [`${actionName}_PENDING`] (state, action) {
      return {
        ...state,
        loading: true
      }
    },
    [`${actionName}_FULFILLED`] (state, action) {
      return {
        ...state,
        data: toCamelCase(action.payload),
        error: null,
        loading: false,
        failed: false
      }
    },
    [`${actionName}_REJECTED`] (state, action) {
      return {
        ...state,
        data: null,
        error: toCamelCase(action.payload),
        loading: false,
        failed: true
      }
    },
    [`${actionName}_CLEAR`] () {
      return initialState
    }
  })
}

export default createThunkReducer
