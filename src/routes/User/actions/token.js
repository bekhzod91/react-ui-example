import { SIGN_IN } from '../../../constants/actionTypes'

// ------------------------------------
// Action setToken
// ------------------------------------
export const setTokenAction = (data) => {
  return {
    type: `${SIGN_IN}_FULFILLED`,
    payload: { token: data }
  }
}

export const actions = {
  setTokenAction
}
