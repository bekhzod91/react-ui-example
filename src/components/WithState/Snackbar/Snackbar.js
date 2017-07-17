import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import MUISnackbar from 'material-ui/Snackbar'
import {
  SUCCESS_TYPE,
  INFO_TYPE,
  WARNING_TYPE,
  DANGER_TYPE,
  closeSnackbarAction,
} from './actions'
import * as STYLE from '../../../styles/style'

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

const Snackbar = ({ open, message, action, duration, close, ...props }) => (
  <MUISnackbar
    open={open}
    message={message}
    bodyStyle={styles[action]}
    autoHideDuration={duration}
    onRequestClose={() => close()}
    {...props}
  />
)

Snackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.any.isRequired,
  duration: PropTypes.number.isRequired,
  action: PropTypes.oneOf([
    SUCCESS_TYPE, INFO_TYPE, WARNING_TYPE, DANGER_TYPE
  ]).isRequired,
  close: PropTypes.func.isRequired
}

const enhance = compose(
  connect((state) => ({
    open: _.get(state, ['snackbar', 'open']),
    message: _.get(state, ['snackbar', 'message']),
    duration: _.get(state, ['snackbar', 'duration']),
    action: _.get(state, ['snackbar', 'action'])
  }), {
    close: closeSnackbarAction
  })
)

export default enhance(Snackbar)
