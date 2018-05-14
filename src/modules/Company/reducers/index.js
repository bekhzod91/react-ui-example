import thunkReducer from '../../../helpers/thunkReducer'
import * as STATES from '../../../constants/states'
import * as actionTypes from '../constants/actionTypes'

export default {
  [STATES.COMPANY_LIST]: thunkReducer(actionTypes.COMPANY_LIST),
  [STATES.COMPANY_DETAIL]: thunkReducer(actionTypes.COMPANY_DETAIL),
  [STATES.COMPANY_EDIT]: thunkReducer(actionTypes.COMPANY_EDIT),
  [STATES.COMPANY_DELETE]: thunkReducer(actionTypes.COMPANY_DELETE),
}
