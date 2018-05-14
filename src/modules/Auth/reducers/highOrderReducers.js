import thunkReducer from '../../../helpers/thunkReducer'
import * as STATES from '../../../constants/states'
import * as actionTypes from '../constants/actionTypes'

export default {
  [STATES.SING_IN]: thunkReducer(actionTypes.SIGN_IN),
  [STATES.SIGN_OUT]: thunkReducer(actionTypes.SIGN_OUT),
  [STATES.ME]: thunkReducer(actionTypes.ME),
}
