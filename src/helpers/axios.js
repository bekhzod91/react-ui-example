import axios from 'axios'
import { push } from 'react-router-redux'
import { path, is, equals, curry, prop, compose } from 'ramda'
import { API_URL } from '../constants/api'
import * as ROUTES from '../constants/routes'
import * as STATES from '../constants/states'
import { openSnackbarAction, DANGER_TYPE } from '../components/Snackbar/actions'
import toCamelCase from '../helpers/toCamelCase'

const INTERNAL_ERROR = 500
const CONTENT_TYPE_JSON = 'application/json'

const responseToCamelCase = (data, response) => {
  const responseContentType = path(['content-type'], response)

  if (equals(CONTENT_TYPE_JSON, responseContentType)) {
    return toCamelCase(JSON.parse(data))
  }

  if (is(Object, data) || is(Array, data)) {
    return toCamelCase(data)
  }

  return data
}

const errorInterceptors = curry((dispatch, error) => {
  const message = prop('message', error)
  const status = path(['response', 'status'], error)

  if (equals(INTERNAL_ERROR, status)) {
    const redirect = dispatch(push)
    return redirect(ROUTES.INTERNAL_SERVER_ERROR_URL)
  }

  if (equals('Network Error', message)) {
    const action = {
      action: DANGER_TYPE,
      message: 'Network connection error',
      anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
    }
    return dispatch(openSnackbarAction(action))
  }

  return Promise.reject(error)
})

export const getPayloadFromSuccess = prop('data')
export const getPayloadFromError = compose(
  data => Promise.reject(data),
  path(['response', 'data'])
)

export default ({ getState, dispatch }) => {
  const state = getState()
  const token = path([STATES.SING_IN, 'data', 'token'], state)

  axios.defaults.baseURL = API_URL
  axios.defaults.transformResponse = [responseToCamelCase]

  axios.defaults.headers.common['Authorization'] = token && `Token ${token}`

  axios.interceptors.response.use(
    response => response,
    errorInterceptors(dispatch)
  )

  return axios
}
