import _ from 'lodash'
import axios from 'axios'
import { browserHistory } from 'react-router'
import { API_URL } from '../constants/api'
import * as ROUTE from '../constants/routes'
import toCamelCase from '../helpers/toCamelCase'
import { getToken } from './token'

const axiosRequest = (config) => {
  const token = _.get(config, 'token') || getToken()

  const axiosInstance = axios.create({
    baseURL: API_URL,
    transformResponse: [(data) => {
      try {
        return toCamelCase(JSON.parse(data))
      } catch (e) {
        return data
      }
    }]
  })

  axiosInstance.defaults.headers.common['Authorization'] = token ? `Token ${token}` : undefined

  axiosInstance.interceptors.response.use((response) => {
    return response
  }, (error) => {
    console.log(error.response)
    if (error.response.status === 500) {
      browserHistory.push(ROUTE.INTERNAL_SERVER_ERROR)
    }

    return Promise.reject(error)
  })

  return axiosInstance
}

export default axiosRequest
