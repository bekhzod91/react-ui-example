import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '../../../components/AppBar'

const Dashboard = (props) => {
  setTimeout(() => {
    console.log('Work')
    console.log(props.locationChange('/'))
  }, 2000)

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
