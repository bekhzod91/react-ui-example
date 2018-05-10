import thunkReducer from '../../../helpers/thunkReducer'
import * as STATE from '../../../constants/state'
import * as actionTypes from '../constants/actionTypes'

export default {
  [STATE.SING_IN]: thunkReducer(actionTypes.SIGN_IN),
  [STATE.SIGN_OUT]: thunkReducer(actionTypes.SIGN_OUT),
  [STATE.ME]: thunkReducer(actionTypes.ME),
}
