import { path } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import withStyles from 'material-ui/styles/withStyles'
import Dialog, {
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import { closeConfirmDialogAction } from './actions'

const styles = theme => ({
  paper: {
    width: 400
  },
  title: {
    backgroundColor: theme.common.confirmDialog.backgroundColor,
    padding: '12px 24px',
    ' & h2': {
      color: theme.common.confirmDialog.text
    }
  },
  content: {
    padding: '12px 24px'
  },
  confirmButton: {
    backgroundColor: theme.common.confirmDialog.backgroundColor,
    color: theme.common.confirmDialog.text,
    '&:hover': {
      backgroundColor: theme.common.confirmDialog.hover.backgroundColor
    }
  }
})

const enhance = compose(
  connect((state) => ({
    open: path(['confirmDialog', 'open'], state),
    title: path(['confirmDialog', 'title'], state),
    message: path(['confirmDialog', 'message'], state),
    onConfirm: path(['confirmDialog', 'onConfirm'], state)
  }), {
    onClose: closeConfirmDialogAction
  }),
  withStyles(styles)
)

const ConfirmDialog = ({ classes, title, message, open, onConfirm, onClose, ...props }) => (
  <Dialog
    classes={{ paper: classes.paper }}
    open={open}
    message={message}
    onClose={onClose}
    {...props}>
    <DialogTitle className={classes.title}>{title}</DialogTitle>
    <DialogContent className={classes.content}>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={onClose}
        variant="raised">
        Cancel
      </Button>
      <Button
        onClick={onConfirm}
        variant="raised"
        className={classes.confirmButton}>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
)

ConfirmDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
}

export default enhance(ConfirmDialog)
