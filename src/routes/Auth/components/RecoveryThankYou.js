import _ from 'lodash'
import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import { compose, branch, renderNothing } from 'recompose'
import { Link } from 'react-router'
import * as ROUTE from '../../../constants/routes'
import AuthLayout, { styles as wrapStyle } from '../../../components/AuthLayout'

const styles = {
  footer: wrapStyle.footer
}

export const RecoveryThankYou = ({ classes, email, firstName, changeEmail }) => (
  <AuthLayout
    title={`Thank you ${firstName}`}
    loading={false}>
    <div>
      <p style={{ textAlign: 'center' }}>We've sent an email to { email }</p>

      <p style={{ textAlign: 'center' }}>Please click the link in that message to reset password</p>

      <p style={{ textAlign: 'center' }}>
        <Link to={ROUTE.RECOVERY_URL}>Change your email</Link>
      </p>

      <div className={classes.footer}>
        <p>Do you want return main page? <Link to={ROUTE.SIGN_IN_URL}>Sign In</Link></p>
      </div>
    </div>
  </AuthLayout>
)

RecoveryThankYou.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  changeEmail: PropTypes.func.isRequired
}

const enhance = compose(
  injectSheet(styles),
  (render =>
    branch(render, renderNothing)
  )(props => !_.get(props, 'email')),
)

export default enhance(RecoveryThankYou)
