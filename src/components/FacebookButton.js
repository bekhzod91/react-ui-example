/* global FB */
import React from 'react'
import PropTypes from 'prop-types'
import FaceBookIcon from './FaceBookIcon'
import RaisedButton from './RaisedButton'
import * as STYLE from '../styles/style'

const FacebookButton = ({ fbLoading, fbLoad, onLoad, onError, ...defaultProps }) => {
  return (
    <RaisedButton
      id="facebook"
      label={!fbLoading ? 'Sign In with FaceBook' : 'Loading'}
      labelColor={STYLE.SECOND_TEXT_COLOR}
      icon={<FaceBookIcon />}
      fullWidth={true}
      backgroundColor={STYLE.SOCIAL_FACEBOOK_COLOR}
      style={{ margin: '12px 0' }}
      {...defaultProps}
      onTouchTap={() => fbLoad().then(() => onLoad(FB)).catch((error) => onError(error))}
    />
  )
}

FacebookButton.propTypes = {
  fbLoading: PropTypes.bool.isRequired,
  fbLoad: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
}

export default FacebookButton
