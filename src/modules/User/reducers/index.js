import thunkReducer from '../../../helpers/thunkReducer'
import * as STATE from '../../../constants/state'
import * as actionTypes from '../constants/actionTypes'

export default {
  [STATE.USER_COMPANIES]: thunkReducer(actionTypes.USER_COMPANIES),
  [STATE.USER_LIST]: thunkReducer(actionTypes.USER_LIST),
  [STATE.USER_DETAIL]: thunkReducer(actionTypes.USER_DETAIL),
  [STATE.USER_EDIT]: thunkReducer(actionTypes.USER_EDIT),
  [STATE.USER_DELETE]: thunkReducer(actionTypes.USER_DELETE),
}
