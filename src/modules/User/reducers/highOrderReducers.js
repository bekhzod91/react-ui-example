import thunkReducer from '../../../helpers/thunkReducer'
import * as STATES from '../../../constants/states'
import * as actionTypes from '../constants/actionTypes'

export default {
  [STATES.USER_COMPANIES]: thunkReducer(actionTypes.USER_COMPANIES),
  [STATES.PERMISSIONS]: thunkReducer(actionTypes.PERMISSIONS),
}
