import _ from 'lodash'
import axios from 'axios'
import { API_URL } from '../constants/api'
import { getToken } from './token'

const axiosRequest = (config) => {
  const token = _.get(config, 'token') || getToken()

  axios.defaults.baseURL = API_URL
  axios.defaults.headers.common['Authorization'] = token ? `Token ${token}` : undefined

  return axios
}

export default axiosRequest
