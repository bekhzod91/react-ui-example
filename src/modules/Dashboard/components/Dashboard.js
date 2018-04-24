import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '../../../components/AppBar'
import * as ROUTE from '../../../constants/routes'

const Dashboard = ({ appBar }) => {
  return (
    <AppBar activeMenuName={ROUTE.DASHBOARD} {...appBar}>
      <div>Welcome!</div>
    </AppBar>
  )
}

Dashboard.propTypes = {
  appBar: PropTypes.object.isRequired
}

export default Dashboard
