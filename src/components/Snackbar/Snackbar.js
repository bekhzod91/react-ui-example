import { prop } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import MUISnackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import withStyles from '@material-ui/core/styles/withStyles'
import { closeSnackbarAction, SUCCESS_TYPE, INFO_TYPE, WARNING_TYPE, DANGER_TYPE } from './actions'

const styles = theme => ({
  info: {
    background: theme.components.snackbar.info
  },
  warning: {
    background: theme.components.snackbar.warning
  },
  success: {
    background: theme.components.snackbar.success
  },
  danger: {
    background: theme.components.snackbar.danger
  }
})

const mapStateToProps = state => ({ state: prop('snackbar', state) })
const mapDispatchToProps = { onClose: closeSnackbarAction }

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)

const Snackbar = ({ classes, state, ...props }) => {
  return (
    <MUISnackbar
      anchorOrigin={state.anchorOrigin}
      open={state.open}
      autoHideDuration={state.duration}
      onExit={props.onClose}
      {...props}>
      <SnackbarContent
        classes={{ root: classes[state.action] }}
        message={state.message}
      />
    </MUISnackbar>
  )
}

Snackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  state: PropTypes.shape({
    anchorOrigin: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    message: PropTypes.any.isRequired,
    duration: PropTypes.number.isRequired,
    action: PropTypes.oneOf([
      SUCCESS_TYPE, INFO_TYPE, WARNING_TYPE, DANGER_TYPE
    ]).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired
}

export default enhance(Snackbar)
