import React from 'react'
import PropTypes from 'prop-types'
import FaceBookIcon from '../../../components/FaceBookIcon'
import GooglePlusIcon from '../../../components/GooglePlusIcon'
import TwitterIcon from '../../../components/TwitterIcon'
import RaisedButton from '../../../components/RaisedButton'
import * as STYLE from '../../../styles/style'

const SocialButtons = ({ buttons }) => (
  <div>
    <RaisedButton
      id="facebook"
      label={buttons.facebook.label}
      labelColor={STYLE.SECOND_TEXT_COLOR}
      icon={<FaceBookIcon />}
      fullWidth={true}
      backgroundColor={STYLE.SOCIAL_FACEBOOK_COLOR}
      style={{ margin: '12px 0' }}
      onTouchTap={buttons.facebook.handle}
    />

    <RaisedButton
      id="googleplus"
      label={buttons.google.label}
      labelColor={STYLE.SECOND_TEXT_COLOR}
      icon={<GooglePlusIcon />}
      fullWidth={true}
      backgroundColor={STYLE.SOCIAL_GOOGLEPLUS_COLOR}
      style={{ margin: '12px 0' }}
      onTouchTap={buttons.google.handle}
    />

    <RaisedButton
      id="twitter"
      label={buttons.twitter.label}
      labelColor={STYLE.SECOND_TEXT_COLOR}
      icon={<TwitterIcon />}
      fullWidth={true}
      backgroundColor={STYLE.SOCIAL_TWITTER_COLOR}
      style={{ margin: '12px 0' }}
      onTouchTap={buttons.twitter.handle}
    />
  </div>
)

SocialButtons.propTypes = {
  buttons: PropTypes.shape({
    facebook: PropTypes.shape({
      label: PropTypes.string.isRequired,
      handle: PropTypes.func.isRequired,
    }),
    google: PropTypes.shape({
      label: PropTypes.string.isRequired,
      handle: PropTypes.func.isRequired,
    }),
    twitter: PropTypes.shape({
      label: PropTypes.string.isRequired,
      handle: PropTypes.func.isRequired,
    })
  })
}

export default SocialButtons
