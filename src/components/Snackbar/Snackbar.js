import { path, pathOr } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import MUISnackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import withStyles from '@material-ui/core/styles/withStyles'
import * as STYLE from '../../styles/style'
import { closeSnackbarAction, SUCCESS_TYPE, INFO_TYPE, WARNING_TYPE, DANGER_TYPE } from './actions'

const styles = {
  info: {
    background: STYLE.INFO_COLOR
  },
  warning: {
    background: STYLE.WARNING_COLOR
  },
  success: {
    background: STYLE.SUCCESS_COLOR
  },
  danger: {
    background: STYLE.DANGER_COLOR
  }
}

const Snackbar = ({ classes, open, message, action, duration, close, ...props }) => {
  return (
    <MUISnackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={open}
      autoHideDuration={duration}
      onExit={() => close()}
      {...props}>
      <SnackbarContent classes={{ root: classes[action] }} message={message} />
    </MUISnackbar>
  )
}

Snackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  message: PropTypes.any.isRequired,
  duration: PropTypes.number.isRequired,
  action: PropTypes.oneOf([
    SUCCESS_TYPE, INFO_TYPE, WARNING_TYPE, DANGER_TYPE
  ]).isRequired,
  close: PropTypes.func.isRequired
}

const enhance = compose(
  withStyles(styles),
  connect((state) => ({
    open: path(['snackbar', 'open'], state),
    message: path(['snackbar', 'message'], state),
    duration: path(['snackbar', 'duration'], state),
    action: pathOr(INFO_TYPE, ['snackbar', 'action'], state)
  }), {
    close: closeSnackbarAction
  })
)

export default enhance(Snackbar)
