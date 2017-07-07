import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'
import PasswordViewField from '../../../components/Form/SmartFields/PasswordViewField'
import RaisedButton from '../../../components/RaisedButton'
import validate from '../../../helpers/validate'
import * as STYLE from '../../../styles/style'

export const FORM = 'ResetPasswordForm'

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

const ResetPasswordForm = ({ classes, error, handleSubmit, ...props }) => (
  <form onSubmit={handleSubmit(() => props.onSubmit().catch(validate))}>
    {error && <div className={classes.generalError}>{error}</div>}

    <Field
      name="password"
      component={PasswordViewField}
      hintText="New Password"
      floatingLabelText="Enter New Password"
      fullWidth={true}
    /><br />

    <RaisedButton
      type="submit"
      className={classes.signInButton}
      label="Reset"
      primary={true}
      fullWidth={true}
    />
  </form>
)

ResetPasswordForm.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default enhance(ResetPasswordForm)