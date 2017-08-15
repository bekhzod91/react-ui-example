import thunkReducer from '../../../helpers/thunkReducer'
import * as STATE from '../../../constants/state'
import * as actionTypes from '../constants/actionTypes'

export default {
  [STATE.SING_IN]: thunkReducer(actionTypes.SIGN_IN),
}
