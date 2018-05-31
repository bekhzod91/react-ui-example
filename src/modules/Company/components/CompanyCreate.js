import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { compose, pure } from 'recompose'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import CompanySearchField from '../components/Form/CompanySearchField'
import TextWithClearField from '../../../components/Form/TextWithClearField'

const styles = {
  buttonGroup: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'flex-end',
    '& > button': {
      marginLeft: 10
    }
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  body: {
    width: '700px'
  }
}

export const fields = ['email', 'owner', 'busActivity', 'ecoActivity', 'gcp']
export const form = 'CompanyCreateForm'
export const formConfig = { form, fields }

const enhance = compose(
  reduxForm({ form, enableReinitialize: true }),
  withStyles(styles),
  pure
)

const Transition = props => {
  return <Slide direction="down" {...props} />
}

const CompanyCreate = ({ classes, handleSubmit, ...props }) => (
  <Dialog
    open={props.open}
    TransitionComponent={Transition}
    keepMounted={true}
    classes={{ paper: classes.body }}
    aria-labelledby="create-dialog">
    <form onSubmit={handleSubmit(props.onSubmitModal)}>
      <div className={classes.title}>
        <DialogTitle id="create-dialog">
          Create Dialog
        </DialogTitle>
        <IconButton onClick={props.onCloseModal} >
          <CloseIcon />
        </IconButton>
      </div>

      <DialogContent>

        <Field
          component={TextWithClearField}
          name="email"
          label="Email"
          placeholder="Enter Email"
          fullWidth={true}
          margin="normal"
        />

        <Field
          component={CompanySearchField}
          name="owner"
          label="Owner"
          placeholder="Type owner name or email"
          fullWidth={true}
          margin="normal"
        />
        <Field
          component={TextWithClearField}
          name="busActivity"
          label="busActivity"
          placeholder="Type bus activity"
          fullWidth={true}
          margin="normal"
        />
        <Field
          component={TextWithClearField}
          name="ecoActivity"
          label="ecoActivity"
          placeholder="Type eco activity"
          fullWidth={true}
          margin="normal"
        />
        <Field
          component={TextWithClearField}
          name="gcp"
          label="gcp"
          placeholder="Type gcp"
          fullWidth={true}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="raised"
          type="submit">
          Apply
        </Button>
      </DialogActions>
    </form>
  </Dialog>
)

CompanyCreate.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onSubmitModal: PropTypes.func.isRequired,
}

export default enhance(CompanyCreate)
