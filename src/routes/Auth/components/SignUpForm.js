import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'
import RaisedButton from '../../../components/RaisedButton'
import TextField from '../../../components/Form/SimpleFields/TextField'
import PasswordViewField from '../../../components/Form/SmartFields/PasswordViewField'
import validate from '../../../helpers/validate'
import * as STYLE from '../../../styles/style'

export const FORM = 'SignUpForm'

const styles = {
  generalError: {
    textAlign: 'center',
    color: STYLE.DANGER_COLOR,
  },

  loginAction: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: '15px 0 0px',
  },

  signInButton: {
    marginTop: '40px',
    marginBottom: '10px'
  },
}

const enhance = compose(
  injectSheet(styles),
  reduxForm({
    form: FORM
  })
)

export const SignIn = ({ classes, error, handleSubmit, ...props }) => (
  <form onSubmit={handleSubmit(() => props.onSubmit().catch(validate))}>
    {error && <div className={classes.generalError}>{error}</div>}

    <Field
      name="email"
      component={TextField}
      hintText="Email"
      floatingLabelText="Enter Email"
      fullWidth={true}
    /><br />

    <Field
      name="firstName"
      component={TextField}
      hintText="First name"
      floatingLabelText="Enter First name"
      fullWidth={true}
    /><br />

    <Field
      name="secondName"
      component={TextField}
      hintText="Second name"
      floatingLabelText="Enter Second name"
      fullWidth={true}
    /><br />

    <Field
      name="password"
      component={PasswordViewField}
      hintText="Password"
      floatingLabelText="Enter Password"
      fullWidth={true}
    /><br />

    <RaisedButton
      type="submit"
      className={classes.signInButton}
      label="Sign Up"
      primary={true}
      fullWidth={true}
    />
  </form>
)

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default enhance(SignIn)
