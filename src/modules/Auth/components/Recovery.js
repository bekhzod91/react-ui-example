import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import withStyles from 'material-ui/styles/withStyles'
import RecoveryForm from '../components/RecoveryForm'
import AuthLayout, { styles as wrapStyle } from '../../../components/Layouts/AuthLayout'
import * as ROUTES from '../../../constants/routes'

const styles = {
  footer: wrapStyle.footer
}

const Recovery = ({ classes, loading, onSubmit }) => (
  <AuthLayout
    title="Forgot Password"
    loading={loading}>
    <div>
      <RecoveryForm onSubmit={onSubmit} />

      <div className={classes.footer}>
        <p>Do you want return previous page? <Link to={ROUTES.SIGN_IN_URL}>Sign In</Link></p>
      </div>
    </div>
  </AuthLayout>
)

Recovery.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default withStyles(styles)(Recovery)
