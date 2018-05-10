import React from 'react'
import PropTypes from 'prop-types'
import * as ROUTE from '../../../constants/routes'
import AppBar from '../../../components/AppBar'

const Dashboard = ({ app, ...props }) => {
  return (
    <AppBar active={ROUTE.DASHBOARD} {...app}>
      <div>Welcome!</div>
    </AppBar>
  )
}

Dashboard.propTypes = {
  app: PropTypes.object
}

export default Dashboard
