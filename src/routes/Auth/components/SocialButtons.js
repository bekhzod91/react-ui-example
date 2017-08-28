import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import withStyles from 'material-ui-next/styles/withStyles'
import FaceBookIcon from '../../../components/Icon/FaceBookIcon'
import GooglePlusIcon from '../../../components/Icon/GooglePlusIcon'
import TwitterIcon from '../../../components/Icon/TwitterIcon'
import Button from '../../../components/Button'

const styles = theme => ({
  button: {
    margin: '10px 0',
    color: theme.palette.text.primary
  },
  icon: {
    marginRight: '5px'
  },
  facebookButton: {
    color: theme.app.facebookTextColor,
    backgroundColor: theme.app.facebookColor,
    '&:hover': {
      backgroundColor: `${theme.app.facebookColor}`
    }
  },
  googlePlusButton: {
    color: theme.app.googlePlusTextColor,
    backgroundColor: theme.app.googlePlusColor,
    '&:hover': {
      backgroundColor: `${theme.app.googlePlusColor}`
    }
  },
  twitterButton: {
    color: theme.app.twitterTextColor,
    backgroundColor: theme.app.twitterColor,
    '&:hover': {
      backgroundColor: `${theme.app.twitterColor}`
    }
  },
})

const SocialButtons = ({ classes, buttons }) => (
  <div>
    <Button
      id="facebook"
      fullWidth={true}
      onTouchTap={buttons.facebook.handle}
      className={classNames(classes.button, classes.facebookButton)}>
      <FaceBookIcon className={classes.icon} />{buttons.facebook.label}
    </Button>

    <Button
      id="googleplus"
      fullWidth={true}
      onTouchTap={buttons.google.handle}
      className={classNames(classes.button, classes.googlePlusButton)}>
      <GooglePlusIcon className={classes.icon} /> {buttons.google.label}
    </Button>

    <Button
      id="twitter"
      fullWidth={true}
      onTouchTap={buttons.twitter.handle}
      className={classNames(classes.button, classes.twitterButton)}>
      <TwitterIcon className={classes.icon} /> {buttons.twitter.label}
    </Button>
  </div>
)

SocialButtons.propTypes = {
  classes: PropTypes.object.isRequired,
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

export default withStyles(styles)(SocialButtons)
