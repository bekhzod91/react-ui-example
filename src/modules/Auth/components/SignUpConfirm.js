import { prop } from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
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

export const SingUpConfirm = ({ classes, loading, data }) => (
  <AuthLayout
    title={loading ? ' ' : `Welcome ${prop('firstName', data)}`}
    loading={loading}>
    {!loading && <div>
      <p className={classes.center}>Thanks for sign up</p>

      <p className={classes.center}>You can sign in with email address {prop('email', data)}</p>

      <div className={classes.footer}>
        <p>Do you want return main page? <Link to={ROUTES.SIGN_IN_URL}>Sign In</Link></p>
      </div>
    </div>}
  </AuthLayout>
)

SingUpConfirm.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
}

export default withStyles(styles)(SingUpConfirm)
