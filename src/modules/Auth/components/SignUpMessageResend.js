import { compose, prop, not } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { compose as flow, branch, renderNothing } from 'recompose'
import withStyles from 'material-ui/styles/withStyles'
import AuthLayout, { styles as wrapStyle } from '../../../components/Layouts/AuthLayout'
import * as ROUTES from '../../../constants/routes'

const styles = {
  title: wrapStyle.title,
  footer: wrapStyle.footer,
  center: {
    textAlign: 'center'
  }
}

const SignUpMessageResend = ({ classes, email }) => (
  <AuthLayout
    title={`Message Sent`}
    loading={false}>
    <div>
      <p className={classes.center}>OK. We've sent the confirmation message to:<br />{ email }</p>

      <p className={classes.center}>Make sure to check your junk or spam folder</p>

      <div className={classes.footer}>
        <p>Do you want return main page? <Link to={ROUTES.SIGN_IN_URL}>Sign In</Link></p>
      </div>
    </div>
  </AuthLayout>
)

SignUpMessageResend.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
}

const enhance = flow(
  (render =>
      branch(render, renderNothing)
  )(compose(not, prop('email'))),
  withStyles(styles),
)

export default enhance(SignUpMessageResend)
