import thunkReducer from '../../../helpers/thunkReducer'
import * as STATE from '../../../constants/state'
import * as globalActionsTypes from '../../../constants/actionTypes'
import * as actionsTypes from '../constants/actionTypes'

export default {
  [STATE.RECOVERY]: thunkReducer(actionsTypes.RECOVERY),
  [STATE.RESET_PASSWORD]: thunkReducer(actionsTypes.RESET_PASSWORD),
  [STATE.SING_IN]: thunkReducer(globalActionsTypes.SIGN_IN),
  [STATE.TWITTER_REDIRECT]: thunkReducer(actionsTypes.TWITTER_REDIRECT),
  [STATE.SIGN_UP]: thunkReducer(actionsTypes.SIGN_UP),
  [STATE.RESEND_MESSAGE]: thunkReducer(actionsTypes.RESEND_MESSAGE),
  [STATE.SIGN_UP_EMAIL_CONFIRM]: thunkReducer(actionsTypes.SIGN_UP_EMAIL_CONFIRM)
}
