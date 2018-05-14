import thunkReducer from '../../../helpers/thunkReducer'
import * as STATES from '../../../constants/states'
import * as actionTypes from '../constants/actionTypes'

export default {
  [STATES.USER_COMPANIES]: thunkReducer(actionTypes.USER_COMPANIES),
  [STATES.USER_LIST]: thunkReducer(actionTypes.USER_LIST),
  [STATES.USER_DETAIL]: thunkReducer(actionTypes.USER_DETAIL),
  [STATES.USER_EDIT]: thunkReducer(actionTypes.USER_EDIT),
  [STATES.USER_DELETE]: thunkReducer(actionTypes.USER_DELETE),
}
