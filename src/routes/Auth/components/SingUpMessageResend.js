import _ from 'lodash'
import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { compose, branch, renderNothing } from 'recompose'
import * as ROUTE from '../../../constants/routes'
import AuthLayout, { styles as wrapStyle } from '../components/AuthLayout'

const styles = {
  title: wrapStyle.title,
  footer: wrapStyle.footer
}

export const SingUpMessageResend = ({ classes, email, firstName }) => (
  <AuthLayout
    title={`Message Sent`}
    loading={false}>
    <div>
      <p style={{ textAlign: 'center' }}>OK. We've sent the confirmation message to:<br />{ email }</p>

      <p style={{ textAlign: 'center' }}>Make sure to check your junk or spam folder</p>

      <div className={classes.footer}>
        <p>Do you want return main page? <Link to={ROUTE.SIGN_IN_URL}>Sign In</Link></p>
      </div>
    </div>
  </AuthLayout>
)

SingUpMessageResend.propTypes = {
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired
}

const enhance = compose(
  injectSheet(styles),
  (render =>
      branch(render, renderNothing)
  )(props => !_.get(props, 'email')),
)

export default enhance(SingUpMessageResend)
