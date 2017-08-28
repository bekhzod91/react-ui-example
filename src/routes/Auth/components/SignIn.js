import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import withStyles from 'material-ui-next/styles/withStyles'
import * as ROUTER from '../../../constants/routes'
import AuthLayout, { styles as wrapStyle } from '../../../components/Layouts/AuthLayout'
import SignInForm from '../components/SignInForm'
import LineText from '../components/LineText'
import SocialButtons from '../components/SocialButtons'

const styles = {
  footer: wrapStyle.footer
}

const SignIn = ({ classes, loading, onSubmit, buttons }) => (
  <AuthLayout
    title="Sign In to your account"
    loading={loading}>
    <div>
      <SignInForm onSubmit={onSubmit} />

      <LineText text="OR" />

      <SocialButtons buttons={buttons} />

      <div className={classes.footer}>
        <p>Don't have an account? <Link to={ROUTER.SIGN_UP_URL}>Create an account</Link></p>
      </div>
    </div>
  </AuthLayout>
)

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttons: PropTypes.any.isRequired
}

export default withStyles(styles)(SignIn)
