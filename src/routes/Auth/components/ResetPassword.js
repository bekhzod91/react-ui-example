import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import * as ROUTER from '../../../constants/routes'
import ResetPasswordForm from '../components/ResetPasswordForm'
import AuthLayout, { styles as wrapStyle } from '../../../components/AuthLayout'

const styles = {
  footer: wrapStyle.footer
}

export const RecoveryVerify = ({ classes, loading, onSubmit }) => (
  <AuthLayout
    title="Reset Password"
    loading={loading}>
    <div>
      <ResetPasswordForm onSubmit={onSubmit} />

      <div className={classes.footer}>
        <p>Do you want return previous page? <Link to={ROUTER.SIGN_IN_URL}>Sign In</Link></p>
      </div>
    </div>
  </AuthLayout>
)

RecoveryVerify.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default injectSheet(styles)(RecoveryVerify)
