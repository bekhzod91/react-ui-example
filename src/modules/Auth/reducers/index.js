import thunkReducer from '../../../helpers/thunkReducer'
import * as STATES from '../../../constants/states'
import * as actionsTypes from '../constants/actionTypes'

export default {
  [STATES.RECOVERY]: thunkReducer(actionsTypes.RECOVERY),
  [STATES.RESET_PASSWORD]: thunkReducer(actionsTypes.RESET_PASSWORD),
  [STATES.TWITTER_REDIRECT]: thunkReducer(actionsTypes.TWITTER_REDIRECT),
  [STATES.SIGN_UP]: thunkReducer(actionsTypes.SIGN_UP),
  [STATES.RESEND_MESSAGE]: thunkReducer(actionsTypes.RESEND_MESSAGE),
  [STATES.SIGN_UP_EMAIL_CONFIRM]: thunkReducer(actionsTypes.SIGN_UP_EMAIL_CONFIRM)
}
