import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import * as ROUTER from '../../../constants/routes'
import SignUpForm from '../components/SignUpForm'
import AuthLayout, { styles as wrapStyle } from '../../../components/Layouts/AuthLayout'
import SocialButtons from '../components/SocialButtons'

const styles = {
  title: wrapStyle.title,
  footer: wrapStyle.footer
}

const SignUp = ({ classes, loading, onSubmit, buttons }) => (
  <AuthLayout
    title="Create an account"
    loading={loading}>
    <div>
      <SocialButtons buttons={buttons} />

      <div>
        <h1 className={classes.title}>Or sign up below</h1>
      </div>

      <SignUpForm onSubmit={onSubmit} />

      <div className={classes.footer}>
        <p>Do you want return previous page? <Link to={ROUTER.SIGN_IN_URL}>Sign In</Link></p>
      </div>
    </div>
  </AuthLayout>
)

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttons: PropTypes.any.isRequired
}

export default injectSheet(styles)(SignUp)
