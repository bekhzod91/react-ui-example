import _ from 'lodash'
import axios from '../../../helpers/axios'
import thunkReducer from '../../../helpers/thunkReducer'
import { signUpSerializer } from '../serializers/SignUpSerializer'

// ------------------------------------
// Action signUp
// ------------------------------------
export const SIGN_UP = 'SIGN_UP'
export const SIGN_UP_STATE_NAME = 'signUp'
export const API_SIGN_UP_URL = `/user/register/`

export const signUpAction = (formValues) => {
  console.log(formValues)
  const data = signUpSerializer(formValues)
  const payload = axios().post(API_SIGN_UP_URL, data)
    .then((response) => _.get(response, 'data'))
    .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

  return {
    type: SIGN_UP,
    payload
  }
}

export const actions = {
  signUpAction,
}

// ------------------------------------
// Reducer
// ------------------------------------
export const signUpReducer = thunkReducer(SIGN_UP)
