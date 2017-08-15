import thunkReducer from '../../../helpers/thunkReducer'
import * as STATE from '../../../constants/state'
import * as actionTypes from '../constants/actionTypes'

export default {
  [STATE.USER_COMPANIES]: thunkReducer(actionTypes.USER_COMPANIES),
  [STATE.USER_PROFILE]: thunkReducer(actionTypes.USER_PROFILE),
  [STATE.USER_PERMISSION]: thunkReducer(actionTypes.USER_PERMISSION),
}
