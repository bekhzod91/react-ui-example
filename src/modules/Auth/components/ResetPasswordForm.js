import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { Field, reduxForm } from 'redux-form'
import withStyles from '@material-ui/core/styles/withStyles'
import * as STYLE from '../../../styles/style'
import validate from '../../../helpers/validate'
import Button from '../../../components/Button'
import PasswordViewField from '../../../components/Form/PasswordViewField'

export const FORM = 'ResetPasswordForm'

const styles = {
  errors: {
    textAlign: 'center',
    color: STYLE.DANGER_COLOR,
  },

  button: {
    marginTop: '40px',
    marginBottom: '10px',
    minHeight: '44px !'
  },
}

const enhance = compose(
  reduxForm({
    form: FORM
  }),
  withStyles(styles),
)

const ResetPasswordForm = ({ classes, error, handleSubmit, ...props }) => (
  <form onSubmit={handleSubmit(() => props.onSubmit().catch(validate))}>
    {error && <div className={classes.errors}>{error}</div>}

    <Field
      name="password"
      component={PasswordViewField}
      label="New Password"
      placeholder="Enter New Password"
      fullWidth={true}
      margin="normal"
    /><br />

    <Button
      type="submit"
      variant="raised"
      color="primary"
      className={classes.button}
      fullWidth={true}>
      Change Password
    </Button>
  </form>
)

ResetPasswordForm.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default enhance(ResetPasswordForm)
