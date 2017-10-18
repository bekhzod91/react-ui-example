import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import PageWrapper from './PageWrapper'

const Page500 = ({ push, location, ...props }) => {
  const route = {
    companyId: R.path(['params', 'companyId'], props),
    location,
    push
  }

  return (
    <PageWrapper title="500" route={route}>
      <span style={{ fontSize: '2em' }}>Whoops!</span>
      <br />
      Something went wrong on our end,
      <br />
      we've alerted our engineers to see what happened.
    </PageWrapper>
  )
}

Page500.propTypes = {
  push: PropTypes.func,
  location: PropTypes.object,
  route: PropTypes.object
}

export default Page500
