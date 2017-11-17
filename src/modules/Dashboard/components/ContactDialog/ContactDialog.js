import React from 'react'
import PropTypes from 'prop-types'
import Dialog, { DialogTitle } from 'material-ui-next/Dialog'
import IconButton from 'material-ui-next/IconButton'
import Close from 'material-ui-icons/Close'
import withStyles from 'material-ui-next/styles/withStyles'

const styles = theme => ({
  dialogHeader: {
    backgroundColor: theme.palette.primary[400],
    '& h2, & svg': {
      color: `${theme.contacts.textColor} !important`
    }
  }
})

const AddContactDialog = ({ classes, open, close }) => {
  return (
    <Dialog open={open} onRequestClose={close}>
      <div className={classes.dialogHeader}>
        <DialogTitle>Add new contact</DialogTitle>
        <IconButton onClick={close}>
          <Close />
        </IconButton>
      </div>
    </Dialog>
  )
}

AddContactDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.bool.isRequired
}

export default withStyles(styles)(AddContactDialog)
