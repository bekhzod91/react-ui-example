import _ from 'lodash'
import * as actions from './actions'
import createReducer from '../../../helpers/createReducer'

export const defaultState = {
  loadPage: [],
  loading: false
}

const reducer = () => {
  return createReducer(defaultState, {
    [`${actions.PAGE_LOADING_START}`] (state) {
      const loadPage = _.concat(_.get(state, 'loadPage'), true)

      return {
        loadPage,
        loading: true
      }
    },

    [`${actions.PAGE_LOADING_FINISH}`] (state) {
      const loadPage = _.slice(_.get(state, 'loadPage'), 1)

      return {
        loadPage,
        loading: loadPage.length > 0
      }
    }
  })
}

export default reducer
