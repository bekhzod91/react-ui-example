import React from 'react'
import PropTypes from 'prop-types'
import FaceBookIcon from '../../../components/FaceBookIcon'
import GooglePlusIcon from '../../../components/GooglePlusIcon'
import TwitterIcon from '../../../components/TwitterIcon'
import RaisedButton from '../../../components/RaisedButton'
import * as STYLE from '../../../styles/style'

const SignInSocialButtons = ({ handleSocialSignIn }) => (
  <div>
    <RaisedButton
      id="facebook"
      label="Sign In with FaceBook"
      labelColor={STYLE.SECOND_TEXT_COLOR}
      icon={<FaceBookIcon />}
      fullWidth={true}
      backgroundColor={STYLE.SOCIAL_FACEBOOK_COLOR}
      style={{ margin: '12px 0' }}
      onTouchTap={handleSocialSignIn.handleFacebookSignIn}
    />

    <RaisedButton
      id="googleplus"
      label="Sign In with FaceBook"
      labelColor={STYLE.SECOND_TEXT_COLOR}
      icon={<GooglePlusIcon />}
      fullWidth={true}
      backgroundColor={STYLE.SOCIAL_GOOGLEPLUS_COLOR}
      style={{ margin: '12px 0' }}
      onTouchTap={handleSocialSignIn.handleGooglePlusSignIn}
    />

    <RaisedButton
      id="twitter"
      label="Sign In with Twitter"
      labelColor={STYLE.SECOND_TEXT_COLOR}
      icon={<TwitterIcon />}
      fullWidth={true}
      backgroundColor={STYLE.SOCIAL_TWITTER_COLOR}
      style={{ margin: '12px 0' }}
      onTouchTap={handleSocialSignIn.handleFacebookSignIn}
    />
  </div>
)

SignInSocialButtons.propTypes = {
  handleSocialSignIn: PropTypes.shape({
    handleFacebookSignIn: PropTypes.func.isRequired,
    handleGooglePlusSignIn: PropTypes.func.isRequired,
    handleTwitterSignIn: PropTypes.func.isRequired,
  })
}

export default SignInSocialButtons
