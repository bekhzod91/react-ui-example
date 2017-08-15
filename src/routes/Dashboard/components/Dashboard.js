import React from 'react'
// import PropTypes from 'prop-types'
import AppBar from '../../../components/AppBar'

const Dashboard = (props) => {
  return (
    <AppBar title={'Unkata'} {...props}>
      <div style={{ fontSize: '20px' }}>Content!</div>
    </AppBar>
  )
}

export default Dashboard
