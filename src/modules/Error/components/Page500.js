import React from 'react'
import PropTypes from 'prop-types'
import PageWrapper from './PageWrapper'

const Page500 = ({ onGoHome }) => {
  return (
    <PageWrapper title="500" onGoHome={onGoHome}>
      <span style={{ fontSize: '2em' }}>Whoops!</span>
      <br />
      Something went wrong on our end,
      <br />
      we've alerted our engineers to see what happened.
    </PageWrapper>
  )
}

Page500.propTypes = {
  onGoHome: PropTypes.func
}

export default Page500
