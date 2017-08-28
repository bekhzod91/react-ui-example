import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '../../../components/AppBar'

const Dashboard = (props) => {
  return (
    <AppBar {...props.appBar}>
      <div style={{ fontSize: '20px' }}>Content!</div>
    </AppBar>
  )
}

Dashboard.propTypes = {
  appBar: PropTypes.object.isRequired
}

export default Dashboard
