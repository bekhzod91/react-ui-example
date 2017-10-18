import * as API from '../constants/api'

export const fbLoginURL = () => {
  return `https://www.facebook.com/${API.FACEBOOK_API_VERSION}/dialog/oauth?` +
            `client_id=${API.FACEBOOK_API_APP_ID}` +
            `&response_type=code` +
            `&redirect_uri=${API.FACEBOOK_API_REDIRECT_URL}` +
            `&scope=email`
}
