import React from 'react'
import PropTypes from 'prop-types'
import FacebookSDK from '../../../components/FacebookSDK'
import FacebookButton from '../../../components/FacebookButton'
import GooglePlusIcon from '../../../components/GooglePlusIcon'
import TwitterIcon from '../../../components/TwitterIcon'
import RaisedButton from '../../../components/RaisedButton'
import * as STYLE from '../../../styles/style'

const SignInSocialButtons = ({ handleSocialSignIn }) => (
  <div>
    <FacebookSDK>
      <FacebookButton />
    </FacebookSDK>

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
      onTouchTap={handleSocialSignIn.handleTwitterSignIn}
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
