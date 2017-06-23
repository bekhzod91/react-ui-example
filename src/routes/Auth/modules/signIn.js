import _ from 'lodash'
import axios from '../../../helpers/axios'
import thunkReducer from '../../../helpers/thunkReducer'
import { signInSerializer } from '../serializers/SignInSerializer'

// ------------------------------------
// Constants
// ------------------------------------
export const SING_IN_STATE_NAME = 'signIn'
export const SIGN_IN = 'SIGN_IN'

// ------------------------------------
// Actions
// ------------------------------------
export const API_SIGN_IN_URL = `/user/auth/`

export const singInAction = (formValues) => {
  const data = signInSerializer(formValues)
  const payload = axios().post(API_SIGN_IN_URL, data)
    .then((response) => _.get(response, 'data'))
    .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

  return {
    type: SIGN_IN,
    payload
  }
}

export const actions = {
  singInAction
}

// ------------------------------------
// Reducer
// ------------------------------------
export default thunkReducer(SIGN_IN)
