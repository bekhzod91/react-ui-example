import * as actions from './actions'
import createReducer from '../../../helpers/createReducer'

export const defaultState = {
  loading: false,
}

const reducer = () => {
  return createReducer(defaultState, {
    [`${actions.PAGE_LOADING_START}`] () {
      return { loading: true }
    },

    [`${actions.PAGE_LOADING_FINISH}`] () {
      return { loading: false }
    }
  })
}

export default reducer
