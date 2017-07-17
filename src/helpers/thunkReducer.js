import createReducer from './createReducer'

export const initialState = {
  data: null,
  error: null,
  loading: false,
  success: false,
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
        data: action.payload,
        error: null,
        success: true,
        loading: false,
        failed: false
      }
    },
    [`${actionName}_REJECTED`] (state, action) {
      return {
        ...state,
        data: null,
        error: action.payload,
        loading: false,
        success: false,
        failed: true
      }
    },
    [`${actionName}_CLEAR`] () {
      return initialState
    }
  })
}

export default createThunkReducer
