import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'material-ui/styles/withStyles'
import AuthLayout, { styles as wrapStyle } from '../../../components/Layouts/AuthLayout'
import SignInForm from '../components/SignInForm'

const styles = {
  footer: wrapStyle.footer
}

const SignIn = ({ classes, loading, onSubmit }) => (
  <AuthLayout
    title="Sign In to your account"
    loading={loading}>
    <div>
      <SignInForm onSubmit={onSubmit} />
    </div>
  </AuthLayout>
)

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default withStyles(styles)(SignIn)
