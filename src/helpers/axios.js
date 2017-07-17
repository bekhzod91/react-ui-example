import _ from 'lodash'
import defaultAxios from 'axios'
import { browserHistory } from 'react-router'
import { API_URL } from '../constants/api'
import * as ROUTE from '../constants/routes'
import * as STATE from '../constants/state'
import toCamelCase from '../helpers/toCamelCase'

export default ({ getState }) => {
  const state = getState()
  const token = _.get(state, [STATE.SING_IN, 'data', 'token'])

  const axios = defaultAxios.create({
    baseURL: API_URL,
    transformResponse: [(data, response) => {
      console.log(data)
      if (response['content-type'] === 'application/json') {
        return toCamelCase(JSON.parse(data))
      }

      return data
    }]
  })

  axios.defaults.headers.common['Authorization'] = token && `Token ${token}`

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = _.get(error, ['response', 'status'])

      if (status === 500) {
        browserHistory.push(ROUTE.INTERNAL_SERVER_ERROR)
      }

      return Promise.reject(error)
    })

  return axios
}
