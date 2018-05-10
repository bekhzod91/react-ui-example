import { concat, prop, slice } from 'ramda'
import createReducer from '../../helpers/createReducer'
import * as actions from './actions'

export const defaultState = {
  loadPage: [],
  loading: false
}

const reducer = () => {
  return createReducer(defaultState, {
    [`${actions.PAGE_LOADING_START}`] (state) {
      const loadPage = concat(prop('loadPage', state), [true])

      return {
        loadPage,
        loading: true
      }
    },

    [`${actions.PAGE_LOADING_FINISH}`] (state) {
      const loadPage = slice(1, Infinity, prop('loadPage', state))

      return {
        loadPage,
        loading: loadPage.length > 0
      }
    }
  })
}

export default reducer
