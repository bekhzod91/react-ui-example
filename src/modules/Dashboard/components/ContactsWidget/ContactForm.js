import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Close from 'material-ui-icons/Close'
import withStyles from 'material-ui/styles/withStyles'
import Avatar from 'material-ui/Avatar'
import PhotoCamera from 'material-ui-icons/PhotoCamera'
import { Field, reduxForm } from 'redux-form'
import TextField from '../../../../components/Form/SimpleFields/TextField'

const styles = theme => ({
  dialog: {
    width: 600
  },
  dialogHeader: {
    backgroundColor: theme.palette.primary[400],
    '& h2, & svg': {
      color: `${theme.contacts.textColor} !important`
    }
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  fileUpload: {
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'column',
    paddingBottom: 50,
    '& label': {
      cursor: 'pointer',
      display: 'inline-block',
      '&:hover svg': {
        display: 'initial'
      }
    },
    '& svg': {
      width: 44,
      height: 44,
      backgroundColor: 'rgba(0,0,0,.36)',
      padding: 10,
      borderRadius: '50%',
      display: 'none'
    },
    '& input': {
      display: 'none'
    }
  },
  avatar: {
    width: 135,
    height: 135,
    backgroundColor: 'rgba(255, 255, 255,.1)',
    border: '3px solid rgba(255,255,255,.4)'
  },
  paper: {
    background: 'red'
  },
  actions: {
    textAlign: 'right',
    marginTop: 40
  },
  delete: {
    float: 'left'
  },
  submit: {
    marginLeft: 8
  }
})

export const form = 'ContactAddForm'

const AddContactDialog = ({ classes, open, close }) => {
  return (
    <Dialog open={open} onRequestClose={close} >
      <div className={classes.dialog} >
        <div className={classes.dialogHeader}>
          <DialogTitle>Add new contact</DialogTitle>
          <IconButton onClick={close} classes={{ root: classes.closeButton }} >
            <Close />
          </IconButton>
          <div className={classes.fileUpload} >
            <label htmlFor="file-input">
              <Avatar className={classes.avatar}>
                <PhotoCamera />
              </Avatar>
            </label>
            <input type="file" id="file-input" />
          </div>
        </div>
        <DialogContent>
          <form>
            <Field
              component={TextField}
              name="firstName"
              label="First name"
              placeholder="Enter first name"
              fullWidth={true}
              margin="normal"
            />
            <Field
              component={TextField}
              name="secondName"
              label="Second name"
              placeholder="Enter second name"
              fullWidth={true}
              margin="normal"
            />
            <Field
              component={TextField}
              name="email"
              label="Email"
              placeholder="Enter Email"
              fullWidth={true}
              margin="normal"
            />

            <div className={classes.actions}>
              <Button
                raised={true}
                color="accent"
                className={classes.delete}>
                Delete
              </Button>
              <Button>Cancel</Button>
              <Button
                type="submit"
                raised={true}
                color="primary"
                className={classes.submit}>
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </div>
    </Dialog>
  )
}

AddContactDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.bool.isRequired
}

export default compose(
  reduxForm({ form }),
  withStyles(styles)
)(AddContactDialog)
