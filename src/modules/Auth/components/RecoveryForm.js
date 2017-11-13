import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'
import withStyles from 'material-ui/styles/withStyles'
import TextField from '../../../components/Form/SimpleFields/TextField'
import Button from '../../../components/Button'
import validate from '../../../helpers/validate'

export const FORM = 'RecoverForm'

const styles = theme => ({
  errors: {
    textAlign: 'center',
    color: theme.palette.error['A200'],
  },

  button: {
    marginTop: '40px',
    marginBottom: '10px',
    minHeight: '44px',
  }
})

const enhance = compose(
  reduxForm({
    form: FORM
  }),
  withStyles(styles)
)

const RecoverForm = ({ classes, error, handleSubmit, ...props }) => (
  <form onSubmit={handleSubmit(() => props.onSubmit().catch(validate))}>
    {error && <div className={classes.errors}>{error}</div>}

    <Field
      name="email"
      component={TextField}
      label="Email"
      placeholder="Enter Email"
      fullWidth={true}
      margin="normal"
    /><br />

    <Button
      type="submit"
      color="primary"
      className={classes.button}
      fullWidth={true}>
      Reset
    </Button>
  </form>
)

RecoverForm.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default enhance(RecoverForm)
