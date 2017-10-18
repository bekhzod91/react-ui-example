import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import PageWrapper from './PageWrapper'

const Page404 = ({ push, location, ...props }) => {
  const route = {
    companyId: R.path(['params', 'companyId'], props),
    location,
    push
  }

  return (
    <PageWrapper title="404" route={route}>
      <span style={{ fontSize: '2em' }}>Whoops!</span>
      <br />
      We couldn't find this page.
    </PageWrapper>
  )
}

Page404.propTypes = {
  push: PropTypes.func,
  location: PropTypes.object,
  route: PropTypes.object
}

export default Page404
