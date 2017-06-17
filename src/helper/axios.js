import _ from 'lodash'
import axios from 'axios'
import { API_URL } from '../constants'

const axiosRequest = (config) => {
  const token = _.get(config, 'token') || null
  const TOKEN = token

  axios.defaults.baseURL = API_URL
  axios.defaults.headers.common['Authorization'] = TOKEN ? `Token ${TOKEN}` : undefined

  return axios
}

export default axiosRequest
