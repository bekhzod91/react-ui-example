import thunkReducer from '../../../helpers/thunkReducer'
import * as STATE from '../../../constants/state'
import * as actionsTypes from '../constants/actionTypes'

export default {
  [STATE.USER_COMPANIES]: thunkReducer(actionsTypes.USER_COMPANIES),
}
