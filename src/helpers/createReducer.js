import { has } from 'ramda'

export default function createReducer (initialState, handlers) {
  return function reducer (state = initialState, action) {
    if (has(action.type, handlers)) {
      return handlers[action.type](state, action)
    }

    return state
  }
}
