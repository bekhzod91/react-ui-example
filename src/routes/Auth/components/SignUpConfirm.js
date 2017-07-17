import _ from 'lodash'
import React from 'react'
import injectSheet from 'react-jss'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import * as ROUTE from '../../../constants/routes'
import AuthLayout, { styles as wrapStyle } from '../../../components/Layouts/AuthLayout'

const styles = {
  title: wrapStyle.title,
  footer: wrapStyle.footer,
  center: {
    textAlign: 'center'
  }
}

export const SingUpConfirm = ({ classes, loading, data, failed }) => (
  <AuthLayout
    title={loading ? ' ' : `Welcome ${_.get(data, 'firstName')}`}
    loading={loading}>
    {!loading && <div>
      <p className={classes.center}>Thanks for sign up</p>

      <p className={classes.center}>You can sign in with email address {_.get(data, 'email')}</p>

      <div className={classes.footer}>
        <p>Do you want return main page? <Link to={ROUTE.SIGN_IN_URL}>Sign In</Link></p>
      </div>
    </div>}
  </AuthLayout>
)

SingUpConfirm.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  failed: PropTypes.bool.isRequired,
}

export default injectSheet(styles)(SingUpConfirm)
