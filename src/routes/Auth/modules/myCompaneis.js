import _ from 'lodash'
import axios from '../../../helpers/axios'
import thunkReducer from '../../../helpers/thunkReducer'

// ------------------------------------
// Constants
// ------------------------------------
export const MY_COMPANIES = 'MY_COMPANIES'

// ------------------------------------
// Actions
// ------------------------------------
export const API_MY_COMPANIES_URL = `/companies/my/`

export const fetchMyCompaniesAction = () => {
  const payload = axios().get(API_MY_COMPANIES_URL)
    .then((response) => _.get(response, 'data'))
    .catch((error) => Promise.reject(_.get(error, ['response', 'data'])))

  return {
    type: MY_COMPANIES,
    payload
  }
}

export const actions = {
  fetchMyCompaniesAction
}

// ------------------------------------
// Reducer
// ------------------------------------
export default thunkReducer(MY_COMPANIES)
