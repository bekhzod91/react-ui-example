import { compose, prop, not } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { compose as flow, branch, renderNothing } from 'recompose'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import AuthLayout, { styles as wrapStyle } from '../../../components/Layouts/AuthLayout'
import * as ROUTES from '../../../constants/routes'

const styles = {
  footer: wrapStyle.footer
}

const RecoveryThankYou = ({ classes, email, firstName }) => (
  <AuthLayout
    title={`Thank you ${firstName}`}
    loading={false}>
    <div>
      <p style={{ textAlign: 'center' }}>We've sent an email to { email }</p>

      <p style={{ textAlign: 'center' }}>Please click the link in that message to reset password</p>

      <p style={{ textAlign: 'center' }}>
        <Link to={ROUTES.RECOVERY_URL}>Change your email</Link>
      </p>

      <div className={classes.footer}>
        <p>Do you want return main page? <Link to={ROUTES.SIGN_IN_URL}>Sign In</Link></p>
      </div>
    </div>
  </AuthLayout>
)

RecoveryThankYou.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired
}

const enhance = flow(
  (render =>
    branch(render, renderNothing)
  )(compose(not, prop('email'))),
  withStyles(styles)
)

export default enhance(RecoveryThankYou)
