import thunkReducer from '../../../helpers/thunkReducer'
import * as STATE from '../../../constants/state'
import * as actionTypes from '../constants/actionTypes'

export default {
  [STATE.COMPANY_LIST]: thunkReducer(actionTypes.COMPANY_LIST),
  [STATE.COMPANY_DETAIL]: thunkReducer(actionTypes.COMPANY_DETAIL),
  [STATE.COMPANY_EDIT]: thunkReducer(actionTypes.COMPANY_EDIT),
  [STATE.COMPANY_DELETE]: thunkReducer(actionTypes.COMPANY_DELETE),
}
