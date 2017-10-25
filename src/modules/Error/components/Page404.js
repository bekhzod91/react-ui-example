import React from 'react'
import PropTypes from 'prop-types'
import PageWrapper from './PageWrapper'

const Page404 = ({ onGoHome }) => {
  return (
    <PageWrapper title="404" onGoHome={onGoHome}>
      <span style={{ fontSize: '2em' }}>Whoops!</span>
      <br />
      We couldn't find this page.
    </PageWrapper>
  )
}

Page404.propTypes = {
  onGoHome: PropTypes.func
}

export default Page404
