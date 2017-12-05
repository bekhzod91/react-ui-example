import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'
import withStyles from 'material-ui/styles/withStyles'
import Button from '../../../components/Button'
import TextField from '../../../components/Form/TextField'
import PasswordViewField from '../../../components/Form/PasswordViewField'
import validate from '../../../helpers/validate'
import * as STYLE from '../../../styles/style'

export const FORM = 'SignUpForm'

const styles = {
  errors: {
    textAlign: 'center',
    color: STYLE.DANGER_COLOR,
  },

  button: {
    marginTop: '40px',
    marginBottom: '10px',
    minHeight: '44px !important'
  },
}

const enhance = compose(
  reduxForm({
    form: FORM
  }),
  withStyles(styles)
)

export const SignIn = ({ classes, error, handleSubmit, ...props }) => (
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

    <Field
      name="firstName"
      component={TextField}
      label="First name"
      placeholder="Enter First name"
      fullWidth={true}
      margin="normal"
    /><br />

    <Field
      name="secondName"
      component={TextField}
      label="Second name"
      placeholder="Enter Second name"
      fullWidth={true}
      margin="normal"
    /><br />

    <Field
      name="password"
      component={PasswordViewField}
      label="Password"
      placeholder="Enter Password"
      fullWidth={true}
      margin="normal"
    /><br />

    <Button
      type="submit"
      color="primary"
      className={classes.button}
      fullWidth={true}>
      Sign Up
    </Button>
  </form>
)

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default enhance(SignIn)
