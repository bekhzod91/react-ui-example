import * as API from '../constants/api'

export const googleLoginURL = () => {
  return `https://accounts.google.com/o/oauth2/auth?` +
  `redirect_uri=${API.GOOGLE_API_REDIRECT_URL}&response_type=code` +
  `&client_id=${API.GOOGLE_API_CLIENT_ID}` +
  `&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile` +
  `&approval_prompt=force` +
  `&access_type=offline`
}
