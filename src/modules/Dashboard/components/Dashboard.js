import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '../../../components/AppBar'

const Dashboard = ({ appBar }) => {
  return (
    <AppBar {...appBar}>
      Hello
    </AppBar>
  )
}

Dashboard.propTypes = {
  appBar: PropTypes.object.isRequired
}

export default Dashboard
