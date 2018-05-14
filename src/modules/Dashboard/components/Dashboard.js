import React from 'react'
import PropTypes from 'prop-types'
import * as ROUTES from '../../../constants/routes'
import AppBar from '../../../components/AppBar'

const Dashboard = ({ app }) => {
  return (
    <AppBar active={ROUTES.DASHBOARD} {...app}>
      <div>Welcome!</div>
    </AppBar>
  )
}

Dashboard.propTypes = {
  app: PropTypes.object
}

export default Dashboard
