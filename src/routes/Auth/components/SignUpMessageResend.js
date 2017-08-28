import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { compose, branch, renderNothing } from 'recompose'
import withStyles from 'material-ui-next/styles/withStyles'
import * as ROUTE from '../../../constants/routes'
import AuthLayout, { styles as wrapStyle } from '../../../components/Layouts/AuthLayout'

const styles = {
  title: wrapStyle.title,
  footer: wrapStyle.footer,
  center: {
    textAlign: 'center'
  }
}

const SignUpMessageResend = ({ classes, email, firstName }) => (
  <AuthLayout
    title={`Message Sent`}
    loading={false}>
    <div>
      <p className={classes.center}>OK. We've sent the confirmation message to:<br />{ email }</p>

      <p className={classes.center}>Make sure to check your junk or spam folder</p>

      <div className={classes.footer}>
        <p>Do you want return main page? <Link to={ROUTE.SIGN_IN_URL}>Sign In</Link></p>
      </div>
    </div>
  </AuthLayout>
)

SignUpMessageResend.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired
}

const enhance = compose(
  (render =>
      branch(render, renderNothing)
  )(props => !_.get(props, 'email')),
  withStyles(styles),
)

export default enhance(SignUpMessageResend)
