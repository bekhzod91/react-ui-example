import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'material-ui-next/styles/withStyles'
import { compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'
import * as ROUTER from '../../../constants/routes'
import TextFieldNext from '../../../components/Form/SimpleFields/TextFieldNext'
import Checkbox from '../../../components/Form/SimpleFields/Checkbox'
import Button from '../../../components/Button'
import validate from '../../../helpers/validate'
import * as STYLE from '../../../styles/style'

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
    padding: '0px',
  },

  signInButton: {
    marginTop: '40px',
    marginBottom: '10px',
    minHeight: '44px !important',
  },
}

const enhance = compose(
  reduxForm({
    form: 'SignInForm'
  }),
  withStyles(styles)
)

export const SignIn = ({ classes, error, handleSubmit, ...props }) => (
  <form onSubmit={handleSubmit(() => props.onSubmit().catch(validate))}>
    {error && <div className={classes.generalError}>{error}</div>}

    <Field
      name="email"
      component={TextFieldNext}
      label="Email"
      placeholder="Enter Email"
      fullWidth={true}
      margin="normal"
    /><br />

    <Field
      name="password"
      type="password"
      component={TextFieldNext}
      label="Password"
      placeholder="Enter Password"
      fullWidth={true}
      margin="normal"
    /><br />

    <div className={classes.loginAction}>
      <Field
        name="rememberMe"
        component={Checkbox}
        label="Remember me"
      />

      <Link to={ROUTER.RECOVERY_URL}>Forgot Password?</Link>
    </div>

    <Button
      type="submit"
      color="primary"
      className={classes.signInButton}>
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
