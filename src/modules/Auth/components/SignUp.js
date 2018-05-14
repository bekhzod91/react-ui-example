import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import withStyles from 'material-ui/styles/withStyles'
import AuthLayout, { styles as wrapStyle } from '../../../components/Layouts/AuthLayout'
import SignUpForm from '../components/SignUpForm'
import * as ROUTES from '../../../constants/routes'

const styles = {
  title: wrapStyle.title,
  footer: wrapStyle.footer
}

const SignUp = ({ classes, loading, onSubmit }) => (
  <AuthLayout
    title="Create an account"
    loading={loading}>
    <div>
      <SignUpForm onSubmit={onSubmit} />

      <div className={classes.footer}>
        <p>Do you want return previous page? <Link to={ROUTES.SIGN_IN_URL}>Sign In</Link></p>
      </div>
    </div>
  </AuthLayout>
)

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default withStyles(styles)(SignUp)
