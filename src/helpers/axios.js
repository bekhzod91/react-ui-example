import * as R from 'ramda'
import axios from 'axios'
import { browserHistory } from 'react-router'
import { API_URL } from '../constants/api'
import * as ROUTE from '../constants/routes'
import * as STATE from '../constants/state'
import toCamelCase from '../helpers/toCamelCase'

const INTERNAL_ERROR = 500
const CONTENT_TYPE_JSON = 'application/json'

const responseToCamelCase = (data, response) => {
  const responseContentType = R.path(['content-type'], response)

  if (R.equals(CONTENT_TYPE_JSON, responseContentType)) {
    return toCamelCase(JSON.parse(data))
  }

  if (R.is(Object, data) || R.is(Array, data)) {
    return toCamelCase(data)
  }

  return data
}

const apiErrorHandler = (error) => {
  const status = R.path(['response', 'status'], error)

  if (R.equals(INTERNAL_ERROR, status)) {
    browserHistory.push(ROUTE.INTERNAL_SERVER_ERROR)
  }

  return Promise.reject(error)
}

export default ({ getState }) => {
  const state = getState()
  const token = R.path([STATE.SING_IN, 'data', 'token'], state)

  axios.defaults.baseURL = API_URL
  axios.defaults.transformResponse = [responseToCamelCase]

  axios.defaults.headers.common['Authorization'] = token && `Token ${token}`

  axios.interceptors.response.use(response => response, apiErrorHandler)

  return axios
}
