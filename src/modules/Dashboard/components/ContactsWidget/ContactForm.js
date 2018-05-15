import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import withStyles from '@material-ui/core/styles/withStyles'
import Avatar from '@material-ui/core/Avatar'
import { Field, reduxForm } from 'redux-form'
import Slide from '@material-ui/core/Slide'
import Close from 'material-ui-icons/Close'
import PhotoCamera from 'material-ui-icons/PhotoCamera'
import TextField from '../../../../components/Form/TextField'

const styles = theme => ({
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
    backgroundColor: theme.red.bgColor,
    color: theme.common.text.white,
    float: 'left',
    '&:hover': {
      backgroundColor: theme.red.hoverBg
    }
  },
  submit: {
    marginLeft: 8
  }
})

const Transition = props => {
  return <Slide direction="up" {...props} />
}

export const form = 'ContactAddForm'

const ContactForm = ({ classes, open, close }) => {
  return (
    <Dialog open={open} onRequestClose={close} transition={Transition} >
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
                variant="raised"
                className={classes.delete}>
                Delete
              </Button>

              <Button variant="raised" onClick={close}>
                Cancel
              </Button>

              <Button
                type="submit"
                variant="raised"
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

ContactForm.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default compose(
  reduxForm({ form }),
  withStyles(styles)
)(ContactForm)
