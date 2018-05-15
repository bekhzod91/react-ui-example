import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'recompose'
import PropTypes from 'prop-types'
import React from 'react'
import TextField from '../../../components/Form/TextField'
import PasswordViewField from '../../../components/Form/PasswordViewField'
import Checkbox from '../../../components/Form/Checkbox'
import Button from '../../../components/Button'
import validate from '../../../helpers/validate'
import * as STYLE from '../../../styles/style'
import * as ROUTES from '../../../constants/routes'

export const FORM = 'SignInForm'

const styles = {
  error: {
    textAlign: 'center',
    color: STYLE.DANGER_COLOR,
  },

  remember: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: '0px',
  },

  submit: {
    marginTop: '40px',
    marginBottom: '10px',
    minHeight: '44px !important',
  },
}

const enhance = compose(
  reduxForm({ form: FORM }),
  withStyles(styles)
)

export const SignIn = ({ classes, error, handleSubmit, ...props }) => (
  <form onSubmit={handleSubmit(() => props.onSubmit().catch(validate))}>
    {error && <div className={classes.error}>{error}</div>}

    <Field
      name="username"
      component={TextField}
      label="Username"
      placeholder="Enter Username"
      fullWidth={true}
      margin="normal"
    /><br />

    <Field
      name="password"
      type="password"
      component={PasswordViewField}
      label="Password"
      placeholder="Enter Password"
      fullWidth={true}
      margin="normal"
    /><br />

    <div className={classes.remember}>
      <Field
        name="rememberMe"
        component={Checkbox}
        label="Remember me"
      />

      <Link to={ROUTES.RECOVERY_URL}>Forgot Password?</Link>
    </div>

    <Button
      type="submit"
      color="primary"
      variant="raised"
      className={classes.submit}>
      Sign In
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
